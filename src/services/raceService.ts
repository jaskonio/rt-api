import axios from 'axios'
import * as mongooseUtils from '../utils/mongoose'

export async function getRankingsDatabyRace(race_url: string) {
    let url: string = race_url;

    try {
        let { data, status }  = await axios.get(url)

        console.log('response status is: ', status);

        return data.data.Rankings

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
