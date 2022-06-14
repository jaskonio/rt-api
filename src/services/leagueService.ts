import { BibNumberDoc } from '../models/bibNumberModel'
import { CircuitPointsDoc, ICircuitPointsData } from '../models/circuitPointsModel'
import { RaceProcessedDoc } from '../models/raceProcessedModel'
import { IRunnerData } from '../models/rankingModel'
import { IRankingsSportmaniacs } from '../models/sportmaniacsModel'

export async function processData(racesProcessedDocument: (RaceProcessedDoc & {_id: any;})[], 
	pointsCircuitDocument: CircuitPointsDoc & {_id: any;},
	dorsalesDocument: (BibNumberDoc & {_id: any;})[]): Promise<IRunnerData[]> {
	console.log(processData)
    
	console.log(racesProcessedDocument)
	console.log(pointsCircuitDocument.url)
	console.log(dorsalesDocument[0].bibNumner)
  
	let dorsales = [] as number[]
	dorsales = []
    
	dorsalesDocument.forEach( (BibNumberDoc: BibNumberDoc & {_id: any;}) => {
		dorsales.push(BibNumberDoc.bibNumner)
	})

	// races filtered by dorsales id 
	racesProcessedDocument.forEach( (raceDocument: RaceProcessedDoc & {_id: any;}) => {
		raceDocument.data = raceDocument.data.filter( (rankingsSportmaniacs: IRankingsSportmaniacs) => {
			return dorsales.includes(+rankingsSportmaniacs.dorsal)
		})
	})

	// points list filtered by dorsales id 
	let pointsCircuit = [] as ICircuitPointsData[]
	pointsCircuit = []

	if(pointsCircuitDocument.data == null) {
		throw ''
	}

	pointsCircuitDocument.data.forEach( (pointCircuitDocument: ICircuitPointsData) => {
		if (dorsales.includes(Number(pointCircuitDocument.dorsal))) {
			pointsCircuit.push(pointCircuitDocument)
		}
	})

	// order race by position
	// todo
    
	let indexRaceProccess = 0
	indexRaceProccess = 0

	let historyRunnersData: IRunnerData[] = []
	historyRunnersData = []

	racesProcessedDocument.forEach( (raceDocument: RaceProcessedDoc & {_id: any;}) => {

		const runnersData: IRunnerData[] = []

		let indexPosition = 1

		raceDocument.data.forEach( (rankingsSportmaniacs: IRankingsSportmaniacs) => {
			const runnerData: IRunnerData = {
				dorsal: rankingsSportmaniacs.dorsal,

				position: indexPosition,
				lastPosition: buildLastPosition(rankingsSportmaniacs.dorsal, racesProcessedDocument, indexRaceProccess),
				points: builPoints(rankingsSportmaniacs.dorsal, buildPointsCurrentRace(indexPosition), historyRunnersData),
				name: rankingsSportmaniacs.name,
				lastRace: buildLastRace(rankingsSportmaniacs.dorsal, racesProcessedDocument, indexRaceProccess),
				topFive: indexPosition <= 5,
				participaciones: buildtParticipaciones(rankingsSportmaniacs.dorsal, racesProcessedDocument, indexRaceProccess),
				bestPosition: buildBestPosition(historyRunnersData),
				bestPositionCount: buildbestPositionCount(historyRunnersData),
				textBestPosition: buildTextBestPosition(buildBestPosition(historyRunnersData), buildbestPositionCount(historyRunnersData)),
				pointCircuit: buildPointCircuit(rankingsSportmaniacs.dorsal, pointsCircuit, indexRaceProccess),
				positionGeneralCircuit: buildPositionGeneralCircuit(rankingsSportmaniacs.dorsal, racesProcessedDocument, indexRaceProccess),
				lastPositionGeneralCircuit: buildLastPositionGeneralCircuit(rankingsSportmaniacs.dorsal, racesProcessedDocument, indexRaceProccess),
				lastPositionCategoryCircuit: 0,
				bestPace: buildBestPace(rankingsSportmaniacs.dorsal, racesProcessedDocument, indexRaceProccess),
				bestPositionCategotyCircuit: 0,
				texBestPositionCategotyCircuit: '0',
            
				pointsCurrentRace: buildPointsCurrentRace(indexPosition),
			}

			runnersData.push(runnerData)
			historyRunnersData.push(runnerData)

			indexPosition = indexPosition + 1
		})

		indexRaceProccess = indexRaceProccess + 1
	})

	return historyRunnersData
}

function buildLastPosition(dorsal: string, racesProcessedDocument: (RaceProcessedDoc & { _id: any; })[], indexRaceProccess: number): number {
	let lastPosition = 0
	if (indexRaceProccess === 0) {
		racesProcessedDocument.forEach(element => {
			element.data.forEach(element => {
				if ( element.dorsal === dorsal) {
					lastPosition = Number(element.pos)
					return
				}
			})
		})

		return lastPosition
	}

	const indexRange = indexRaceProccess - 1

	racesProcessedDocument[indexRange].data.forEach( (element) => {
		if ( element.dorsal === dorsal) {
			lastPosition = Number(element.pos)
		}        
	})

	return lastPosition
}

function builPoints(dorsal: string, currentPoint: number, historyRunnersData: IRunnerData[]): string {
	console.log('builPoints')

	let points = 0

	historyRunnersData.forEach((runnerData) => {
		if (runnerData.dorsal == dorsal) {
			points = points + Number(runnerData.points)
			return 
		}
	})

	points = points + currentPoint

	return points.toString()
}

function buildLastRace(_dorsal: string, _racesProcessedDocument: (RaceProcessedDoc & { _id: any; })[], indexRaceProccess: number): number {
	console.log('buildLastRace')

	const lastRace = 0

	if (indexRaceProccess == 0) {
		return lastRace
	}

	return lastRace
}

function buildtParticipaciones(_dorsal: string, _racesProcessedDocument: (RaceProcessedDoc & { _id: any; })[], indexRaceProccess: number): number {
	console.log('buildtParticipaciones')

	let participaciones = 0
	participaciones = 0


	if (indexRaceProccess == 0) {
		return participaciones
	}

	return participaciones
}

function buildBestPosition(runnersData: IRunnerData[]): number {
	console.log('buildBestPosition')

	if (runnersData.length == 0) {
		return 0
	}

	let bestPosition: number[] = []

	runnersData.forEach( (runnerData: IRunnerData ) => {
		bestPosition.push(runnerData.bestPosition)
	})

	bestPosition = bestPosition.sort().reverse()


	return bestPosition[0]
}

function buildbestPositionCount(runnersData: IRunnerData[]): number {
	console.log('buildbestPositionCount')

	if (runnersData.length == 0) {
		return 0
	}

	let bestPosition: number[] = []

	runnersData.forEach( (runnerData: IRunnerData ) => {
		bestPosition.push(runnerData.bestPosition)
	})

	bestPosition = bestPosition.sort().reverse()

	const firstBestPosition = bestPosition[0]
	let countBestPosition = 0

	bestPosition.forEach( (element: number )=> {
		if (firstBestPosition === element) {
			countBestPosition = countBestPosition + 1
		}
	})

	return countBestPosition
}

function buildTextBestPosition(bestPosition: number, count: number): string {
	console.log('buildTextBestPosition')

	const position = bestPosition.toString()
	let textCount = ` (X${count.toString()})`

	if (count === 1) {
		textCount = ''
	}
    
	return `${position}${textCount}`
}

function buildPointCircuit(dorsal: string, circuitPointsData: ICircuitPointsData[], indexRaceProccess: number): number {
	console.log('buildPointCircuit')

	let point = 0
    
	circuitPointsData.forEach( (circuitPointData:ICircuitPointsData) => {
		if (circuitPointData.dorsal == Number(dorsal)) {
			point = circuitPointData.points[indexRaceProccess]
		}
	})

	return point
}

function buildPositionGeneralCircuit(dorsal: string, racesProcessedDocument: (RaceProcessedDoc & { _id: any; })[], indexRaceProccess: number): number {
	console.log('buildPositionGeneralCircuit')

	const rankingsSportmaniacs = racesProcessedDocument[indexRaceProccess].data

	let position = 0

	rankingsSportmaniacs.forEach(element => {
		if ( element.dorsal === dorsal) {
			position = Number(element.pos)
			return
		}
	})

	return position
}

function buildLastPositionGeneralCircuit(_dorsal: string, _racesProcessedDocument: (RaceProcessedDoc & { _id: any; })[], _indexRaceProccess: number): number {
	console.log('buildLastPositionGeneralCircuit')

	return 0
}

function buildBestPace(dorsal: string, racesProcessedDocument: (RaceProcessedDoc & { _id: any; })[], indexRaceProccess: number): string {
	console.log('buildBestPace')
    
	if ( indexRaceProccess === 0) {
		let pace = ''
		racesProcessedDocument[0].data.forEach( (element) => {
			if (element.dorsal === dorsal) {
				pace = element.average
			}
		})

		return pace
	}

	const indexRange = range(indexRaceProccess + 1 )

	let copyRacesProcessedDocument:(RaceProcessedDoc & { _id: any; })[] = []
	copyRacesProcessedDocument = []

	indexRange.forEach((_element, index, _array) => {
		copyRacesProcessedDocument.push(racesProcessedDocument[index])
	})

	let paces: string[] = []
	paces = []

	copyRacesProcessedDocument.forEach( (raceProcessedDoc: (RaceProcessedDoc & {_id: any;})) => {
		raceProcessedDoc.data.forEach( element => {
			paces.push(element.average)
		})
	})

	return paces.sort()[0]
}

function range(end: number) {
	return Array.from(Array(end).keys())
}

function buildPointsCurrentRace(indexPosition: number): number {
	console.log('buildPointsCurrentRace')

	const points = [ 25, 18, 15, 12, 10, 8, 6, 4, 2, 1]

	return points[indexPosition]
}
