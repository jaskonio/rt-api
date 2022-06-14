import { promises as fsPromises } from 'fs'

export async function asyncWriteFile(fullFilename: string, data: any) {
	await fsPromises.writeFile(fullFilename, data, {flag: 'w'})
}