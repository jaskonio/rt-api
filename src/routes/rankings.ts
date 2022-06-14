import express from 'express'
import * as RankingControllers  from '../controllers/rankingsControllers'

const router = express.Router()

router.get('/', RankingControllers.get)

router.get('/:id', RankingControllers.getById)

router.delete('/:id', RankingControllers.remove)

export default router