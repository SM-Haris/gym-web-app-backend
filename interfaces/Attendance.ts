export interface AttendanceDatabaseInterface {
  date: string
  member_id: string
  workout_hours: number
  gym_id: string
}

export interface FetchMemberAttendanceInterface {
  member_id: string
  to_date: string
  from_date: string
}

export interface AttendanceCountQuery {
  count: number
  date: string
}
