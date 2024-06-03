import { ErrorCodes, GymConstants } from '../constants'
import GymHandler from '../handlers/GymHandler'
import { Exception, Validators } from '../helpers'
import {
  GymDatabaseInterface,
  GymPatchRequestBody,
  GymPostRequestBody,
} from '../interfaces/Gym'

class GymUtil {
  static validateGymCreationRequest(
    data: GymPostRequestBody,
    owner_id: string
  ) {
    if (!data.name || !data.location) {
      throw new Exception(
        GymConstants.MESSAGES.INVALID_DATA,
        ErrorCodes.BAD_REQUEST,
        true
      )
    }

    return {
      name: data.name,
      location: data.location,
      owner_id,
    } as GymDatabaseInterface
  }

  static validateGymUpdationRequest(
    data: GymPatchRequestBody,
    owner_id: string,
    gym_id: string
  ) {
    if (!gym_id || !owner_id || !Validators.isValidStr(gym_id)) {
      throw new Exception(
        GymConstants.MESSAGES.INVALID_DATA,
        ErrorCodes.BAD_REQUEST,
        true
      )
    }

    return {
      name: data.name,
      location: data.location,
      owner_id,
      gym_id,
    }
  }

  static async validateGymExists(gym_id: string) {
    try {
        const gym = await GymHandler.findGymById(gym_id)

        if (!gym_id) {
          throw new Exception(
            GymConstants.MESSAGES.INVALID_GYM_ID,
            ErrorCodes.BAD_REQUEST,
            true
          )
        }
    
        return gym            
    } catch (error) {
        const customError = error as Exception
        throw customError
    }
  }
}

export default GymUtil
