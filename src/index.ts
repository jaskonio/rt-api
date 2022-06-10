import express, { Request, Response } from 'express';

import racesRoute from './routes/races'

import mongoose from'mongoose'

const app = express()

app.use(express.json())

const PORT = 3000;

app.get('/ping', (_req: Request, res: Response) => {
    console.log('Date: ' + new Date().toLocaleDateString())

    res.send('Pong!')
})

app.use('/api/races', racesRoute)


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


app.listen(PORT, () => {
    console.log(`Server running in port: ${PORT}`)
})

const uri = "mongodb+srv://jaskonio:jASKONIO.1994@cluster0.9fbetb1.mongodb.net/test-jaskonio"

mongoose.connect(uri, (err) => {
    if (err){
        console.log(err)    
    } else {
        console.log('Connected to database')
    }
})
