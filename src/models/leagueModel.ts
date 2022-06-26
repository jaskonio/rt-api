import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { Season } from './seasonModel'
import { BibNumber } from './bibNumberModel'

export class League{
	@prop({ required: true, ref: () => Season })
	public seasonId: Ref<Season>

	@prop({ required: true })
	public name: string

	@prop({ required: false, ref: () => BibNumber })
	public bibNumberIds!: Ref<BibNumber[]>
}

const LeagueModel = getModelForClass(League)

export { LeagueModel }
