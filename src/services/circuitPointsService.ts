import axios from 'axios'
import * as pdfUtils from '../utils/pdfUtils'
import * as requetsUtils from '../utils/requestsUtils'
import * as crypto from 'crypto'
import { IPDFDataPageTableModel } from '../utils/pdfUtils'
import { join } from 'path'
import { SeasonCircuitPoints, SeasonCircuitPointsModel } from '../models/seasonCircuitPointsModel'
import { RunnerCircuitPoints, RunnerCircuitPointsModel } from '../models/runnerCircuitPointsModel'


export async function getAll(): Promise<SeasonCircuitPoints[]>  {
	const documents = await SeasonCircuitPointsModel.find({})

	return documents
}

export async function getById(id: string): Promise<SeasonCircuitPoints | null>  {
	const document = await SeasonCircuitPointsModel.findById(id)
	
	return document
}

export async function save(seasonCircuitPoints: SeasonCircuitPoints): Promise<SeasonCircuitPoints> {
	const newDocument = new SeasonCircuitPointsModel(seasonCircuitPoints)

	await newDocument.save()

	return newDocument
}

export async function update(id: string, newDocument: SeasonCircuitPoints): Promise<SeasonCircuitPoints | null> {
	const currentDocument = await SeasonCircuitPointsModel.findById(id)

	if (currentDocument === null) {
		return null
	}

	await currentDocument.update(newDocument)

	await currentDocument.save()	

	return currentDocument
}

export async function remove(id: string): Promise<void> {
	await SeasonCircuitPointsModel.deleteOne({id: id})
}

export async function processById(id: string): Promise<true | null> {
	const circuitPointDocument = await getById(id)

	if (circuitPointDocument == null) {
		return null
	}

	const data = await getDatabyCircuitPoints(circuitPointDocument.url)

	circuitPointDocument.data = data

	await SeasonCircuitPointsModel.findOneAndUpdate({id: id}, circuitPointDocument)

	return true
}

async function getDatabyCircuitPoints(circuitPointUrl: string) {
	const url: string = circuitPointUrl

	try {
		const filename = crypto.randomBytes(20).toString('hex') + '.pdf'
		const fullFileName = join(__dirname, filename)
        
		await requetsUtils.downloadFile(url, fullFileName)
		const data = await pdfUtils.convertPdfTOJson(fullFileName)

		const dataTable = convertPdfDataToTable(data)

		return dataTable
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log('error message: ', error.message)
			throw error.message
		} else {
			console.log('unexpected error: ', error)
			throw 'An unexpected error occurred'
		}
	}
}

function convertPdfDataToTable(data: pdfUtils.IPDFDataModel): RunnerCircuitPoints[] {
	let rows: RunnerCircuitPoints[] = []
	rows = []

	data.pageTables.forEach((pageTable: IPDFDataPageTableModel) => {

		pageTable.tables.forEach((row: any, index: number, _array: any[]) => {
			if (row[0] === '') {
				return
			}

			if (pageTable.page == 1 && (index == 0 || index == 1)) {
				return
			}
			
			const newRow = new RunnerCircuitPointsModel({
				dorsal: row[0],
				fullName: row[1],
				points: [ row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11] ],
				totalPoints: row[12],
				participaciones: row[13],
				position: row[14]
			})

			rows.push(newRow)
		})
	})

	return rows
}