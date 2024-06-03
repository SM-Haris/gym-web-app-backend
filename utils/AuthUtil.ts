import { ErrorCodes, UserConstants } from '../constants'
import { Exception, Validators, bcrypt } from '../helpers'
import { LoginRequestBody, SignUpRequestBody, User } from '../interfaces/Auth'

class AuthUtil {
  static validateUser(user: User) {
    if (!user) {
      throw new Exception(
        UserConstants.MESSAGES.USER_DOES_NOT_EXIST,
        ErrorCodes.UNAUTHORIZED,
        true
      )
    }
  }

  static validateSignUpRequest(data: SignUpRequestBody) {
    if (!data || !data.email) {
      throw new Exception(
        UserConstants.MESSAGES.INVALID_DATA_TO_SIGNUP_USER,
        ErrorCodes.BAD_REQUEST,
        true
      )
    }

    if (data.email && !Validators.isValidateEmail(data.email)) {
      throw new Exception(
        UserConstants.MESSAGES.INVALID_EMAIL,
        ErrorCodes.BAD_REQUEST,
        true
      )
    }

    if (data.password && !Validators.isValidPassword(data.password)) {
      throw new Exception(
        UserConstants.MESSAGES.INVALID_PASSWORD,
        ErrorCodes.BAD_REQUEST,
        true
      )
    }

    if (!Validators.isValidStr(data.phone_number)) {
        throw new Exception(
          UserConstants.MESSAGES.INVALID_PHONE_NUMBER,
          ErrorCodes.BAD_REQUEST,
          true
        )
      }
  }

  static async hashPassword(data: SignUpRequestBody) {
    const hashedPassword = await bcrypt.hash(data.password, 10)

    return {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone_number: data.phone_number
    } as SignUpRequestBody
  }

  static validateUserForSignUp(user: User) {
    if (user) {
      throw new Exception(
        UserConstants.MESSAGES.USER_ALREADY_REGISTERED,
        ErrorCodes.BAD_REQUEST,
        true
      )
    }
  }

  static validatePasswordComparison(passwordMatched: boolean){
    if (!passwordMatched) {
        throw new Exception(
          UserConstants.MESSAGES.PASSWORD_DOES_NOT_MATCH,
          ErrorCodes.UNAUTHORIZED,
          true
        )
      }
  }

  static validateUserToAuthenticate(user: User | undefined) {
    if (!user) {
      throw new Exception(
        UserConstants.MESSAGES.USER_DOES_NOT_EXIST,
        ErrorCodes.BAD_REQUEST,
        true
      )
    }
  }

  static validateLoginRequest(data: LoginRequestBody) {
    if (!data || !data.email) {
      throw new Exception(
        UserConstants.MESSAGES.INVALID_DATA_TO_LOGIN,
        ErrorCodes.UNAUTHORIZED,
        true
      )
    }

    if (data.email && !Validators.isValidateEmail(data.email)) {
      throw new Exception(
        UserConstants.MESSAGES.INVALID_EMAIL,
        ErrorCodes.UNAUTHORIZED,
        true
      )
    }

    if (!Validators.isValidPassword(data.password)) {
      throw new Exception(
        UserConstants.MESSAGES.INVALID_PASSWORD,
        ErrorCodes.UNAUTHORIZED,
        true
      )
    }
  }
}

export default AuthUtil
