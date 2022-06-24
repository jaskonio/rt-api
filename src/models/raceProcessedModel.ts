import { IRankingsSportmaniacs } from './sportmaniacsModel'
import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { Race } from './raceModel'

export class RaceProcessed{
	@prop({ required: true, ref: () => Race })
	public raceId: Ref<Race>

	@prop({ required: true })
	public data: IRankingsSportmaniacs
}

const RaceProcessedModel = getModelForClass(RaceProcessed)

export { RaceProcessedModel }