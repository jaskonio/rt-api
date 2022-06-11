import mongoose from "mongoose"

export interface Iseason {
    name: string
    racesIds: string[]
    leaguesIds: string[]
}

interface seasonModelinterface extends mongoose.Model<seasonDoc> {
    build(attr: Iseason): seasonDoc
}

export interface seasonDoc extends mongoose.Document {
    name: string
    racesIds: string[]
    leaguesIds: string[]
}

const seasonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    racesIds: {
        type: [String],
        required: false
    },
    leaguesIds: {
        type: [String],
        required: false
    }
})

seasonSchema.statics.build = (attr: Iseason) => {
    return new Season(attr)
}

const Season = mongoose.model<seasonDoc, seasonModelinterface>('Season', seasonSchema)

export { Season }