import express from 'express'

import racesRoute from '../routes/races'
import runnersRoute from '../routes/runners'
import seasonRoute from '../routes/season'
import leaguesRoute from '../routes/league'
import bibNumberRoute from '../routes/bibNumbers'
import circuitPointsRoute from '../routes/circuitPoints'
import rankingRoute from '../routes/rankings'

const router = express.Router()

router.use('/races', racesRoute)
router.use('/runners', runnersRoute)
router.use('/seasons', seasonRoute)
router.use('/leagues', leaguesRoute)
router.use('/bibNumbers', bibNumberRoute)
router.use('/circuitPoints', circuitPointsRoute)
router.use('/rankings', rankingRoute)

export default router