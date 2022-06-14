import { Request, Response }  from 'express'
import mongoose from 'mongoose'
import * as CircuitPointsService from '../services/circuitPointsService'

export async function get(_req: Request, res: Response) {
	try{
		console.log('Get all')

		const circuitPointss = await CircuitPointsService.getAll()
    
		res.send(circuitPointss)
	} catch (e) {
		res.status(404).send(e)
	}
}

export async function getById(req: Request, res: Response) {
	console.log('Get by circuitPoints')
    
	const id = req.params.id

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).send({ message: 'Please provide correct id' })
		return
	}

	const circuitPoints = await CircuitPointsService.getById(id)

	res.send(circuitPoints)
}

export async function post(req: Request, res: Response) {
	console.log('Save circuitPoints')

	try {
		const { url, data, seasonId } = req.body
        
		const newDocument = await CircuitPointsService.save({ url, data, seasonId })

		res.json(newDocument)
	} catch (e) {
		res.status(404).send(e)
	}
}

export async function put(req: Request, res: Response) {
	console.log('update circuitPoints')

	try {
		const id = req.params.id

		if (!mongoose.Types.ObjectId.isValid(id)) {
			res.status(404).send({ message: 'Please provide correct id' })
			return
		}

		const { url, data, seasonId } = req.body
        
		const updatedDocument = await CircuitPointsService.update(id, { url, data, seasonId})

		res.send(updatedDocument)
	} catch (e){
		console.log('[ERROR]' + e)

		res.status(500).send(e)
	}
}

export async function remove(req: Request, res: Response) {
	console.log('delete circuitPoints')

	try {
		const id = req.params.id

		await CircuitPointsService.remove(id)

		res.status(200).send()
	} catch (e){
		console.log('[ERROR]' + e)
		res.status(500).send(e)
	}
}

export async function processById(req: Request, res: Response) {

	try {
		const id = req.params.id

		if (!mongoose.Types.ObjectId.isValid(id)) {
			res.status(404).send({ message: 'Please provide correct id' })
			return
		}

		const status = await CircuitPointsService.processById(id)
        
		if (status == null) {
			throw new Error('Error Processed')
            
		}

		res.status(201).send()

	} catch (error) {
		console.log(error)

		res.status(500).json({ error })
	}
}
