import express from "express"
import * as LeagueController  from '../controllers/leagueController'

const router = express.Router()

router.get('/', LeagueController.get)

router.get('/:id', LeagueController.getById)

router.post('/', LeagueController.post)

router.put('/:id', LeagueController.put)

router.delete('/:id', LeagueController.remove)

export default router