import { Response, Request } from 'express'
import Exception from '../../helpers/Exception'
import Validators from '../../helpers/Validators'
import ErrorCodes from '../../constants/ErrorCodes'
import GymManager from './GymManager'
import Gym from '../../constants/Gym'
import { UserRequest } from '../../interfaces/Auth'

class GymController {
  static async getGym(req: Request, res: Response) {
    try {
      const status = await GymManager.getGym(req as UserRequest)

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
            : Gym.MESSAGES.FETCH_FAILURE,
        })
    }
  }

  static async createGym(req: Request, res: Response) {
    try {
      const status = await GymManager.createGym(req as UserRequest)

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
            : Gym.MESSAGES.CREATION_FAILURE,
        })
    }
  }

  static async updateGym(req: Request, res: Response) {
    try {
      const status = await GymManager.updateGym(req as UserRequest)

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
            : Gym.MESSAGES.UPDATION_FAILURE,
        })
    }
  }
}

export default GymController
