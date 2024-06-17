import { ObjectId } from "mongodb"

export interface BlacklistedItem {
    id: number
    reason: string,
    type: "TEAM" | "LEAGUE"
}

export interface UserInfo {
    id?: ObjectId
    userId: ObjectId
    favoriteTeams: number[]
    favoriteLeague: number | undefined
    blacklist: BlacklistedItem[]
    currentHighscore: number
}
