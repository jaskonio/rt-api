import { Request, Response }  from 'express'
import mongoose from 'mongoose'
import { BibNumber } from '../models/bibNumberModel'
import { CircuitPoints } from '../models/circuitPointsModel'
import { League } from '../models/leagueModel'
import { Race } from '../models/raceModel'
import { RaceProcessed } from '../models/raceProcessedModel'
import { Ranking } from '../models/rankingModel'
import * as LeagueService from '../services/leagueService'

export async function get(_req: Request, res: Response) {
	console.log('Get All League')

	try {
		const leagues = await League.find({})

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

		const season = await League.findById(id)

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
		const newLeague = League.build({ seasonId, name, bibNumberIds })

		await newLeague.save()

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
        
		const league = await League.findById(id)
        
		if (league == null) {
			res.status(404).send({ message: 'no data exist for this id' })
			return
		}

		const { name, racesIds, leaguesIds } = req.body

		await league.update({ name, racesIds, leaguesIds })

		const newLeague = await League.findById(id)
        
		res.send(newLeague)
	} catch (e){
		console.log('[ERROR]' + e)

		res.status(500).send(e)
	}
}

export async function remove(req: Request, res: Response) {
	console.log('Delete League')

	try {
		const id = req.params.id

		await League.deleteOne({id: id})

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
    
		const leagueDoc = await League.findById(id)
        
		if (leagueDoc == null) {
			res.status(404).send({ message: 'no data exist for this id' })
			return
		}

		const raceDoc = await Race.findOne({ seasonId: leagueDoc.seasonId })

		if (raceDoc == null) {
			res.status(404).send({ message: 'no data exist for this id' })
			return
		}

		const raceProcesseDocument = await RaceProcessed.find({ raceId: raceDoc.id })

		if (raceProcesseDocument == null) {
			res.status(404).send({ message: 'no data exist for this id' })
			return
		}

		const pointsCircuitDocument = await CircuitPoints.findOne({ seasonId: leagueDoc.seasonId })

		if (pointsCircuitDocument == null) {
			res.status(404).send({ message: 'no data exist for this id' })
			return
		}

		const dorsalesDocument = await BibNumber.find({ id: {$in: leagueDoc.bibNumberIds}})

		if (dorsalesDocument == null) {
			res.status(404).send({ message: 'no data exist for this id' })
			return
		}

		const data = await LeagueService.processData(raceProcesseDocument, pointsCircuitDocument, dorsalesDocument)

		const rankingDoc = Ranking.build({ data: data, leagueId: leagueDoc.id, raceId: raceProcesseDocument[0].id, processedPoints: true })

		await rankingDoc.save()

		res.status(201).send()

	} catch (error) {
		console.log(error)
		res.status(500).json( error )
	}
}
