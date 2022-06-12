import express from "express"
import * as BibNumberController from '../controllers/bibNumberController'

const router = express.Router()

router.get('/', BibNumberController.get)

router.get('/:id', BibNumberController.getById)

router.post('/', BibNumberController.post)

router.put('/:id', BibNumberController.put)

router.delete('/:id', BibNumberController.remove)

export default router