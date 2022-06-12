import axios from 'axios'
import * as mongooseUtils from '../utils/mongoose'
import { IRace, IRaceRanking, Race, RaceDoc }  from '../models/raceModel'
import { RaceRow } from '../models/raceRowModel'

export async function getAll() {
    const races = await Race.find({})

    return races
}

export async function getById(id: string) {
    const race = await Race.findById(id)

    return race
}

export async function save(document: IRace) {
    const newDocument = Race.build(document)

    await newDocument.save()

    return newDocument
}

export async function update(id: string, newDocument: IRace): Promise<(RaceDoc & {_id: any;}) | null> {
    const currentDocument = await getById(id)

    if (currentDocument === null) {
        throw { message: "no data exist for this id" }
    }

    await currentDocument.updateOne(newDocument)

    const updatedDocument = await getById(id)

    return updatedDocument
}

export async function remove(id: string) {
    await Race.deleteOne({id: id})
}

export async function getRankingsDatabyRace(race_url: string): Promise<IRaceRanking[]> {
    let url: string = race_url;

    try {
        let { data, status }  = await axios.get(url)
        
        console.log('response status is: ', status)

        const rankings = data.data.Rankings as IRaceRanking[]

        return rankings

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            throw error.message;
          } else {
            console.log('unexpected error: ', error);
            throw 'An unexpected error occurred';
          }
    }
}

export async function saveRankingsData(collection_name:string, data: any[]) {
    try {
        let rankingDoc = mongooseUtils.createModelForName(collection_name)

        await rankingDoc.insertMany(data)
    } catch (error: any) {
        console.log('unexpected error: ', error)
        throw 'An unexpected error occurred: '+ error?.message
    }
}

export async function saveRowData(race: RaceDoc) {
    try {
        const data = await getRankingsDatabyRace(race.url);

        const raceRowDocument = await RaceRow.findOne({ raceId: race.id})

        if (raceRowDocument == null) {
            const raceRowDocument = await RaceRow.build({raceId: race._id, data: data})
            await raceRowDocument.save()
        }
        else{
            raceRowDocument.updateOne({data: data})
        }

        return data
    } catch (error: any) {
        console.log('unexpected error: ', error)
        throw 'An unexpected error occurred: '+ error?.message
    }
}
export function getProcessedData(rows: IRaceRanking[]): IRaceRanking[] {
    const clubName = "REDOLAT TEAM"
    
    const filteredRows = rows.filter( function(row: IRaceRanking){
        return row.club.toLowerCase() == clubName.toLowerCase()
    });

    return filteredRows
}

