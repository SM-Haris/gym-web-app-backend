import User from '../constants/User'
import Exception from '../helpers/Exception'
import Validators from '../helpers/Validators'
import { SignUpRequestBody } from '../interfaces/Auth'

class UserUtil {
  static validateUserCreationRequest(data: SignUpRequestBody) {
    if (!data.name || !data.password || !data.email || !data.phone_number) {
      throw new Exception(User.MESSAGES.INCOMPLETE_POST_REQUEST,400,true)
    }

    if (
      !Validators.isValidStr(data.name) ||
      !Validators.isValidStr(data.password) ||
      !Validators.isValidStr(data.email) ||
      !Validators.isValidStr(data.phone_number)
    ) {
        throw new Exception(User.MESSAGES.INVALID_POST_REQUEST,400,true)
    }

    return data
  }
}

export default UserUtil