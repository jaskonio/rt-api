import mongoose from "mongoose"

export interface ILeague {
    name: string
    bibNumberIds: [string]
}

interface leagueModelinterface extends mongoose.Model<LeagueDoc> {
    build(attr: ILeague): LeagueDoc
}

export interface LeagueDoc extends mongoose.Document {
    name: string
    bibNumberIds: [string]
}

const leagueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bibNumberIds: {
        type: [String],
        required: false
    }
})

leagueSchema.statics.build = (attr: ILeague) => {
    return new League(attr)
}

const League = mongoose.model<LeagueDoc, leagueModelinterface>('Leagues', leagueSchema)

export { League }