import axios, { AxiosRequestConfig } from 'axios'
import Fs from 'fs'
import * as stream from 'stream'
import { promisify } from 'util'

export async function getData(url: string, options?: AxiosRequestConfig) {
	try {
		const { data, status }  = await axios.get(url, options)

		console.log('response status is: ', status)

		return data

	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log('error message: ', error.message)
			throw error.message
		} else {
			console.log('unexpected error: ', error)
			throw 'An unexpected error occurred'
		}
	}
}

const finished = promisify(stream.finished)

export async function downloadFile(url: string, outputLocationPath: string): Promise<void> {
	const writer = Fs.createWriteStream(outputLocationPath)

	return axios.get(url, {responseType: 'stream'}).then(response => {
		response.data.pipe(writer)
		return finished(writer)
	})
}
