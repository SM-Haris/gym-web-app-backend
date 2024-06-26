import { config, jwt } from '.'
import { User } from '../interfaces/Auth'

class Token {
  static getLoginToken(user: User) {
    let loginToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      config.secretKey,
      {
        expiresIn: config.timeouts.login,
      }
    )

    return loginToken
  }

  static getRefreshToken(user: User) {
    let refresh_token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      config.secretKey,
      {
        expiresIn: config.timeouts.refresh_token,
      }
    )

    return refresh_token
  }

  static verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, config.secretKey)

      return decoded || false
    } catch (err) {
      console.log(
        `verifyToken:: Could not verify the token. token:: ${token} secretKey:: ${config.secretKey}`,
        err
      )

      return false
    }
  }
}

export default Token
