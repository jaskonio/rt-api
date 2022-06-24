import { getModelForClass, prop } from '@typegoose/typegoose'

export class RunnerCircuitPoints {
    @prop({ required: true })
	public dorsal: number

    @prop({ required: true })
    public fullName: string
    
    @prop({ required: true, type: [Number], default: [] })
    public points: number[]

    @prop({ required: true })
    public totalPoints: number

    @prop({ required: true })
    public participaciones: number

    @prop({ required: true })
    public position: number
}

const RunnerCircuitPointsModel = getModelForClass(RunnerCircuitPoints)

export { RunnerCircuitPointsModel }
