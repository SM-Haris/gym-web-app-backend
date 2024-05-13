import express from 'express'
import GymController from '../app/gym/GymController'

const PREFIX = '/gym'
const router = express.Router()

router.get(`${PREFIX}/`, GymController.getGym)

export default router
