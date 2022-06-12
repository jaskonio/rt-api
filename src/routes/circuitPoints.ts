import express, { Request, Response }  from "express"
import mongoose from "mongoose"
import { CircuitPoints }  from '../models/circuitPointsModel'
import * as circuitPointsService from '../services/circuitPointsService'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
    try{
        console.log('Get all')

        const circuitPointss = await CircuitPoints.find({})
    
        res.send(circuitPointss)
    } catch (e) {
        res.status(404).send(e)
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    console.log('Get by circuitPoints')
    
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ message: "Please provide correct id" })
        return
    }

    const circuitPoints = await CircuitPoints.findById(id)

    res.send(circuitPoints)
})

router.post('/', async (req: Request, res: Response) => {
    try{
        console.log('Save circuitPoints')

        const { name, url, collection_name } = req.body
        const newcircuitPoints = CircuitPoints.build({ name, url, collection_name})
        await newcircuitPoints.save()

        res.json(newcircuitPoints)
    } catch (e) {
        res.status(404).send(e)
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    console.log('update circuitPoints')
    try {
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).send({ message: "Please provide correct id" })
            return
        }
        
        const circuitPoints = await CircuitPoints.findById(id)
        
        if (circuitPoints == null) {
            res.status(404).send({ message: "no data exist for this id" })
            return
        }

        const { name, racesIds, leaguesIds } = req.body

        await circuitPoints.update({ name, racesIds, leaguesIds })

        const newLeague = await CircuitPoints.findById(id)
        
        res.send(newLeague)
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    console.log('delete circuitPoints')

    try {
        const id = req.params.id

        await CircuitPoints.deleteOne({id: id})

        res.status(200).send()
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
})

router.post('/process/:id', async (req: Request, res: Response) => {

    try {
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).send({ message: "Please provide correct id" })
            return
        }

        const currentCircuitPoints = await CircuitPoints.findById(id)

        if (currentCircuitPoints == null) {
            res.status(404).send({ message: "no data exist for this id" })
            return
        }

        const url = currentCircuitPoints.url

        let data = await circuitPointsService.getDatabyCircuitPoints(url)

        const newDocuments =  {
            "circuitPointsId": currentCircuitPoints._id,
            "data": data
        }

        await circuitPointsService.saveRankingsData(currentCircuitPoints.collection_name, newDocuments)
        
        res.status(201).send()

    } catch (error) {
        console.log(error)
        res.status(500).json({ error});
    }
})

export default router