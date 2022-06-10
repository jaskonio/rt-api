export interface RaceEntry {
    _id: number
    processed: boolean
    day_celebrate: string
    name: string
    url: string
    collection_name: string
}

export type NewRacesEntry = Omit<RaceEntry, '_id'>