import { Season } from './seasonModel'
import { getModelForClass, prop, Ref } from '@typegoose/typegoose'

export class Race{
	@prop({ required: false })
	public _id!: string

	@prop({ required: true })
	public name: string

	@prop({ required: true })
	public processed: boolean

	@prop({ required: true })
	public celebrateDay: string

	@prop({ required: true })
	public url: string

	@prop({ required: true, ref: () => Season })
	public seasonId: Ref<Season>
}

const RaceModel = getModelForClass(Race)

export { RaceModel }