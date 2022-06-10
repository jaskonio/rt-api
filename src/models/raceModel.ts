import mongoose from "mongoose"

export interface IRace {
    processed: boolean
    day_celebrate: string
    name: string
    url: string
    collection_name: string
}

interface raceModelinterface extends mongoose.Model<RaceDoc> {
    build(attr: IRace): RaceDoc
}

export interface RaceDoc extends mongoose.Document {
    processed: boolean
    day_celebrate: string
    name: string
    url: string
    collection_name: string
}

const raceSchema = new mongoose.Schema({
    processed: {
        type: Boolean,
        required: true
    },
    day_celebrate: {
        type: String,
        required: true
    },
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
    },
})

raceSchema.statics.build = (attr: IRace) => {
    return new Race(attr)
}

const Race = mongoose.model<RaceDoc, raceModelinterface>('Races', raceSchema)

export { Race }