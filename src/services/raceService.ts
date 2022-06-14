import axios from 'axios'
import { IRace, Race, RaceDoc }  from '../models/raceModel'
import { RaceRow } from '../models/raceRowModel'
import { IRankingsSportmaniacs, IResponseSportmaniacs } from '../models/sportmaniacsModel'
import { RaceProcessed } from '../models/raceProcessedModel'

export async function getAll() {
	const races = await Race.find({})

	return races
}

export async function getById(id: string) {
	const race = await Race.findById(id)

	return race
}

export async function save(document: IRace) {
	const newDocument = Race.build(document)

	await newDocument.save()

	return newDocument
}

export async function update(id: string, newDocument: IRace): Promise<(RaceDoc & {_id: string;}) | null> {
	const currentDocument = await getById(id)

	if (currentDocument === null) {
		throw { message: 'no data exist for this id' }
	}

	await currentDocument.updateOne(newDocument)

	const updatedDocument = await getById(id)

	return updatedDocument
}

export async function remove(id: string) {
	await Race.deleteOne({id: id})
}

export async function getRankingsDatabyRace(url: string): Promise<IRankingsSportmaniacs[]> {
	try {
		const data = await axios.get<IResponseSportmaniacs>(url).then( response => {
			return response.data
		})

		const rankings = data.data.Rankings

		return rankings

	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log('error message: ', error.message)
			throw error.message
		} else {
			console.log('unexpected error: ', error)
			throw 'An unexpected error occurred'
		}
	}
}

export async function saveRowData(race: RaceDoc): Promise<IRankingsSportmaniacs[]> {
	try {
		const data = await getRankingsDatabyRace(race.url)

		const raceRowDocument = await RaceRow.findOne({ raceId: race.id})

		if (raceRowDocument == null) {
			const raceRowDocument = await RaceRow.build({raceId: race._id, data: data})
			await raceRowDocument.save()
		}
		else{
			raceRowDocument.updateOne({data: data})
		}

		return data
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log('unexpected error: ', err)
			throw 'An unexpected error occurred: '+ err?.message
		}

		throw 'An unexpected error occurred: ' + err
	}
}

export function getProcessedData(rows: IRankingsSportmaniacs[]): IRankingsSportmaniacs[] {
	const clubName = 'REDOLAT TEAM'
    
	const filteredRows = rows.filter( function(row: IRankingsSportmaniacs){
		return row.club.toLowerCase() == clubName.toLowerCase()
	})

	return filteredRows
}

export async function saveProcessedData(race: RaceDoc, rows: IRankingsSportmaniacs[]): Promise<IRankingsSportmaniacs[]> {
	const data = getProcessedData(rows)

	const raceProcessedDocument = await RaceProcessed.findOne({ raceId: race.id})

	if (raceProcessedDocument == null) {
		const raceProcessedDocument = await RaceProcessed.build({raceId: race._id, data: data})
		await raceProcessedDocument.save()
	}
	else{
		raceProcessedDocument.updateOne({data: data})
	}

	return data
}
