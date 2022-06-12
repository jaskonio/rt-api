import mongoose from "mongoose"
import { IRankingsSportmaniacs } from "./sportmaniacsModel"

export interface IRace {
    name: string
    processed: boolean
    celebrateDay: string
    url: string
    seasonId: string
    data: IRankingsSportmaniacs[]
}

interface raceModelinterface extends mongoose.Model<RaceDoc> {
    build(attr: IRace): RaceDoc
}

export interface RaceDoc extends mongoose.Document {
    name: string
    processed: boolean
    celebrateDay: string
    url: string
    seasonId: string
    data: IRankingsSportmaniacs[]
}

const raceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    processed: {
        type: Boolean,
        default: false,
        required: false
    },
    celebrateDay: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    seasonId: {
        type: String,
        required: true
    },
    data: {
        type: mongoose.SchemaTypes.Mixed,
        required: false  
    }
})

raceSchema.statics.build = (attr: IRace) => {
    return new Race(attr)
}

const Race = mongoose.model<RaceDoc, raceModelinterface>('Races', raceSchema)

export { Race }