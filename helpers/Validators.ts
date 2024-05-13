import IcmMessage from '../constants/IcmMessage'
import OwMessage from '../constants/OwMessage'

class Validators {
  static isValidStr(str: string | undefined) {
    if (!str) {
      return false
    }

    return str && typeof str === 'string' && str.trim() && str !== ''
  }

  static validateCode(code: number, defaultCode: number) {
    if (code >= 400 && code < 500) {
      return code
    }

    return defaultCode
  }

  static isValidateEmail(email: string | undefined) {
    const re =
      /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/im

    return re.test(String(email).toLowerCase())
  }

  static isValidActivityCode(
    code: string
  ): code is keyof typeof IcmMessage.SETTLEMENT_CODES {
    return code in IcmMessage.SETTLEMENT_CODES
  }

  static isValidActivitySuffix(
    code: string,
    activityCode: keyof typeof IcmMessage.SETTLEMENT_CODES
  ): code is keyof (typeof IcmMessage.SETTLEMENT_CODES)[typeof activityCode] {
    return code in IcmMessage.SETTLEMENT_CODES[activityCode]
  }

  static isValidSwiftMessage(
    messageType: string
  ): messageType is keyof typeof OwMessage.SWIFT_MESSAGES_REGEX {
    return messageType in OwMessage.SWIFT_MESSAGES_REGEX
  }
}

export default Validators
