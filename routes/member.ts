import express from 'express'
import MemberController from '../app/member/MemberController'
import { Authentication } from '../middleware'

const PREFIX = '/member'
const router = express.Router()

router.get(
  `${PREFIX}/:gym_id`,
  Authentication.authenticate,
  MemberController.getMember
)
router.post(
  `${PREFIX}/:gym_id`,
  Authentication.authenticate,
  MemberController.addMember
)
router.patch(
  `${PREFIX}/:member_id`,
  Authentication.authenticate,
  MemberController.updateMember
)

export default router
