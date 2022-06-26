import { League, LeagueModel } from '../models/leagueModel'
import { Race, RaceModel } from '../models/raceModel'
import { RaceProcessedModel } from '../models/raceProcessedModel'
import { IRunnerData, RankingModel } from '../models/rankingModel'

export async function getAll(): Promise<League[]> {
	const leagues = await LeagueModel.find({})
	return leagues
}

export async function getById(id: string): Promise<League | null> {
	const league = await LeagueModel.findById(id)

	if (!league) {
		return null
	}

	return league
}

export async function save(model: League): Promise<League> {
    
	const league = new LeagueModel(model)
	await league.save()

	return league
}

export async function update(id: string, model: League): Promise<League | null> {
        
	const currentDocument = await LeagueModel.findById(id)

	if (currentDocument === null) {
		throw { message: 'no data exist for this id' }
	}

	// currentDocument.update(model)

	currentDocument.seasonId = model.seasonId

	await currentDocument.save()

	return currentDocument
}

export async function remove(id: string): Promise<void> {
	await LeagueModel.deleteOne({id: id})
}

export async function processById(id: string): Promise<null> {
	const league = await LeagueModel.findById(id)

	if (!league) {
		return null
	}

	await processLeagueById(id)

	return null
}


async function processLeagueById(leagueId: string) {
	const leagueDoc = await LeagueModel.findById(leagueId)

	if (!leagueDoc){
		return null
	}

	//const racesDocs = await RaceModel.find({ seasonId: leagueDoc.seasonId})
	let racesDocs = await RaceModel.find({})

	if (!racesDocs){
		return null
	}

	racesDocs = racesDocs.filter( element => {
		return element.seasonId == leagueDoc.seasonId
	})


	racesDocs.forEach((race: Race) => {
		if (race.processed == false) {
			return null
		}

		processRankingByRaceAndLeague(leagueId, race)
	})
}

async function processRankingByRaceAndLeague(leagueId: string, race: Race) {
	const raceProcessed = await RaceProcessedModel.findById(race._id)
	
	if (!raceProcessed) {
		return null
	}

	const rankingsSportmaniacs = raceProcessed.data

	rankingsSportmaniacs.sort((a, b) => (a.average > b.average ? -1 : 1))

	let position = 1
	let points = 25

	const runnersData: IRunnerData[] = rankingsSportmaniacs.map(element => {
		const newRunnerData: IRunnerData = {
			dorsal: element.dorsal,
			position: position,
			lastPosition: 0,
			points: points.toString(),
			name: element.name,
			lastRace: 0,
			topFive: false,
			participaciones: 0,
			bestPosition: 0,
			bestPositionCount: 0,
			textBestPosition: 'None',
			pointCircuit: 0,
			positionGeneralCircuit: 0,
			lastPositionGeneralCircuit: 0,
			lastPositionCategoryCircuit: 0,
			bestPace: element.average,
			bestPositionCategotyCircuit: 0,
			texBestPositionCategotyCircuit: 'None',
		
			pointsCurrentRace: 0,
		}
		position = position + 1

		if ( points >= 0) {
			points = points - 1
		}

		return newRunnerData
	})

	const newRankingModel = new RankingModel({
		data: runnersData,
		processedPoints: 'false',
		raceId: race._id,
		leagueId: leagueId
	})

	await newRankingModel.save()
}