import { ErrorCodes, MemberConstants } from '../constants'
import MemberHandler from '../handlers/MemberHandler'
import { Exception, Validators } from '../helpers'
import {
  MemberPatchRequestBody,
  MemberPostRequestBody,
} from '../interfaces/Member'

class MemberUtil {
  static validateMemberFetchRequest(gym_id: string) {
    if (!gym_id) {
      throw new Exception(
        MemberConstants.MESSAGES.INVALID_FETCH_DATA,
        ErrorCodes.BAD_REQUEST,
        true
      )
    }

    return
  }

  static validateMemberCreationRequest(
    data: MemberPostRequestBody,
    gym_id: string
  ) {
    if (
      !data.name ||
      !data.email ||
      !data.phone_number ||
      !gym_id ||
      !Validators.isValidStr(data.name) ||
      !Validators.isValidateEmail(data.email) ||
      !Validators.isValidStr(data.phone_number)
    ) {
      throw new Exception(
        MemberConstants.MESSAGES.INVALID_POST_DATA,
        ErrorCodes.BAD_REQUEST,
        true
      )
    }

    return {
      ...data,
      gym_id,
    }
  }

  static validateMemberUpdationRequest(
    data: MemberPatchRequestBody,
    member_id: string
  ) {
    if (!member_id || !Validators.isValidStr(member_id)) {
      throw new Exception(
        MemberConstants.MESSAGES.INVALID_PATCH_DATA,
        ErrorCodes.BAD_REQUEST,
        true
      )
    }

    return {
      ...data,
      id: member_id,
    }
  }

  static async validateMemberExists(member_id: string) {
    try {
        const member = await MemberHandler.findMemberById(member_id)

        if (!member) {
          throw new Exception(
            MemberConstants.MESSAGES.INVALID_MEMBER_ID,
            ErrorCodes.BAD_REQUEST,
            true
          )
        }
    
        return member            
    } catch (error) {
        const customError = error as Exception
        throw customError
    }
  }
}

export default MemberUtil
