import mongoose from "mongoose"

export interface IRace {
    name: string
    processed: boolean
    celebrateDay: string
    url: string
    seasonId: string
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
        required: false
    }
})

raceSchema.statics.build = (attr: IRace) => {
    return new Race(attr)
}

const Race = mongoose.model<RaceDoc, raceModelinterface>('Races', raceSchema)

export { Race }