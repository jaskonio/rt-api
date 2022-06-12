import { Request, Response }  from "express"
import mongoose from "mongoose"
import * as BibNumberService from '../services/bibNumbersServices'

export async function get(_req: Request, res: Response) {
    console.log("Get All BibNumber")

    try {
        const bibNumber = await BibNumberService.getAll()

        res.send(bibNumber)
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
}

export async function getById(req: Request, res: Response) {
    console.log("Get By BibNumber Id")

    try {
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).send({ message: "Please provide correct id" })
            return
        }

        const bibNumber = await BibNumberService.getById(id)

        res.send(bibNumber)
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
}

export async function post(req: Request, res: Response) {
    console.log("POST BibNumber")

    try {
        const { bibNumner, runnerId, disqualifiedRaceIds } = req.body

        const newBibNumber = await BibNumberService.buildDocument({ bibNumner, runnerId, disqualifiedRaceIds })

        await newBibNumber.save()

        res.send(newBibNumber)
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
}

export async function put(req: Request, res: Response) {
    console.log("Update BibNumber")

    try {
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).send({ message: "Please provide correct id" })
            return
        }

        const { bibNumner, runnerId, disqualifiedRaceIds } = req.body

        const updatedBibNumber = await BibNumberService.update(id, { bibNumner, runnerId, disqualifiedRaceIds })
        
        res.send(updatedBibNumber)
    } catch (e){
        console.log("[ERROR]" + e)

        res.status(500).send(e)
    }
}

export async function remove(req: Request, res: Response) {
    console.log("Delete BibNumber")

    try {
        const id = req.params.id

        await BibNumberService.remove(id)

        res.status(200).send()
    } catch (e){
        console.log("[ERROR]" + e)
        res.status(500).send(e)
    }
}