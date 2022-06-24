import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { League } from './leagueModel'

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

export class SummaryRanking{
	@prop({ required: true, ref: () => League})
	public leagueId: Ref<League>

	@prop({ required: true })
	public data: ISummaryRunnerData[]
}

const SummaryRankingModel = getModelForClass(SummaryRanking)

export { SummaryRankingModel }