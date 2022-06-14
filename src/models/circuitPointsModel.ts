import mongoose from 'mongoose'

export interface ICircuitPointsData {
    dorsal: number
    fullName: string
    points: number[]
    totalPoints: number
    participaciones: number
    position: number
}

export interface ICircuitPoints {
    url: string
    data: ICircuitPointsData[] | null

    seasonId: string
}

interface circuitPointsModelinterface extends mongoose.Model<CircuitPointsDoc> {
    build(attr: ICircuitPoints): CircuitPointsDoc
}

export interface CircuitPointsDoc extends mongoose.Document {
    url: string
    data: ICircuitPointsData[] | null

    seasonId: string
}

const circuitPointsSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true
	},
	data: {
		type: mongoose.SchemaTypes.Mixed,
		required: false
	},
	seasonId: {
		type: String,
		required: true
	}
})

circuitPointsSchema.statics.build = (attr: ICircuitPoints) => {
	return new CircuitPoints(attr)
}

const CircuitPoints = mongoose.model<CircuitPointsDoc, circuitPointsModelinterface>('CircuitPoints', circuitPointsSchema)

export { CircuitPoints }