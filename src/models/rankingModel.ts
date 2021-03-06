
import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { Race } from './raceModel'
import { League } from './leagueModel'

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

export class Ranking{
	@prop({ required: true })
	public data: IRunnerData[]
	
	@prop({ required: true })
	public processedPoints: string

	@prop({ required: false, ref: () => Race })
	public raceId: Ref<Race>
	
    @prop({ required: false, ref: () => League })
	public leagueId: Ref<League>
}

const RankingModel = getModelForClass(Ranking)

export { RankingModel }