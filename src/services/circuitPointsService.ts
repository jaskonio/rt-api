import axios from 'axios'
import * as mongooseUtils from '../utils/mongoose'
import * as pdfUtils from '../utils/pdfUtils'
import * as requetsUtils from '../utils/requestsUtils'

import { join } from 'path';

var crypto = require("crypto");

export async function getDatabyCircuitPoints(circuitPointUrl: string) {
    let url: string = circuitPointUrl;

    try {
        var filename = crypto.randomBytes(20).toString('hex') + ".pdf"
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

export async function saveRankingsData(collectionName: string, data: any) {
    try {
        let newCollection = mongooseUtils.createModelForName(collectionName)

        await newCollection.insertMany(data)
    } catch (error: any) {
        console.log('unexpected error: ', error)
        throw 'An unexpected error occurred: '+ error?.message
    }
}

export interface ICircuitPoints {
    dorsal: number
    fullName: string
    pointsRace1: number
    pointsRace2: number
    pointsRace3: number
    pointsRace4: number
    pointsRace5: number
    pointsRace6: number
    pointsRace7: number
    pointsRace8: number
    pointsRace9: number
    pointsRace10: number
    totalPoints: number
    participaciones: number
    position: number
}

function convertPdfDataToTable(data: pdfUtils.IPDFDataModel): ICircuitPoints[] {
    let rows: ICircuitPoints[] = []

    data.pageTables.forEach((pageTable: any) => {

        pageTable.tables.forEach((row:any, index:number, _array:any) => {
            if (row[0] === "") {
                return
            }

            if (pageTable.page == 1 && (index == 0 || index == 1)) {
                return
            }

            const newRow:ICircuitPoints = {
                dorsal: row[0],
                fullName: row[1],
                pointsRace1: row[2],
                pointsRace2: row[3],
                pointsRace3: row[4],
                pointsRace4: row[5],
                pointsRace5: row[6],
                pointsRace6: row[7],
                pointsRace7: row[8],
                pointsRace8: row[9],
                pointsRace9: row[10],
                pointsRace10: row[11],
                totalPoints: row[12],
                participaciones: row[13],
                position: row[14]
            }

            rows.push(newRow)
        });
    });

    return rows
}

