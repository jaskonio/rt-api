import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { BibNumber } from './bibNumberModel'

export class League{
	@prop({ required: true })
	public seasonId: number

	@prop({ required: true })
	public name: string

	@prop({ required: false, ref: () => BibNumber })
	public bibNumberIds!: Ref<BibNumber[]>
}

const LeagueModel = getModelForClass(League)

export { LeagueModel }
