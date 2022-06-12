import mongoose from "mongoose"
import { IRankingsSportmaniacs } from "./sportmaniacsModel"

export interface IRaceProcessed {
    raceId: string
    data: IRankingsSportmaniacs[]
}

interface raceProcessedModelinterface extends mongoose.Model<RaceProcessedDoc> {
    build(attr: IRaceProcessed): RaceProcessedDoc
}

export interface RaceProcessedDoc extends mongoose.Document {
    raceId: string
    data: IRankingsSportmaniacs[]
}

const raceProcessedSchema = new mongoose.Schema({
    raceId: {
        type: String,
        required: true
    },
    data: {
        type: mongoose.SchemaTypes.Mixed,
        required: false
    }
})

raceProcessedSchema.statics.build = (attr: IRaceProcessed) => {
    return new RaceProcessed(attr)
}

const RaceProcessed = mongoose.model<RaceProcessedDoc, raceProcessedModelinterface>('RaceProcesseds', raceProcessedSchema)

export { RaceProcessed }