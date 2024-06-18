import { ObjectId } from "mongodb"

export interface BlacklistedItem {
    id: number
    reason?: string,
}

export interface UserInformation {
    id?: ObjectId
    userId: ObjectId
    favoriteTeams?: number[]
    favoriteLeague?: number | undefined
    blacklist?: BlacklistedItem[]
    currentHighscore?: number
}
