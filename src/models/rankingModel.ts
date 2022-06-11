import mongoose, { Schema } from "mongoose"

export interface IRanking {
    processed: boolean
    day_celebrate: string
    name: string
    url: string
    collection_name: string
}

interface rankingModelinterface extends mongoose.Model<RankingDoc> {
    build(attr: IRanking): RankingDoc
}

export interface RankingDoc extends mongoose.Document {
    processed: boolean
    day_celebrate: string
    name: string
    url: string
    collection_name: string
}

const rankingSchema = new mongoose.Schema({
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

rankingSchema.statics.build = (attr: IRanking) => {
    return buildRace('', attr)
}


export function buildRace(name: string, attr:IRanking) {
    const Race = mongoose.model<RankingDoc, rankingModelinterface>(name, rankingSchema)
    new Race(attr)
}

export function createModelForName(name: string): mongoose.Model<any, {}, {}, {}> {    
    var Any = new Schema({}, { strict: false })
    return mongoose.model(name, Any)
}