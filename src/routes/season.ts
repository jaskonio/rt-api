import express, { Request, Response }  from "express"
import mongoose from "mongoose"
import { Season }  from '../models/seasonModel'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
    console.log("Get All Season")
    try {
        const seasons = await Season.find({})

        res.send(seasons)
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    console.log("Get By Season Id")
    try {
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).send({ message: "Please provide correct id" })
            return
        }

        const season = await Season.findById(id)

        res.send(season)
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
})

router.post('/', async (req: Request, res: Response) => {
    console.log("POST Season")
    try {
        const { name, racesIds, leaguesIds } = req.body
        const newSeason = Season.build({ name, racesIds, leaguesIds})

        await newSeason.save()

        res.send(newSeason)
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    console.log("Update Season")
    try {
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).send({ message: "Please provide correct id" })
            return
        }
        
        const season = await Season.findById(id)
        
        if (season == null) {
            res.status(404).send({ message: "no data exist for this id" })
            return
        }

        const { name, racesIds, leaguesIds } = req.body

        await season.update({ name, racesIds, leaguesIds })

        const newSeason = await Season.findById(id)
        
        res.send(newSeason)
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    console.log("Delete Season")
    try {
        const id = req.params.id

        await Season.deleteOne({id: id})

        res.status(200).send()
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
})

export default router