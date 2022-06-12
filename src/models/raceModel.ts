import mongoose from "mongoose"

export interface IRaceRanking {
    Points: {
        average: string
        averageNet: string
        catOffset: number
        catPos: string
        genOffset: number
        genPos: string
        legTime: string
        officialTime: string
        offset: number
        pos: string
        realPos: string
        realTime: string
        split_id: string
        videoRepeat: string
    }
    average: string
    averageNet: string
    catPos: string
    category: string
    category_id: string
    club: string
    comments: string
    defaultImage: boolean
    dorsal: string
    externalDiploma: boolean
    externalPhotos: boolean
    externalVideos: boolean
    finishedRace: boolean
    genPos: string
    gender: string
    name: string
    nationality: string
    officialTime: string
    photos: {
        sm: string
    }
    pos: string
    realCatPos: string
    realGenPos: string
    realPos: string
    realTime: string
    user_id: 0
}

export interface IRace {
    name: string
    processed: boolean
    celebrateDay: string
    url: string
    seasonId: string
    data: IRaceRanking[]
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
    data: IRaceRanking[]
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