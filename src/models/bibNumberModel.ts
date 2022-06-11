import mongoose from "mongoose"

export interface IBibNumber {
    bibNumner: number
    runnerId: string
    disqualifiedRaceIds: [string]
}

interface bibNumberModelinterface extends mongoose.Model<BibNumberDoc> {
    build(attr: IBibNumber): BibNumberDoc
}

export interface BibNumberDoc extends mongoose.Document {
    bibNumner: number
    runnerId: string
    disqualifiedRaceIds: [string]
}

const bibNumberSchema = new mongoose.Schema({
    bibNumner: {
        type: Number,
        required: true
    },
    runnerId: {
        type: String,
        required: true
    },
    disqualifiedRaceIds: {
        type: [String],
        required: false
    }
})

bibNumberSchema.statics.build = (attr: IBibNumber) => {
    return new BibNumber(attr)
}

const BibNumber = mongoose.model<BibNumberDoc, bibNumberModelinterface>('BibNumbers', bibNumberSchema)

export { BibNumber }