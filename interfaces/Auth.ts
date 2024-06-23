import { Request } from 'express'

export interface User {
  id?: string
  name: string
  email: string
  password?: string
  phone_number?: string
  access_token?: string
  created_at?: Date
  updated_at?: Date
  refresh_token?: string
}

export interface DecodedUser {
  id: string
  email: string
}
export interface SignUpRequestBody {
  name: string
  email: string
  password: string
  phone_number: string
}

export interface LoginRequestBody {
  email: string
  password: string
}

export interface UserRequest extends Request {
  user: User
}

export interface UserUpdateRequestBody {
  name?: string
  email?: string
  password?: string
  phone_number?: string
}
