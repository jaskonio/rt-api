import mongoose, { Schema } from "mongoose"

export function createModelForName(name: string): mongoose.Model<any, {}, {}, {}> {    
    var Any = new Schema({}, { strict: false })
    return mongoose.model(name, Any)
}