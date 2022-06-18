import { Request, Response }  from 'express'
import mongoose from 'mongoose'
import * as SeasonService   from '../services/seasonService'

export async function get(_req: Request, res: Response) {
	console.log('Get All Season')
	try {
		const seasons = await SeasonService.getAll()

		res.send(seasons)
	} catch (e){
		console.log('[ERROR]' + e)
		res.status(500).send(e)
	}
}

export async function getById(req: Request, res: Response) {
	console.log('Get By Season Id')
	try {
		const id = req.params.id

		if (!mongoose.Types.ObjectId.isValid(id)) {
			res.status(404).send({ message: 'Please provide correct id' })
			return
		}

		const season = await SeasonService.getById(id)

		res.send(season)
	} catch (e){
		console.log('[ERROR]' + e)
		res.status(500).send(e)
	}
}

export async function post(req: Request, res: Response) {
	console.log('POST Season')
	try {
		const { name } = req.body

		const newSeason= await SeasonService.save({ name })

		res.send(newSeason)
	} catch (e){
		console.log('[ERROR]' + e)
		res.status(500).send(e)
	}
}

export async function put(req: Request, res: Response) {
	console.log('Update Season')
	try {
		const id = req.params.id

		if (!mongoose.Types.ObjectId.isValid(id)) {
			res.status(404).send({ message: 'Please provide correct id' })
			return
		}
        
		const season = await SeasonService.getById(id)
        
		if (season == null) {
			res.status(404).send({ message: 'no data exist for this id' })
			return
		}

		const { name } = req.body

		await SeasonService.update(id, { name })

		const newSeason = await SeasonService.getById(id)
        
		res.send(newSeason)
	} catch (e){
		console.log('[ERROR]' + e)
		res.status(500).send(e)
	}
}

export async function remove(req: Request, res: Response) {
	console.log('Delete Season')
	try {
		const id = req.params.id

		await SeasonService.remove(id)

		res.status(200).send()
	} catch (e){
		console.log('[ERROR]' + e)
		res.status(500).send(e)
	}
}