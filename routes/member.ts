import express from 'express'
import MemberController from '../app/member/MemberController'

const PREFIX = '/member'
const router = express.Router()

router.get(`${PREFIX}/`, MemberController.getMember)

export default router
