import { BibNumber, BibNumberDoc, IBibNumber }  from '../models/bibNumberModel'

export async function getAll(): Promise<(BibNumberDoc & { _id: any })[]>  {
	const bibNumber = await BibNumber.find({})

	return bibNumber
}

export async function getById(id: string): Promise<(BibNumberDoc & { _id: any;}) | null>  {
	const bibNumber = await BibNumber.findById(id)

	if (bibNumber === null) {
		return null
	}

	return bibNumber
}

export async function save(doc:BibNumberDoc ): Promise<void> {
	const newBibNumber = BibNumber.build(doc)

	await newBibNumber.save()
}

export async function update(id: string, doc: IBibNumber): Promise<(BibNumberDoc & {_id: any;}) | null> {
	const bibNumber = await getById(id)

	if (bibNumber === null) {
		throw { message: 'no data exist for this id' }
	}

	await bibNumber.updateOne(doc)

	const newBibNumber = await BibNumber.findById(id)

	return newBibNumber
}

export async function remove(id: string): Promise<void> {
	await BibNumber.deleteOne({id: id})
}

export async function buildDocument(value: IBibNumber): Promise<BibNumberDoc> {
	const newBibNumber = BibNumber.build(value)
	return newBibNumber
}
