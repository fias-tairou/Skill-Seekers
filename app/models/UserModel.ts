export default interface UserModel {
    _id: string,
    username: string,
    email: string,
    favoriteTeams: string[] | number[],
    favoriteLeague: string | number,
    blacklistedTeams: string[] | number[],
    BlacklistedLeagues: string[] | number[],
    currentHighscore: number
}