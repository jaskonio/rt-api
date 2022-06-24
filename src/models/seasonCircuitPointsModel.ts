import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { RunnerCircuitPoints } from './runnerCircuitPointsModel'
import { Season } from './seasonModel'

export class SeasonCircuitPoints {
    @prop({ required: true })
	public url: string

    @prop({ required: true, ref: () => RunnerCircuitPoints })
    public data!: Ref<RunnerCircuitPoints[]>

    @prop({ required: true, ref: () => Season })
    public seasonId: Ref<Season>
}

const SeasonCircuitPointsModel = getModelForClass(SeasonCircuitPoints)

export { SeasonCircuitPointsModel }