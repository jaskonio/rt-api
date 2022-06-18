import { Season, SeasonModel }  from '../models/seasonModel'

export async function getAll(): Promise<Season[]> {
	const seasons = await SeasonModel.find({})
	return seasons
}

export async function getById(id: string): Promise<Season | null> {
	const season = await SeasonModel.findById(id)

	if (!season) {
		return null
	}

	return season
}

export async function save(model: Season): Promise<Season> {
	const season = new SeasonModel(model)
	await season.save()
	return season
}

export async function update(id: string, model: Season): Promise<Season | null> {
       
	const season = await SeasonModel.findById(id)
        
	if (season == null) {
		return null
	}
	
	await season.update(model)

	await season.save()

	return season
}

export async function remove(id: string): Promise<void> {
	await SeasonModel.deleteOne({id: id})
}
