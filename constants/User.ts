const User = Object.freeze({
  MESSAGES: {
    FETCH_FAILURE: 'Something went wrong user could not fetched',
    CREATE_FAILURE: 'Something went wrong user could not be created',
    INCOMPLETE_POST_REQUEST:
      'Incomplete data provided in users creation request',
    INVALID_POST_REQUEST: 'Invalid data provided in users creation request',
    CONFIRM_USER_FAILED:
      'Something went wrong while confirming the user. Please try again.',
    CHECK_EMAIL_AVAILABILITY_FAILED:
      'Something went wrong while checking if the email already exist. Please try again.',
    INVALID_DATA_TO_CONFIRM_USER: 'Invalid data to confirm user',
    INVALID_DATA_TO_REFRESH_TOKEN: 'Invalid data to refresh token',
    INVALID_DATA_TO_VERIFY_EMAIL: 'Invalid data to verify email',
    INVALID_EMAIL: 'Invalid email provided',
    INVALID_REFRESH_TOKEN: 'Invalid refresh token provided',
    INVALID_PASSWORD: 'Invalid password provided',
    INVALID_PHONE_NUMBER: 'Invalid phone number provided',
    PASSWORD_DOES_NOT_MATCH: 'Invalid email or password',
    USER_NOT_FOUND: 'User not found',
    EMAIL_ALREADY_AVAILABLE: 'User with this email already available',
    USER_ALREADY_REGISTERED: 'User with this email already registered',
    EMAIL_IS_ALREADY_REGISTERED: 'You are already registered',
    LOGIN_FAILED: 'Something went wrong while login user. Please try again.',
    INVALID_AUTHENTICATION_TOKEN: 'Invalid or expired token',
    SIGN_UP_FAILED: 'Something went wrong while sign up. Please try again.',
    INVALID_DATA_TO_LOGIN: 'Invalid data to login',
    REFRESH_TOKEN_FAILED:
      'Something went wrong while refreshing token. Please try again.',
    VERIFY_EMAIL_FAILED:
      'Something went wrong while verifying email. Please try again.',
    RESET_PASSWORD_FAILED:
      'Something went wrong while reset password. Please try again.',
    INVALID_DATA_TO_CHECK_EMAIL_AVAILABILITY:
      'Invalid data to check if email exist',
    INVALID_CONFIRMATION_TOKEN: 'Invalid confirmation token provided.',
    INVALID_ACCESS_TOKEN: 'Invalid access token provided.',
    CONFIRMATION_TOKEN_HAS_EXPIRED: 'Confirmation token has expired',
    REFRESH_TOKEN_HAS_EXPIRED: 'Refresh token has expired',
    USER_ALREADY_SIGNED_UP: 'User is already signed up',
    USER_HAS_NOT_COMPLETED_SIGN_UP_PROCESS:
      'User has not completed sign up process',
    SIGN_OUT_FAILED: 'Something went wrong while sign out. Please try again.',
    INVALID_DATA_TO_SIGN_OUT_USER: 'Invalid data to sign out user',
    INVALID_FIRST_NAME: 'Invalid first name',
    INVALID_COMPANY_NAME: 'Invalid company name',
    INVALID_COMPANY_ADDRESS: 'Invalid company address',
    INVALID_LAST_NAME: 'Invalid last name',
    INVALID_MOBILE_NUMBER: 'Invalid mobile number',
    HOSPITAL_INFO_NOT_ADDED: 'Hospital info is not added',
    INVALID_USER_TITLE: 'Invalid user title',
    INVALID_DATA_TO_ADD_PERSONAL_INFO:
      'Invalid data to add personal info of user',
    PERSONAL_INFO_ALREADY_ADDED: 'Personal info of user already been added.',
    INVALID_USER_ROLE_TO_ADD_PERSONAL_INFO:
      'Invalid user role to add personal info.',
    EMAIL_ALREADY_TAKEN: 'Email already taken',
    INVALID_DATA_TO_ADD_ACCOUNTANT: 'Invalid data to add accountant',
    ADDING_PERSONAL_INFO_FAILED:
      'Something went wrong while adding personal info of user data. Please try again.',
    FETCHING_USER_FAILED:
      'Something went wrong while fetching the user data. Please try again.',
    FETCHING_USER_DATA_FAILED:
      'Something went wrong while fetching user data. Please try again.',
    UPDATING_USER_DATA_FAILED:
      'Something went wrong while updating user data. Please try again.',
    SIGNUP_REQUEST_ALREADY_RECEIVED:
      'User has already requested for sign up. Please verify your email.',
    USER_ALREADY_EXIST: 'User already exist',
    EMAIL_ALREADY_EXIST: 'Email already exist',
    ACCOUNT_ALREADY_EXIST: 'Account already exist',
    INVALID_DATA_TO_SIGNUP_USER: 'Invalid data to sign up user',
    INVALID_DATA_TO_UPDATE_USER: 'Invalid data to update user profile',
    UPDATE_USER_FAILED: 'Something went wrong user could not be Updated',
    USER_DOES_NOT_EXIST: 'User does not exist',
    FIRST_NAME_IS_REQUIRED: 'First name is required',
    INAVALID_MIDDLE_NAME: 'Invalid middle name',
    INAVALID_SSN_OR_TIN: 'Invalid ssn or tin',
    LAST_NAME_IS_REQUIRED: 'Last name is required',
    SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.',
    INVALID_DATA_TO_RECOVER_PASSWORD: 'Invalid data to recover password',
    INVALID_DATA_TO_RESET_PASSWORD: 'Invalid data to reset password',
    INVALID_TOKEN: 'Invalid token',
    TOKEN_IS_INVALID_OR_EXPIRED: 'Token is invalid or expired',
    INVALID_DATA_TO_CONFIRM_EMAIL: 'Invalid data to confirm email',
    UPDATE_USER_NOT_FOUND: 'Invalid User Id, User does not exist',
    INVALID_USER_ID: 'Invalid User Id',
    YOU_HAVE_INSUFFICIENT_PERMISSION_TO_PERFORM_THIS_ACTION:
      'You have insufficient permission to perform this action',
    USER_STATE_IS_NOT_VALID_TO_PERFORM_THIS_ACTION:
      'User state is not valid to perform this action',
    USER_DETAIL_FETCH_FAILURE:
      'Something went wrong User details could not be fetched',
    USER_VALIDATION_FAILURE:
      'Something went wrong user details could not be validated',
    DELETE_FAILURE: 'Something went wrong user could not be deleted',
  },
})

export default User
