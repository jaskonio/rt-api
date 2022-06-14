import mongoose from 'mongoose'

export interface Iseason {
    name: string
}

interface seasonModelinterface extends mongoose.Model<seasonDoc> {
    build(attr: Iseason): seasonDoc
}

export interface seasonDoc extends mongoose.Document {
    name: string
}

const seasonSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	}
})

seasonSchema.statics.build = (attr: Iseason) => {
	return new Season(attr)
}

const Season = mongoose.model<seasonDoc, seasonModelinterface>('Season', seasonSchema)

export { Season }