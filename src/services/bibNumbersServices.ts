import { BibNumberModel, BibNumber }  from '../models/bibNumberModel'

export async function getAll(): Promise<BibNumber[]>  {
	const bibNumber = await BibNumberModel.find({})

	return bibNumber
}

export async function getById(id: string): Promise<BibNumber | null>  {
	const bibNumber = await BibNumberModel.findById(id)

	if (bibNumber === null) {
		return null
	}

	return bibNumber
}

export async function save(model: BibNumber): Promise<void> {
	await BibNumberModel.create(model)
}

export async function update(id: string, model: BibNumber): Promise<BibNumber| null> {
	const bibNumber = await getById(id)

	if (bibNumber === null) {
		throw { message: 'no data exist for this id' }
	}

	await BibNumberModel.updateOne(model)

	const newBibNumber = await BibNumberModel.findById(id)

	return newBibNumber
}

export async function remove(id: string): Promise<void> {
	await BibNumberModel.deleteOne({id: id})
}
