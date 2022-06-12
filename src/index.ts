import express, { Request, Response } from 'express';

import mongoose from'mongoose'
import * as dotenv from "dotenv";

import racesRoute from './routes/races'
import runnersRoute from './routes/runners'
import seasonRoute from './routes/season'
import leaguesRoute from './routes/league'
import bibNumberRoute from './routes/bibNumbers'
import circuitPointsRoute from './routes/circuitPoints'

dotenv.config()

const app = express()

app.use(express.json())

app.get('/ping', (_req: Request, res: Response) => {
    console.log('Date: ' + new Date().toLocaleDateString())

    res.send('Pong!')
})

app.use('/api/races', racesRoute)
app.use('/api/runners', runnersRoute)
app.use('/api/seasons', seasonRoute)
app.use('/api/leagues', leaguesRoute)
app.use('/api/bibNumbers', bibNumberRoute)
app.use('/api/circuitPoints', circuitPointsRoute)


app.use(logErrors)
app.use(errorHandler)

function logErrors(err: any, _req: any, _res: any, next: any) {
    console.error("logErrors");
    console.error(err.stack);

    next(err);
}

function errorHandler(err: any, _req: any, res: any, _next: any) {
    console.error("errorHandler");

    res.status(500).send({ error: err });
}

const appPort = process.env.APP_PORT;

app.listen(appPort, () => {
    console.log(`Server running in port: ${appPort}`)
})

const dbHost = process.env.DB_HOST
const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}`

mongoose.connect(uri, (err) => {
    if (err){
        console.log(err)    
    } else {
        console.log('Connected to database')
    }
})
