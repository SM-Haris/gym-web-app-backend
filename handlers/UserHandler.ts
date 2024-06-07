import { SignUpRequestBody } from '../interfaces/Auth'
import User from '../models/User'

class UserHandler {
  static async getAllUsers() {
    return User.findAll()
  }

  static async getUser(user_id: string) {
    return User.findOne({ where: { id: user_id } })
  }

  static async createUser(data: SignUpRequestBody) {
    return User.create(data)
  }

  static findUserByEmail(email: string | undefined): Promise<any> {
    return User.findOne({ where: { email: email } })
  }

  static setAccessToken(
    userId: string,
    access_token: string,
    refresh_token: string
  ) {
    return User.update(
      { access_token, refresh_token },
      {
        where: {
          id: userId,
        },
      }
    )
  }

  static getAuthenticateUser(
    userId: string,
    email = ' ',
    authToken: string
  ): Promise<any> {
    return User.findOne({
      where: {
        email,
        id: userId,
        access_token: authToken,
      },
    })
  }

  static setUserPassword(userId: string, password: string) {
    return User.update({ password: password }, { where: { id: userId } })
  }
}

export default UserHandler
