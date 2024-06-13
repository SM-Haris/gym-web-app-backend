import express from 'express'
import GymController from '../app/gym/GymController'
import { Authentication } from '../middleware'

const PREFIX = '/gym'
const router = express.Router()

router.get(`${PREFIX}`, Authentication.authenticate, GymController.getGym)
router.get(`${PREFIX}/revenue/:gym_id/from/:from_date/to/:to_date`, Authentication.authenticate, GymController.getGymRevenue)
router.post(`${PREFIX}`, Authentication.authenticate, GymController.createGym)
router.patch(
  `${PREFIX}/:gym_id`,
  Authentication.authenticate,
  GymController.updateGym
)

export default router
