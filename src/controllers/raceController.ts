import { Request, Response }  from "express"
import mongoose from "mongoose"
import { Race }  from '../models/raceModel'
import * as RaceService from '../services/raceService'

export async function get(_req: Request, res: Response) {
    console.log('Get all')

    try{
        const races = await RaceService.getAll()
    
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

    const race = await RaceService.getById(id)

    res.send(race)
}

export async function post(req: Request, res: Response) {
    try{
        console.log('Save race')

        const { processed, celebrateDay, name, url, seasonId, data } = req.body

        const newrace = RaceService.save({ processed, celebrateDay, name, url, seasonId, data })

        res.json(newrace)
    } catch (e) {
        res.status(404).send(e)
    }
}

export async function put(req: Request, res: Response) {
    console.log('update race')

    try {
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).send({ message: "Please provide correct id" })
            return
        }
        
        const document = await RaceService.getById(id)
        
        if (document == null) {
            res.status(404).send({ message: "no data exist for this id" })
            return
        }

        const { name, processed, celebrateDay, url, seasonId, data } = req.body

        await document.update({ name, processed, celebrateDay, url, seasonId, data })

        const updatedDocument = await RaceService.getById(id)
        
        res.send(updatedDocument)
    } catch (e){
        console.log("[ERROR]" + e)

        res.status(500).send(e)
    }
}

export async function remove(req: Request, res: Response) {
    console.log("Delete League")

    try {
        const id = req.params.id

        await RaceService.remove(id)

        res.status(200).send()
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
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

        const data = await RaceService.saveRowData(race);

        const processedData = await RaceService.getProcessedData(data)

        await race.updateOne({data: processedData})

        res.status(201).send()

    } catch (error) {
        console.log(error)
        res.status(500).json({ error});
    }
}