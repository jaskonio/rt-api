import mongoose from "mongoose"

export interface ICircuitPoints {
    name: string
    url: string  
    collection_name: string
}

interface circuitPointsModelinterface extends mongoose.Model<CircuitPointsDoc> {
    build(attr: ICircuitPoints): CircuitPointsDoc
}

export interface CircuitPointsDoc extends mongoose.Document {
    name: string
    url: string  
    collection_name: string
}

const circuitPointsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    collection_name: {
        type: String,
        required: true
    }
})

circuitPointsSchema.statics.build = (attr: ICircuitPoints) => {
    return new CircuitPoints(attr)
}

const CircuitPoints = mongoose.model<CircuitPointsDoc, circuitPointsModelinterface>('CircuitPointss', circuitPointsSchema)

export { CircuitPoints }