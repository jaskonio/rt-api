import { Request, Response }  from 'express'
import mongoose from 'mongoose'
import * as RankingsService from '../services/rankingsService'

export async function get(_req: Request, res: Response) {
	console.log('Get All Ranking')

	try {
		const documents = await RankingsService.getAll()

		res.send(documents)
	} catch (e){
		console.log('[ERROR]' + e)
		res.status(500).send(e)
	}
}

export async function getById(req: Request, res: Response) {
	console.log('Get By Ranking Id')

	try {
		const id = req.params.id

		if (!mongoose.Types.ObjectId.isValid(id)) {
			res.status(404).send({ message: 'Please provide correct id' })
			return
		}

		const document = await RankingsService.getById(id)

		res.send(document)
	} catch (e){
		console.log('[ERROR]' + e)

		res.status(500).send(e)
	}
}

export async function remove(req: Request, res: Response) {
	console.log('Delete Ranking')

	try {
		const id = req.params.id

		await RankingsService.remove(id)

		res.status(200).send()
	} catch (e){
		console.log('[ERROR]' + e)
		res.status(500).send(e)
	}
}
