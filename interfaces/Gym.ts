export interface GymPostRequestBody {
    name: string,
    location: string,
}

export interface GymPatchRequestBody {
    name?: string,
    location?: string,
}

export interface GymDatabaseInterface extends GymPatchRequestBody{
    owner_id: string
    gym_id?: string
}