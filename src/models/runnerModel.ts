import { getModelForClass, prop } from '@typegoose/typegoose'

export class Runner{
	@prop({ required: true })
	public name: string
	
	@prop({ required: true })
	public last_name: string

	@prop({ required: false })
	public photo: string
}

const RunnerModel = getModelForClass(Runner)

export { RunnerModel }