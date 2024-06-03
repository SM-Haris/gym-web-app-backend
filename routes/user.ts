import express from 'express'
import UserController from '../app/user/UserController'

const PREFIX = '/user'
const router = express.Router()

router.get(`${PREFIX}/:user_id`, UserController.getUser)
router.post(`${PREFIX}`, UserController.createUser)

export default router
