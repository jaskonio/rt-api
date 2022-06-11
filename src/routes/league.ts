import express, { Request, Response }  from "express"
import mongoose from "mongoose"
import { League }  from '../models/leagueModel'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
    console.log("Get All League")
    try {
        const leagues = await League.find({})

        res.send(leagues)
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
})

router.get('/:id', async (req: Request, res: Response) => {
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
})

router.post('/', async (req: Request, res: Response) => {
    console.log("POST League")
    try {
        const { name, bibNumberIds } = req.body
        const newLeague = League.build({ name, bibNumberIds })

        await newLeague.save()

        res.send(newLeague)
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
})

router.put('/:id', async (req: Request, res: Response) => {
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
})

router.delete('/:id', async (req: Request, res: Response) => {
    console.log("Delete League")
    try {
        const id = req.params.id

        await League.deleteOne({id: id})

        res.status(200).send()
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
})

export default router