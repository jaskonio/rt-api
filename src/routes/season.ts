import express from "express"
import * as SeasonController from '../controllers/seasonController'

const router = express.Router()

router.get('/', SeasonController.get)

router.get('/:id', SeasonController.getById)

router.post('/', SeasonController.post)

router.put('/:id', SeasonController.put)

router.delete('/:id', SeasonController.remove)

export default router