import { NewRacesEntry } from "./types/types";


export const toNewRaceEntry = (object: any): NewRacesEntry => {
    const newEntry: NewRacesEntry = {
        name: object.name,
        collection_name: object.collection_name,
        day_celebrate: object.day_celebrate,
        processed: object.processed,
        url: object.url
    }

    return newEntry
}

export default toNewRaceEntry