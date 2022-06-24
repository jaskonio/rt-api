import express, { NextFunction, Request, Response } from 'express'
import api from './routes/api'

const app = express()

app.use(express.json())

app.use('/api', api)

app.use(logErrors)
app.use(errorHandler)

function logErrors(err: Error , _req: Request, _res: Response, next: NextFunction) {
	console.error('logErrors')
	console.error(err.stack)

	next(err)
}

function errorHandler(err: Error , _req: Request, res: Response, _next: NextFunction) {
	console.error('errorHandler')

	res.status(500).send({ error: err })
}

export default app