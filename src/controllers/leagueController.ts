import { Request, Response }  from 'express'
import mongoose from 'mongoose'
import * as LeagueService from '../services/leagueService'

export async function get(_req: Request, res: Response) {
	console.log('Get All League')

	try {
		const leagues = await LeagueService.getAll()

		res.send(leagues)
	} catch (e){
		console.log('[ERROR]' + e)
		res.status(500).send(e)
	}
}

export async function getById(req: Request, res: Response) {
	console.log('Get By League Id')

	try {
		const id = req.params.id

		if (!mongoose.Types.ObjectId.isValid(id)) {
			res.status(404).send({ message: 'Please provide correct id' })
			return
		}

		const season = await LeagueService.getById(id)

		res.send(season)
	} catch (e){
		console.log('[ERROR]' + e)

		res.status(500).send(e)
	}
}

export async function post(req: Request, res: Response) {
	console.log('POST League')

	try {
		const { seasonId, name, bibNumberIds } = req.body
		const newLeague = LeagueService.save({ seasonId, name, bibNumberIds })

		res.send(newLeague)
	} catch (e){
		console.log('[ERROR]' + e)
		res.status(500).send(e)
	}
}

export async function put(req: Request, res: Response) {
	console.log('Update League')

	try {
		const id = req.params.id

		if (!mongoose.Types.ObjectId.isValid(id)) {
			res.status(404).send({ message: 'Please provide correct id' })
			return
		}
        
		const { seasonId, name, bibNumberIds } = req.body

		const updatedLeague = await LeagueService.update(id, { seasonId, name, bibNumberIds })
        
		res.send(updatedLeague)
	} catch (e){
		console.log('[ERROR]' + e)

		res.status(500).send(e)
	}
}

export async function remove(req: Request, res: Response) {
	console.log('Delete League')

	try {
		const id = req.params.id

		await LeagueService.remove(id)

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

		await LeagueService.processById(id)

		res.status(201).send()

	} catch (error) {
		console.log(error)
		res.status(500).json( error )
	}
}
