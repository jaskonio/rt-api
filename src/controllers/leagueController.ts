import { Request, Response }  from "express"
import mongoose from "mongoose"
import { League }  from '../models/leagueModel'

export async function get(_req: Request, res: Response) {
    console.log("Get All League")

    try {
        const leagues = await League.find({})

        res.send(leagues)
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
}

export async function getById(req: Request, res: Response) {
    console.log("Get By League Id")

    try {
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).send({ message: "Please provide correct id" })
            return
        }

        const season = await League.findById(id)

        res.send(season)
    } catch (e){
        console.log("[ERROR]" + e)

        res.status(500).send(e)
    }
}

export async function post(req: Request, res: Response) {
    console.log("POST League")

    try {
        const { seasonId, name, bibNumberIds } = req.body
        const newLeague = League.build({ seasonId, name, bibNumberIds })

        await newLeague.save()

        res.send(newLeague)
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
}

export async function put(req: Request, res: Response) {
    console.log("Update League")

    try {
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).send({ message: "Please provide correct id" })
            return
        }
        
        const league = await League.findById(id)
        
        if (league == null) {
            res.status(404).send({ message: "no data exist for this id" })
            return
        }

        const { name, racesIds, leaguesIds } = req.body

        await league.update({ name, racesIds, leaguesIds })

        const newLeague = await League.findById(id)
        
        res.send(newLeague)
    } catch (e){
        console.log("[ERROR]" + e)

        res.status(500).send(e)
    }
}

export async function remove(req: Request, res: Response) {
    console.log("Delete League")

    try {
        const id = req.params.id

        await League.deleteOne({id: id})

        res.status(200).send()
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
}