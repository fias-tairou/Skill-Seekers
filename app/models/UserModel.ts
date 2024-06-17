import { ObjectId } from "mongodb"

export default interface UserModel {
    _id?: ObjectId | string,
    email: string,
    password?: string
    favoriteTeams: number[],
    favoriteLeague: number | undefined
    blacklistedTeams: number[],
    BlacklistedLeagues: number[],
    currentHighscore: number
}