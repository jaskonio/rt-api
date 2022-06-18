import { getModelForClass, prop } from '@typegoose/typegoose'

export class Season{
	@prop({ required: true })
	public name: string
}

const SeasonModel = getModelForClass(Season)

export { SeasonModel }
