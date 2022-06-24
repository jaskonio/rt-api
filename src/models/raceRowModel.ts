import { IRankingsSportmaniacs } from './sportmaniacsModel'
import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { Race } from './raceModel'

export class RaceRow{
	@prop({ required: true, ref: () => Race })
	public raceId: Ref<Race>

	@prop({ required: true })
	public data: IRankingsSportmaniacs[]
}

const RaceRowModel = getModelForClass(RaceRow)

export { RaceRowModel }