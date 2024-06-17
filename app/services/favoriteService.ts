import ClubDisplayModel from "../models/ClubDisplayModel";
import ClubModel from "../models/ClubModel";
import UserModel from "../models/UserModel";
import { utils } from "./utils";
import * as dbService from "../services/dbService"

const LEAGUES_PAGES: number = 4
const CLUBS_PAGES: number = 38



export async function getClubs(clubIdentifiers: number[] | undefined): Promise<ClubDisplayModel[]> {
    let clubs: ClubDisplayModel[] = []

    for (let index = 0; index < clubIdentifiers!.length; index++) {
        const element = clubIdentifiers![index];

        const clubInfo: ClubModel = await utils.getClub(element)

        let club: ClubDisplayModel = {
            ...clubInfo,
            image_url: await utils.getClubImage(element)
        }

        clubs.push(club)
    }

    return clubs
}

// TODO
// NOG UITWERKEN
export async function getLeagueClubs(leagueId: number | undefined): Promise<ClubDisplayModel[]> {
    let clubPool: ClubModel[]
    let clubs: ClubDisplayModel[] = []

    if (leagueId) {
        for (let index = 1; index <= CLUBS_PAGES; index++) {
            clubPool = await utils.getClubs(index)

            for (let index = 0; index < clubPool.length; index++) {
                const club = clubPool[index];
                if (club.league === leagueId) {
                    let leagueClub: ClubDisplayModel = {
                        ...club,
                        image_url: await utils.getClubImage(club.id)
                    }
                    clubs.push(leagueClub)
                }
            }
        }
    } else {
        clubs = []
    }



    return clubs
}



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

