import { Request, Response }  from "express"
import mongoose, { CallbackWithoutResult } from "mongoose"
import { Race, RaceDoc }  from '../models/raceModel'
import * as RaceService from '../services/raceService'

export async function get(_req: Request, res: Response) {
    console.log('Get all')

    try{
        const races = await Race.find({})
    
        res.send(races)
    } catch (e) {
        res.status(404).send(e)
    }
}

export async function getById(req: Request, res: Response) {
    console.log('Get by race')
    
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ message: "Please provide correct id" })
        return
    }

    const race = await Race.findById(id)

    res.send(race)
}

export async function post(req: Request, res: Response) {
    try{
        console.log('Save race')

        const { processed, celebrateDay, name, url, seasonId } = req.body
        const newrace = Race.build({ processed, celebrateDay, name, url, seasonId })
        await newrace.save()

        res.json(newrace)
    } catch (e) {
        res.status(404).send(e)
    }
}

export async function put(req: Request, res: Response) {
    console.log('update race')

    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ message: "Please provide correct id" })
        return
    }

    const { processed, celebrateDay, name, url, collection_name, seasonId } = req.body

    Race.findById(id, function(err:any, doc: (RaceDoc & {_id: any;}) | null) {

        console.log(err)
        console.log(doc)
        if (err) throw res.status(404).send(err)

        if (doc == null) {
            res.status(404).send({ message: "no data exist for this id" })
            return
        }
        
        doc.updateOne( {processed, celebrateDay, name, url, collection_name, seasonId },
            function (err: any, result: any) {
                console.log(err)
                console.log(result)
                
                if (err) throw err
    
                res.json(result)
        })
    });

}

export async function remove(req: Request, res: Response) {
    console.log('delete race')

    const id = req.params.id

    Race.deleteOne( { id: id}, function (err: CallbackWithoutResult | undefined) {
        console.log(err)
        
        if (err) throw err

        res.status(200).send()
    })
}

export async function processAll(_req: Request, res: Response) {
    res.send('process all Race')
}

export async function processById(req: Request, res: Response) {
    const id = req.params.id

    try {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).send({ message: "Please provide correct id" })
            return
        }
    
        const race = await Race.findById(id)
        
        if (race == null) {
            res.status(404).send({ message: "no data exist for this id" })
            return
        }

        const url = race.url

        let data = await RaceService.getRankingsDatabyRace(url);

        await race.updateOne({data: data})
        
        res.status(201).send()

    } catch (error) {
        console.log(error)
        res.status(500).json({ error});
    }
}