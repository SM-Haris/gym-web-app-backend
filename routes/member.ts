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
router.get(
  `${PREFIX}/stats/:gym_id/from/:from_date/to/:to_date`,
  Authentication.authenticate,
  MemberController.getMemberStats
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
router.delete(
  `${PREFIX}/:member_id`,
  Authentication.authenticate,
  MemberController.deleteMember
)

export default router
