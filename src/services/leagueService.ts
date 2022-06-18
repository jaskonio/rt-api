import { League, LeagueModel } from '../models/leagueModel'

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

	currentDocument.update(model)

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

	return null
}
