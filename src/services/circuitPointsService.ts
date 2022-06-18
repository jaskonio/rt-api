import axios from 'axios'
import * as pdfUtils from '../utils/pdfUtils'
import * as requetsUtils from '../utils/requestsUtils'

import { join } from 'path'
import { CircuitPoints, CircuitPointsData, CircuitPointsDataModel, CircuitPointsModel } from '../models/circuitPointsModel'

import * as crypto from 'crypto'
import { IPDFDataPageTableModel } from '../utils/pdfUtils'

export async function getAll(): Promise<CircuitPoints[]>  {
	const documents = await CircuitPointsModel.find({})

	return documents
}

export async function getById(id: string): Promise<CircuitPoints | null>  {
	const document = await CircuitPointsModel.findById(id)

	if (document === null) {
		return null
	}

	return document
}

export async function save(newDocument: CircuitPoints): Promise<CircuitPoints> {
	await CircuitPointsModel.create(newDocument)

	return newDocument
}

export async function update(id: string, newDocument: CircuitPoints): Promise<CircuitPoints | null> {
	const currentDocument = await getById(id)

	if (currentDocument === null) {
		throw { message: 'no data exist for this id' }
	}

	await CircuitPointsModel.updateOne(newDocument)

	const updatedDocument = await getById(id)

	return updatedDocument
}

export async function remove(id: string): Promise<void> {
	await CircuitPointsModel.deleteOne({id: id})
}

export async function processById(id: string): Promise<true | null> {
	const circuitPointDocument = await getById(id)

	if (circuitPointDocument == null) {
		return null
	}

	const data = await getDatabyCircuitPoints(circuitPointDocument.url)

	circuitPointDocument.data = data

	await CircuitPointsModel.findOneAndUpdate({id: id}, circuitPointDocument)

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

function convertPdfDataToTable(data: pdfUtils.IPDFDataModel): CircuitPointsData[] {
	let rows: CircuitPointsData[] = []
	rows = []

	data.pageTables.forEach((pageTable: IPDFDataPageTableModel) => {

		pageTable.tables.forEach((row: any, index: number, _array: any[]) => {
			if (row[0] === '') {
				return
			}

			if (pageTable.page == 1 && (index == 0 || index == 1)) {
				return
			}
			
			const newRow = new CircuitPointsDataModel({
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