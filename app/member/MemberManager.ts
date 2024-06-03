import Exception from '../../helpers/Exception'

class MemberManager {
  static async getMember() {
    try {
      return 'Member Here'
    } catch (error) {
      const customError = error as Exception
      throw customError
    }
  }
}

export default MemberManager
