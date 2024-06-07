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

  static isValidPassword(password: string) {
    const re = /^[a-zA-Z0-9]{8,15}$/

    return re.test(password)
  }

  static isValidDate(date: string) {
    const re = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

    console.log(date)
    return re.test(date)
  }
}

export default Validators
