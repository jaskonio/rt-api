export interface IResponseSportmaniacs {
    data: ISportmaniacsData
}

export interface ISportmaniacsData {
    Averages: any
    Categories: any
    Event: any
    Race: any
    Rankings: IRankingsSportmaniacs[]
    Splits: any
    Summary: any
    cached: boolean
    created: number
}

export interface IRankingsSportmaniacs {
    Points: {
        average: string
        averageNet: string
        catOffset: number
        catPos: string
        genOffset: number
        genPos: string
        legTime: string
        officialTime: string
        offset: number
        pos: string
        realPos: string
        realTime: string
        split_id: string
        videoRepeat: string
    }
    average: string
    averageNet: string
    catPos: string
    category: string
    category_id: string
    club: string
    comments: string
    defaultImage: boolean
    dorsal: string
    externalDiploma: boolean
    externalPhotos: boolean
    externalVideos: boolean
    finishedRace: boolean
    genPos: string
    gender: string
    name: string
    nationality: string
    officialTime: string
    photos: {
        sm: string
    }
    pos: string
    realCatPos: string
    realGenPos: string
    realPos: string
    realTime: string
    user_id: 0
}