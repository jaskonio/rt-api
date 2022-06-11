import express, { Request, Response }  from "express"
import mongoose from "mongoose"
import { BibNumber }  from '../models/bibNumberModel'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
    console.log("Get All BibNumber")
    try {
        const bibNumber = await BibNumber.find({})

        res.send(bibNumber)
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    console.log("Get By BibNumber Id")
    try {
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).send({ message: "Please provide correct id" })
            return
        }

        const bibNumber = await BibNumber.findById(id)

        res.send(bibNumber)
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
})

router.post('/', async (req: Request, res: Response) => {
    console.log("POST BibNumber")
    try {
        const { bibNumner, runnerId, disqualifiedRaceIds } = req.body
        const newBibNumber = BibNumber.build({ bibNumner, runnerId, disqualifiedRaceIds })

        await newBibNumber.save()

        res.send(newBibNumber)
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    console.log("Update BibNumber")
    try {
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).send({ message: "Please provide correct id" })
            return
        }
        
        const bibNumber = await BibNumber.findById(id)
        
        if (bibNumber == null) {
            res.status(404).send({ message: "no data exist for this id" })
            return
        }

        const { bibNumner, runnerId, disqualifiedRaceIds } = req.body

        await bibNumber.updateOne({ bibNumner, runnerId, disqualifiedRaceIds })

        const newBibNumber = await BibNumber.findById(id)
        
        res.send(newBibNumber)
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    console.log("Delete BibNumber")
    try {
        const id = req.params.id

        await BibNumber.deleteOne({id: id})

        res.status(200).send()
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
})

export default router