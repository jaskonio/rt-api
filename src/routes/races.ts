import express, { Request, Response }  from "express"
import mongoose, { CallbackWithoutResult } from "mongoose"
import { Race, RaceDoc }  from '../models/raceModel'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
    try{
        console.log('Get all')

        const races = await Race.find({})
    
        res.send(races)
    } catch (e) {
        res.status(404).send(e)
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    console.log('Get by race')

    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ message: "Please provide correct id" })
        return
    }

    const race = await Race.findById(id)

    res.send(race)
})

router.post('/', async (req: Request, res: Response) => {
    try{
        console.log('Save race')

        const { processed, day_celebrate, name, url, collection_name } = req.body
        const newrace = Race.build({ processed, day_celebrate, name, url, collection_name})
        await newrace.save()

        res.json(newrace)
    } catch (e) {
        res.status(404).send(e)
    }
})

router.put('/:id', (req: Request, res: Response) => {
    console.log('update race')

    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ message: "Please provide correct id" })
        return
    }

    const { processed, day_celebrate, name, url, collection_name } = req.body

    Race.findById(id, function(err:any, doc: (RaceDoc & {_id: any;}) | null) {

        console.log(err)
        console.log(doc)
        if (err) throw res.status(404).send(err)

        if (doc == null) {
            res.status(404).send({ message: "no data exist for this id" })
            return
        }
        
        doc.updateOne( {processed, day_celebrate, name, url, collection_name}, 
            function (err: any, result: any) {
                console.log(err)
                console.log(result)
                
                if (err) throw err
    
                res.json(result)
        })
    });

})

router.delete('/:id', (req: Request, res: Response) => {
    console.log('delete race')

    const id = req.params.id

    Race.deleteOne( { id: id}, function (err: CallbackWithoutResult | undefined) {
        console.log(err)
        
        if (err) throw err

        res.status(200).send()
    })
})

router.post('/process/all', (_req: Request, res: Response) => {
    res.send('process all Race')
})

router.post('/process/:id', (_req: Request, res: Response) => {
    res.send('proces by Race')
})

export default router