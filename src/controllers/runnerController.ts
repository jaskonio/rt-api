import { Request, Response }  from 'express'
import mongoose from 'mongoose'
import * as RunnerService  from '../services/runnerService'

export async function get(_req: Request, res: Response) {
	console.log('Get All Runners')
	try {
		const runners = await RunnerService.getAll()

		res.send(runners)
	} catch (e){
		console.log('[ERROR]' + e)
		res.status(500).send(e)
	}
}

export async function getById(req: Request, res: Response) {
	console.log('Get By Runner Id')
	try {
		const id = req.params.id

		if (!mongoose.Types.ObjectId.isValid(id)) {
			res.status(404).send({ message: 'Please provide correct id' })
			return
		}

		const runner = await RunnerService.getById(id)

		res.send(runner)
	} catch (e){
		console.log('[ERROR]' + e)
		res.status(500).send(e)
	}
}

export async function post(req: Request, res: Response) {
	console.log('POST Runner')
	try {
		const { id, name, last_name, photo } = req.body
		const newRunner = await RunnerService.save({ id, name, last_name, photo })

		res.send(newRunner)
	} catch (e){
		console.log('[ERROR]' + e)
		res.status(500).send(e)
	}
}

export async function put(req: Request, res: Response) {
	console.log('Update Runner')
	try {
		const id = req.params.id

		if (!mongoose.Types.ObjectId.isValid(id)) {
			res.status(404).send({ message: 'Please provide correct id' })
			return
		}
        
		const runner = await RunnerService.getById(id)
        
		if (runner == null) {
			res.status(404).send({ message: 'no data exist for this id' })
			return
		}

		const { name, last_name, photo } = req.body

		const newRunner = await RunnerService.update({ id, name, last_name, photo })
        
		res.send(newRunner)
	} catch (e){
		console.log('[ERROR]' + e)
		res.status(500).send(e)
	}
}

export async function remove(req: Request, res: Response) {
	console.log('Delete Runner')
	try {
		const id = req.params.id

		await RunnerService.remove(id)

		res.status(200).send()
	} catch (e){
		console.log('[ERROR]' + e)
		res.status(500).send(e)
	}
}