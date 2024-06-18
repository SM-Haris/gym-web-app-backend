export interface MemberPostRequestBody {
  name: string
  email: string
  phone_number: string
  fee: string
}

export interface MemberPatchRequestBody {
  name?: string
  email?: string
  phone_number?: string
}

export interface MemberDatabaseInterface extends MemberPatchRequestBody {
  gym_id?: string
  id?: string
}

export interface MemberStatFetchRequest {
  to_date: string
  from_date: string
  gym_id: string
}
