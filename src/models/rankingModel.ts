import mongoose from "mongoose"

export interface IRunnerData {
    name: string
    dorsal: string
    pos: string
    points: string
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

export interface ISummaryRanking {
    leagueId: string
    data: IRunnerData[]
}

interface summaryRankingModelinterface extends mongoose.Model<SummaryRankingDoc> {
    build(attr: ISummaryRanking): SummaryRankingDoc
}

export interface SummaryRankingDoc extends mongoose.Document {
    leagueId: string
    data: IRunnerData[]
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
