import express from 'express'
import UserController from '../app/user/UserController'
import { Authentication } from '../middleware'

const PREFIX = '/user'
const router = express.Router()

router.get(`${PREFIX}/me`, Authentication.authenticate, UserController.getUser)
router.post(`${PREFIX}`, UserController.createUser)
router.delete(
  `${PREFIX}`,
  Authentication.authenticate,
  UserController.deleteUser
)
router.patch(
  `${PREFIX}`,
  Authentication.authenticate,
  UserController.updateUser
)

export default router
