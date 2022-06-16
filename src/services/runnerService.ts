import { Irunner }  from '../models/runnerModel'
import { RunnerRepository } from '../repository/mongoose/RunnerRepository'

const runnerRepository = new RunnerRepository()

export async function getAll(): Promise<Irunner[]> {

	const runners = await runnerRepository.getAll()

	return runners
}

export async function getById(id: string): Promise<Irunner> {
	
	const runner = await runnerRepository.getById(id)

	return runner
}

export async function save(runner: Irunner): Promise<Irunner> {

	const newRunner = await runnerRepository.add(runner)

	return newRunner
}

export async function update(runner: Irunner): Promise<Irunner> {
	const runnerUpdated = await runnerRepository.update(runner)
	return runnerUpdated
}

export async function remove(id: string): Promise<boolean> {
	const removed = await runnerRepository.remove(id)
	return removed
}