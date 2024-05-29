export default interface UserModel {
    _id: string,
    username: string,
    email: string,
    favoriteTeams: number[],
    favoriteLeague: number | undefined
    blacklistedTeams: number[],
    BlacklistedLeagues: number[],
    currentHighscore: number
}