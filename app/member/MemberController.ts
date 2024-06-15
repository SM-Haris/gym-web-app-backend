import { Response, Request } from 'express'
import Exception from '../../helpers/Exception'
import Validators from '../../helpers/Validators'
import ErrorCodes from '../../constants/ErrorCodes'
import MemberManager from './MemberManager'
import Member from '../../constants/Member'
import { UserRequest } from '../../interfaces/Auth'

class MemberController {
  static async getMember(req: Request, res: Response) {
    try {
      const status = await MemberManager.getMember(req as UserRequest)

      res.json({
        success: true,
        data: status,
      })
    } catch (error) {
      const customError = error as Exception

      return res
        .status(
          Validators.validateCode(
            customError.code,
            ErrorCodes.INTERNAL_SERVER_ERROR
          ) || ErrorCodes.INTERNAL_SERVER_ERROR
        )
        .json({
          success: false,
          message: customError.reportError
            ? customError.message
            : Member.MESSAGES.FETCH_FAILURE,
        })
    }
  }

  static async getMemberStats(req: Request, res: Response) {
    try {
      const status = await MemberManager.getMemberStats(req as UserRequest)

      res.json({
        success: true,
        data: status,
      })
    } catch (error) {
      const customError = error as Exception

      return res
        .status(
          Validators.validateCode(
            customError.code,
            ErrorCodes.INTERNAL_SERVER_ERROR
          ) || ErrorCodes.INTERNAL_SERVER_ERROR
        )
        .json({
          success: false,
          message: customError.reportError
            ? customError.message
            : Member.MESSAGES.FETCH_FAILURE,
        })
    }
  }

  static async addMember(req: Request, res: Response) {
    try {
      const status = await MemberManager.addMember(req as UserRequest)

      res.json({
        success: true,
        data: status,
      })
    } catch (error) {
      const customError = error as Exception

      return res
        .status(
          Validators.validateCode(
            customError.code,
            ErrorCodes.INTERNAL_SERVER_ERROR
          ) || ErrorCodes.INTERNAL_SERVER_ERROR
        )
        .json({
          success: false,
          message: customError.reportError
            ? customError.message
            : Member.MESSAGES.CREATION_FAILURE,
        })
    }
  }

  static async updateMember(req: Request, res: Response) {
    try {
      const status = await MemberManager.updateMember(req as UserRequest)

      res.json({
        success: true,
        data: status,
      })
    } catch (error) {
      const customError = error as Exception

      return res
        .status(
          Validators.validateCode(
            customError.code,
            ErrorCodes.INTERNAL_SERVER_ERROR
          ) || ErrorCodes.INTERNAL_SERVER_ERROR
        )
        .json({
          success: false,
          message: customError.reportError
            ? customError.message
            : Member.MESSAGES.UPDATION_FAILURE,
        })
    }
  }

  static async deleteMember(req: Request, res: Response) {
    try {
      const status = await MemberManager.deleteMember(req as UserRequest)

      res.json({
        success: true,
        data: status,
      })
    } catch (error) {
      const customError = error as Exception

      return res
        .status(
          Validators.validateCode(
            customError.code,
            ErrorCodes.INTERNAL_SERVER_ERROR
          ) || ErrorCodes.INTERNAL_SERVER_ERROR
        )
        .json({
          success: false,
          message: customError.reportError
            ? customError.message
            : Member.MESSAGES.UPDATION_FAILURE,
        })
    }
  }
}

export default MemberController
