import mongoose from "mongoose"

export interface IRunnerData {
    dorsal: string

    position: number
    lastPosition: number
    points: string
    name: string
    lastRace: number
    topFive: boolean
    participaciones: number
    bestPosition: number
    bestPositionCount: number
    textBestPosition: string
    pointCircuit: number
    positionGeneralCircuit: number
    lastPositionGeneralCircuit: number
    lastPositionCategoryCircuit: number
    bestPace: string
    bestPositionCategotyCircuit: number
    texBestPositionCategotyCircuit: string

    pointsCurrentRace: number
}

export interface IRanking {
    data: IRunnerData[]
    processedPoints: boolean

    raceId: string
    leagueId: string
}

interface rankingModelinterface extends mongoose.Model<RankingDoc> {
    build(attr: IRanking): RankingDoc
}

export interface RankingDoc extends mongoose.Document {
    data: IRunnerData[]
    processedPoints: boolean

    raceId: string
    leagueId: string
}

const rankingSchema = new mongoose.Schema({
    data: {
        type: mongoose.SchemaTypes.Mixed,
        required: true
    },
    processedPoints: {
        type: Boolean,
        default: false,
        required: false
    },
    raceId: {
        type: String,
        required: true
    },
    leagueId: {
        type: String,
        required: true
    }
})

rankingSchema.statics.build = (attr: IRanking) => {
    return new Ranking(attr)
}

const Ranking = mongoose.model<RankingDoc, rankingModelinterface>('Rankings', rankingSchema)


export interface ISummaryRunnerData {
    dorsal: string

    position: number
    lastPosition: number
    points: string
    name: string
    lastRace: number
    topFive: boolean
    participaciones: number
    bestPosition: number
    bestPositionCount: number
    textBestPosition: string
    pointCircuit: number
    positionGeneralCircuit: number
    lastPositionGeneralCircuit: number
    lastPositionCategoryCircuit: number
    bestPace: string
    bestPositionCategotyCircuit: number
    texBestPositionCategotyCircuit: number

    pointsCurrentRace: number
}

export interface ISummaryRanking {
    leagueId: string
    data: ISummaryRunnerData[]
}

interface summaryRankingModelinterface extends mongoose.Model<SummaryRankingDoc> {
    build(attr: ISummaryRanking): SummaryRankingDoc
}

export interface SummaryRankingDoc extends mongoose.Document {
    leagueId: string
    data: ISummaryRunnerData[]
}

const summaryRankingSchema = new mongoose.Schema({
    leagueId: {
        type: String,
        required: true
    },
    data: {
        type: mongoose.SchemaTypes.Mixed,
        required: true
    }
})

summaryRankingSchema.statics.build = (attr: IRanking) => {
    return new Ranking(attr)
}

const SummaryRanking = mongoose.model<SummaryRankingDoc, summaryRankingModelinterface>('SummaryRankings', rankingSchema)

export { SummaryRanking, Ranking }
