import { SignUpRequestBody } from '../interfaces/Auth'
import User from '../models/User'

class UserHandler {
  static async getAllUsers() {
    return User.findAll()
  }

  static async getUser(user_id: string) {
    return User.findOne({ where: { id: user_id } })
  }

  static async createUser(data: SignUpRequestBody){
    return User.create(data)
  }

  static findUserByEmail(email: string | undefined): Promise<any> {
    return User.findOne({where:{ email: email }})
  }

  static setAccessToken(userId: string, accessToken: string, refreshToken: string) {

    return User.update({accessToken, refreshToken},{where:{
      id: userId
    }})
  }

  static getAuthenticateUser(userId: string, email = " ", authToken: string): Promise<any> {
    return User.findOne({where:{
      email,
      id: userId,
      accessToken: authToken,
    }})
  }

  static setUserPassword(userId: string, password: string) {

    return User.update({ password: password },{where:{ id: userId }})
  }

}

export default UserHandler
