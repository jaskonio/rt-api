import mongoose, { Schema } from 'mongoose'

export function createModelForName(name: string): mongoose.Model<any, any, any, any> {    
	const schema = new Schema({}, { strict: false })
	return mongoose.model(name, schema)
}