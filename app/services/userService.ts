import UserModel from "../models/UserModel";

export function addFavoriteTeam(teamId: number, user: UserModel) {

    if (user && user.favoriteTeams) {
        if (!user.favoriteTeams.includes(teamId)) {
            user.favoriteTeams.push(teamId)
            removeTeamFromBlacklist(teamId, user)
        }
    }
}

export function addFavoriteLeague(leagueId: number, user: UserModel) {
    if (user) {
        user.favoriteLeague = leagueId
        removeLeagueFromBlacklist(leagueId, user)
    }
}

export function addTeamToBlacklist(teamId: number, user: UserModel) {
    if (!user.blacklistedTeams.includes(teamId)) {
        user.blacklistedTeams.push(teamId)
        removeFavoriteTeam(teamId, user)
    }
}

export function addLeagueToBlacklist(leagueId: number, user: UserModel) {
    if (!user.BlacklistedLeagues.includes(leagueId)) {
        user.BlacklistedLeagues.push(leagueId)
        removeFavoriteLeague(leagueId, user)
    }
}


export function removeFavoriteTeam(teamId: number, user: UserModel) {
    user.favoriteTeams = user.favoriteTeams.filter((id) => {
        if (id != teamId) {
            return id
        }
    })
}

export function removeFavoriteLeague(leagueId: number, user: UserModel) {

    if (user.favoriteLeague === leagueId) {
        user.favoriteLeague = undefined
    }
}

export function removeTeamFromBlacklist(teamId: number, user: UserModel) {
    user.blacklistedTeams = user.blacklistedTeams.filter((id) => {
        if (id != teamId) {
            return id
        }
    })
}

export function removeLeagueFromBlacklist(leagueId: number, user: UserModel) {
    user.BlacklistedLeagues = user.BlacklistedLeagues.filter((id) => {
        if (id != leagueId) {
            return id
        }
    })
}