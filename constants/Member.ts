const Member = Object.freeze({
  MESSAGES: {
    FETCH_FAILURE: 'Something went wrong member could not fetched',
    CREATION_FAILURE: 'Something went wrong while creating member',
    UPDATION_FAILURE: 'Something went wrong while updating member',
    INVALID_FETCH_DATA: 'Invalid data provided in members fetch request',
    INVALID_POST_DATA: 'Invalid data provided in during member creation',
    INVALID_PATCH_DATA: 'Invalid data provided in during member updation',
    INVALID_MEMBER_ID: 'Invalid member id provided',
    MEMBER_STATS_FAILURE:
      'Something went wrong member attendance stats could not be fetched',
    DELETE_FAILURE: 'Something went wrong member could not be deleted',
    INVALID_STAT_FETCH_REQUEST:
      'Invalid data provided for fetching member stats',
  },
})

export default Member
