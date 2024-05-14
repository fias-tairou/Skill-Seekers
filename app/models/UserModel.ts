export default interface QuizQuestionModel {
    _id: string,
    username: string,
    email: string,
    name: string[],
    favoriteTeams: string[],
    favoriteLeague: string[],
    blacklistedTeams: string[],
    BlacklistedLeagues: string[],
    currentHighscore: number
}