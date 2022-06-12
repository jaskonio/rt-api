import mongoose from "mongoose"
import { IRankingsSportmaniacs } from "./sportmaniacsModel"

export interface IRaceRow {
    raceId: string
    data: IRankingsSportmaniacs[]
}

interface raceRowModelinterface extends mongoose.Model<RaceRowDoc> {
    build(attr: IRaceRow): RaceRowDoc
}

export interface RaceRowDoc extends mongoose.Document {
    raceId: string
    data: IRankingsSportmaniacs[]
}

const raceRowSchema = new mongoose.Schema({
    raceId: {
        type: String,
        required: true
    },
    data: {
        type: mongoose.SchemaTypes.Mixed,
        required: false
    }
})

raceRowSchema.statics.build = (attr: IRaceRow) => {
    return new RaceRow(attr)
}

const RaceRow = mongoose.model<RaceRowDoc, raceRowModelinterface>('RaceRows', raceRowSchema)

export { RaceRow }