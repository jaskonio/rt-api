import { Ranking, RankingModel }  from '../models/rankingModel'

export async function getAll(): Promise<Ranking[]> {
	const rankings = await RankingModel.find({})

	return rankings
}

export async function getById(id: string): Promise<Ranking | null> {
	const ranking = await RankingModel.findById(id)

	return ranking
}

export async function remove(id: string): Promise<void> {
	await RankingModel.deleteOne({id: id})
}