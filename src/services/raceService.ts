import axios from 'axios'
import { Race, RaceModel }  from '../models/raceModel'
import { RaceRowModel} from '../models/raceRowModel'
import { IRankingsSportmaniacs, IResponseSportmaniacs } from '../models/sportmaniacsModel'

export async function getAll(): Promise<Race[]> {
	const races = await RaceModel.find({})

	return races
}

export async function getById(id: string): Promise<Race | null> {
	const race = await RaceModel.findById(id)

	return race
}

export async function save(race: Race): Promise<Race> {
	const newDocument = new RaceModel(race)

	await newDocument.save()

	return newDocument
}

export async function update(id: string, race: Race): Promise<Race | null> {
	const currentDocument = await RaceModel.findById(id)

	if (currentDocument === null) {
		return null
	}

	await currentDocument.updateOne(race)

	await currentDocument.save()

	return currentDocument
}

export async function remove(id: string): Promise<void> {
	await RaceModel.deleteOne({id: id})
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

export async function saveRowData(race: Race): Promise<IRankingsSportmaniacs[]> {
	try {
		const data = await getRankingsDatabyRace(race.url)

		const raceRowDocument = await RaceRowModel.findOne({ raceId: race._id})

		if (raceRowDocument == null) {
			const newRaceRowDocument = new RaceRowModel({raceId: race._id, data: data})
			await newRaceRowDocument.save()
		}
		else{
			raceRowDocument.update({data: data})
			await raceRowDocument.save()
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

export async function saveProcessedData(race: Race, rows: IRankingsSportmaniacs[]): Promise<IRankingsSportmaniacs[]> {
	const data = getProcessedData(rows)

	const raceProcessedDocument = await RaceRowModel.findOne({ raceId: race._id})

	if (raceProcessedDocument == null) {
		const newRaceProcessedDocument = await new RaceRowModel({raceId: race._id, data: data})
		await newRaceProcessedDocument.save()
	}
	else{
		raceProcessedDocument.update({data: data})
	}

	return data
}