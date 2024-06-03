import { UserConstants } from '../../constants'
import UserHandler from '../../handlers/UserHandler'
import { Exception, Token, Validators, bcrypt } from '../../helpers'
import {
  LoginRequestBody,
  SignUpRequestBody,
  User,
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

    const { accessToken, refreshToken } =
      await AuthManager.setAccessToken(createdUser)

    return { ...data, id: createdUser.id, password: createdUser.password, accessToken, refreshToken }
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

    const { accessToken, refreshToken } = await AuthManager.setAccessToken(user)

    return { ...user.dataValues, accessToken, refreshToken }
  }

  static async setAccessToken(user: User) {
    if (!user.id) return user

    const accessToken = Token.getLoginToken(user)

    const refreshToken = Token.getRefreshToken(user)

    await UserHandler.setAccessToken(user.id, accessToken, refreshToken)

    return { ...user, accessToken, refreshToken }
  }

  static async getUserDetails(email: string) {
    const user = await UserHandler.findUserByEmail(email)

    delete user.accessToken
    delete user.refreshToken
    delete user.password

    return user
  }
}

export default AuthManager
