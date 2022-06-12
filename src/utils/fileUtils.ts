import { promises as fsPromises } from 'fs';

export async function asyncWriteFile(fullFilename: string, data: any) {
    try {
      await fsPromises.writeFile(fullFilename, data, {flag: 'w'})
    } catch (err) {      
      throw err
    }
}