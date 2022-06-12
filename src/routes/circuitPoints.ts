import express from "express"
import * as CircuitPointController from '../controllers/circuitPointController'

const router = express.Router()

router.get('/', CircuitPointController.get)

router.get('/:id', CircuitPointController.getById)

router.post('/', CircuitPointController.post)

router.put('/:id', CircuitPointController.put)

router.delete('/:id', CircuitPointController.remove)

router.post('/process/:id', CircuitPointController.processById)

export default router
