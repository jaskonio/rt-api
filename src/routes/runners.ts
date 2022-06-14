import express from 'express'
import * as RunnerController from '../controllers/runnerController'

const router = express.Router()

router.get('/', RunnerController.get)

router.get('/:id', RunnerController.getById)

router.post('/', RunnerController.post)

router.put('/:id', RunnerController.put)

router.delete('/:id', RunnerController.remove)

export default router