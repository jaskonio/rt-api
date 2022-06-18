// import { ICircuitPointsData } from '../models/circuitPointsModel'
// import { IRunnerData, ISummaryRunnerData } from '../models/rankingModel'
// import { IRankingsSportmaniacs } from '../models/sportmaniacsModel'

// export class BuilerRanking {

// 	rankingLeague: ISummaryRunnerData[]

// 	constructor(
//         public ranking: number
// 	) { 
// 		this.rankingLeague = []

// 		const raceOrderId = 0

// 		const dorsalesFromRace = this.getDorsalesFromRace(raceOrderId)
        
// 		const newRunnersFromRace: IRunnerData[] = []
        
// 		dorsalesFromRace.forEach(dorsal => {
// 			const newRunnerFromRace = this.createNewRunnerFromRace(dorsal, raceOrderId)
// 			newRunnersFromRace.push(newRunnerFromRace)
// 		})

// 		const summaryRunners: ISummaryRunnerData[] = []

// 		newRunnersFromRace.forEach(runner => {
// 			const summaryRunner = this.mergerRunnerToNewRunner(runner)
// 			summaryRunners.push(summaryRunner)
// 		})

// 		this.orderRankingRace(summaryRunners)

// 		this.rankingLeague = summaryRunners
// 	}

// 	getRanking(): ISummaryRunnerData[] {
// 		return this.rankingLeague
// 	}
    

// 	createNewRunnerFromRace(dorsal: string, raceOrderId: number): IRunnerData {
// 		const runnerFromRanking = this.getRaceByOrderId(raceOrderId)        
// 		const runnerPoints = this.getPointsByOrderIdAndDorsal(dorsal, raceOrderId)

// 		const newRunner: IRunnerData = {
// 			dorsal: dorsal,
// 			position: runnerFromRanking.position,
// 			lastPosition: 0,
// 			points: '',
// 			name: runnerFromRanking.name,
// 			lastRace: 0,
// 			topFive: false,
// 			participaciones: runnerPoints.participaciones,
// 			bestPosition: 0,
// 			bestPositionCount: 0,
// 			textBestPosition: '',
// 			pointCircuit: runnerPoints.points[raceOrderId],
// 			positionGeneralCircuit: runnerPoints.position,
// 			lastPositionGeneralCircuit: runnerPoints.position,
// 			lastPositionCategoryCircuit: runnerPoints.position,
// 			bestPace: runnerFromRanking.average,
// 			bestPositionCategotyCircuit: runnerPoints.position,
// 			texBestPositionCategotyCircuit: runnerPoints.position.toString(),
// 			pointsCurrentRace: 0,
// 		}

// 		return newRunner
// 	}


// 	mergerRunnerToNewRunner(newRunnerFromRace: IRunnerData): ISummaryRunnerData {
// 		const runnerFromSummaryRanking = this.getSummaryRunnerByDorsal(newRunnerFromRace.dorsal)

// 		runnerFromSummaryRanking.points = runnerFromSummaryRanking.points + newRunnerFromRace.points        
// 		runnerFromSummaryRanking.lastRace = newRunnerFromRace.lastRace
// 		runnerFromSummaryRanking.topFive = true
// 		runnerFromSummaryRanking.participaciones = newRunnerFromRace.participaciones
// 		runnerFromSummaryRanking.bestPosition = runnerFromSummaryRanking.bestPosition < newRunnerFromRace.bestPosition ? runnerFromSummaryRanking.bestPosition : newRunnerFromRace.bestPosition
// 		runnerFromSummaryRanking.bestPositionCount = 0
// 		runnerFromSummaryRanking.textBestPosition = '0'
// 		runnerFromSummaryRanking.pointCircuit = runnerFromSummaryRanking.pointCircuit + newRunnerFromRace.pointCircuit
// 		runnerFromSummaryRanking.positionGeneralCircuit = 0
// 		runnerFromSummaryRanking.lastPositionGeneralCircuit = 0
// 		runnerFromSummaryRanking.lastPositionCategoryCircuit = 0
// 		runnerFromSummaryRanking.bestPace = '0'
// 		runnerFromSummaryRanking.bestPositionCategotyCircuit = 0
// 		runnerFromSummaryRanking.texBestPositionCategotyCircuit = 0
// 		runnerFromSummaryRanking.pointsCurrentRace = 0

// 		return runnerFromSummaryRanking
// 	}

// 	orderRankingRace(rankings: ISummaryRunnerData[]): ISummaryRunnerData[] {
// 		return rankings
// 	}

// 	getSummaryRunnerByDorsal(dorsal: string): ISummaryRunnerData {
// 		throw new Error('Method not implemented.')
// 	}



// 	getPointsByOrderIdAndDorsal(dorsal: string, raceOrderId: number): ICircuitPointsData {
// 		throw new Error('Method not implemented.')
// 	}

// 	getRaceByOrderId(raceOrderId: number): IRankingsSportmaniacs {
// 		throw new Error('Method not implemented.')
// 	}


// 	getDorsalesFromRace(raceOrderId: number): string[] {
// 		throw new Error('Method not implemented.')
// 	}
// }