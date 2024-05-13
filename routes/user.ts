import express from 'express'
import UserController from '../app/user/UserController'

const PREFIX = '/user'
const router = express.Router()

router.get(`${PREFIX}/`, UserController.getUser)

export default router
