import { NewRacesEntry, RaceEntry } from '../common/types/types'
import racesData from './races'


const races: RaceEntry[] = racesData

export const getRaces = (): RaceEntry[] => races

export const findByRaces = (race_id: number): RaceEntry | undefined => {
    const race = races.find( race => race._id === race_id)
    return race
}

export const addRace = (newRaceEntry: NewRacesEntry): RaceEntry => {
    const newRace: RaceEntry = {
        _id: Math.max(...races.map(race => race._id)) +1,
        ... newRaceEntry
    }

    races.push(newRace)

    return newRace
}

export const updateRace = () => null
