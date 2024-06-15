import { UserConstants } from '../../constants'
import UserHandler from '../../handlers/UserHandler'
import { Exception, Token, Validators, bcrypt } from '../../helpers'
import {
  LoginRequestBody,
  SignUpRequestBody,
  User,
  UserRequest,
} from '../../interfaces/Auth'
import AuthUtil from '../../utils/AuthUtil'

class AuthManager {
  static async signup(data: SignUpRequestBody) {
    AuthUtil.validateSignUpRequest(data)

    let user

    if (!Validators.isValidateEmail(data.email)) {
      throw new Exception(UserConstants.MESSAGES.INVALID_EMAIL, 400, true)
    }

    user = await UserHandler.findUserByEmail(data.email)

    AuthUtil.validateUserForSignUp(user)

    const updatedUserData = await AuthUtil.hashPassword(data)

    const createdUser: User = await UserHandler.createUser(updatedUserData)

    const { access_token, refresh_token } =
      await AuthManager.setAccessToken(createdUser)

    return {
      ...data,
      id: createdUser.id,
      password: createdUser.password,
      access_token,
      refresh_token,
    }
  }

  static async login(data: LoginRequestBody) {
    let user

    AuthUtil.validateLoginRequest(data)

    user = await UserHandler.findUserByEmail(data.email)

    AuthUtil.validateUserToAuthenticate(user)

    const passwordMatched = await bcrypt.compare(
      data.password || '',
      user.password
    )

    AuthUtil.validatePasswordComparison(passwordMatched)

    const { access_token, refresh_token } =
      await AuthManager.setAccessToken(user)

    delete user.dataValues.password

    return { ...user.dataValues, access_token, refresh_token }
  }

  static async setAccessToken(user: User) {
    if (!user.id) return user

    const access_token = Token.getLoginToken(user)

    const refresh_token = Token.getRefreshToken(user)

    await UserHandler.setAccessToken(user.id, access_token, refresh_token)

    return { ...user, access_token, refresh_token }
  }

  static async getUserDetails(email: string) {
    const user = await UserHandler.findUserByEmail(email)

    delete user.access_token
    delete user.refresh_token
    delete user.password

    return user
  }

  static async validateUser(req: UserRequest) {
    try {
      const user = await UserHandler.findUserByEmail(req.body.email)

      AuthUtil.validateUserForSignUp(user)

      return 'User data is valid'
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }
}

export default AuthManager
