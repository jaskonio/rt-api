import mongoose from 'mongoose'

export interface Irunner {
	id: string
    name: string
    last_name: string
    photo: string
}

interface runnerModelinterface extends mongoose.Model<runnerDoc> {
    build(attr: Irunner): runnerDoc
}

export interface runnerDoc extends mongoose.Document {
    name: string
    last_name: string
    photo: string
}

const runnerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	photo: {
		type: String,
		required: false
	}
})

runnerSchema.statics.build = (attr: Irunner) => {
	return new Runner(attr)
}

runnerSchema.set('toJSON', {
	transform: (_document, returnObject) => {
		returnObject.id = returnObject._id
		delete returnObject._id
		delete returnObject.__v
	}
})

const Runner = mongoose.model<runnerDoc, runnerModelinterface>('Runner', runnerSchema)

export { Runner }
