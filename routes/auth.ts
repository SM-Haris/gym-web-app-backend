import express from 'express'
import AuthController from '../app/auth/AuthController'
import { Authentication } from '../middleware'
import { UserRequest } from '../interfaces/Auth'
const PREFIX = '/auth'
const router = express.Router()

router.post(`${PREFIX}/login`, AuthController.login)
router.post(`${PREFIX}/signup`, AuthController.signup)
router.get(
  `${PREFIX}/profile`,
  Authentication.authenticate,
  AuthController.getUserDetails
)
router.post(`${PREFIX}/validate`, AuthController.validateUser)

export default router
