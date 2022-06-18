import { getModelForClass, prop, Ref } from '@typegoose/typegoose'

export class CircuitPointsData {
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

const CircuitPointsDataModel = getModelForClass(CircuitPointsData)

export { CircuitPointsDataModel }


export class CircuitPoints {
    @prop({ required: true })
	public url: string

    @prop({ required: true, ref: () => CircuitPointsData })
    public data!: Ref<CircuitPointsData[]>

    @prop({ required: true })
    public seasonId: string
}

const CircuitPointsModel = getModelForClass(CircuitPoints)

export { CircuitPointsModel }