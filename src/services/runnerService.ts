import { Runner, RunnerModel } from '../models/runnerModel'

export async function getAll(): Promise<Runner[]> {
	const runners = await RunnerModel.find({})

	return runners
}

export async function getById(id: string): Promise<Runner | null> {
	const runner = await RunnerModel.findById(id)

	return runner
}

export async function save(runner: Runner): Promise<Runner> {
	const newRunner = await new RunnerModel(runner)

	await newRunner.save()

	return newRunner
}

export async function update(id: string, runner: Runner): Promise<Runner | null> {
	const newRunner = await RunnerModel.findById(id)

	if (newRunner == null) {
		return null
	}
	
	await newRunner.update(runner)

	await newRunner.save()

	return newRunner
}

export async function remove(id: string): Promise<void> {
	await RunnerModel.remove(id)
}