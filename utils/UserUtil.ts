import UserConstants from '../constants/User'
import { bcrypt } from '../helpers'
import Exception from '../helpers/Exception'
import Validators from '../helpers/Validators'
import {
  SignUpRequestBody,
  User,
  UserUpdateRequestBody,
} from '../interfaces/Auth'

class UserUtil {
  static validateUserCreationRequest(data: SignUpRequestBody) {
    if (!data.name || !data.password || !data.email || !data.phone_number) {
      throw new Exception(
        UserConstants.MESSAGES.INCOMPLETE_POST_REQUEST,
        400,
        true
      )
    }

    if (
      !Validators.isValidStr(data.name) ||
      !Validators.isValidStr(data.password) ||
      !Validators.isValidStr(data.email) ||
      !Validators.isValidStr(data.phone_number)
    ) {
      throw new Exception(
        UserConstants.MESSAGES.INVALID_POST_REQUEST,
        400,
        true
      )
    }

    return data
  }

  static async validateUserUpdationRequest(
    userId: string,
    data: UserUpdateRequestBody
  ) {
    if (!userId || !Validators.isValidStr(userId) || !data) {
      throw new Exception(
        UserConstants.MESSAGES.INCOMPLETE_POST_REQUEST,
        400,
        true
      )
    }

    return {
      ...data,
      password: await bcrypt.hash(data.password as string, 10),
    }
  }

  static filterUser(data: any) {
    if (data.dataValues) {
      delete data.dataValues.password
      return data.dataValues
    }

    delete data.password
    return data
  }
}

export default UserUtil
