import { Irunner, Runner } from '../../models/runnerModel'
import { IRepository } from './IRepository'

export class RunnerRepository implements IRepository<Irunner> {

	async add(item: Irunner): Promise<Irunner> {		
		const newRunnerDoc = Runner.build(item as Irunner)
		return await newRunnerDoc.save().then(runner => runner as Irunner)
	}

	async update(item: Irunner): Promise<Irunner> {
		// const runnerDoc = Runner.build(item as Irunner)

		const currentRunnerDoc = await Runner.findById({_id: item.id})

		if (!currentRunnerDoc) {
			throw new Error('Runner not found')
		}
		const { name, last_name, photo } = item
		return await currentRunnerDoc.update({ name, last_name, photo }).then(runner => runner as Irunner)
	}

	async remove(id: string): Promise<boolean> {
		return await Runner.remove({ _id: id })
	}
	
	async getAll(): Promise<Irunner[]> {
		return await Runner.find({}).then(runners => runners as Irunner[])
	}

	async getById(id: string): Promise<Irunner> {
		return await Runner.findById({ _id: id }).then(runner => runner as Irunner)
	}
}