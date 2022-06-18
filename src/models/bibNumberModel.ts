import { getModelForClass, prop } from '@typegoose/typegoose'

export class BibNumber{
	@prop({ required: true })
	public bibNumner: number

	@prop({ required: true })
	public runnerId: string

	@prop({ required: false, default: [], type: [String] })
	public disqualifiedRaceIds!: string[]
}

const BibNumberModel = getModelForClass(BibNumber)

export { BibNumberModel }
