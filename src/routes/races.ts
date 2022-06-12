import express from "express"
import * as RaceController from "../controllers/raceController"

const router = express.Router()

router.get('/', RaceController.get)

router.get('/:id', RaceController.getById)

router.post('/', RaceController.post)

router.put('/:id', RaceController.put)

router.delete('/:id', RaceController.remove)

router.post('/process/:id', RaceController.processById)

export default router