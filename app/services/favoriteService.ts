import ClubDisplayModel from "../models/ClubDisplayModel";
import ClubModel from "../models/ClubModel";
import UserModel from "../models/UserModel";
import { utils } from "./utils";
import * as dbService from "../services/dbService"
import { ObjectId } from "mongodb";
import { BlacklistedItem, UserInformation } from "../models/models";

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


export async function getBlacklistedClubs(blacklist: BlacklistedItem[] | undefined): Promise<ClubDisplayModel[]> {
    let clubs: ClubDisplayModel[] = []

    for (let index = 0; index < blacklist!.length; index++) {
        const element = blacklist![index];

        const clubInfo: ClubModel = await utils.getClub(element.id)

        let club: ClubDisplayModel = {
            ...clubInfo,
            image_url: await utils.getClubImage(element.id),
            reason: element.reason
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


                if (club.league == leagueId) {

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



export async function addFavoriteTeam(teamId: number, user: UserModel) {
    if (user) {
        let userId: ObjectId = user._id!
        let userInformation: UserInformation = {
            userId: userId
        }
        await dbService.userInfoCollection.updateOne({ userId: userId }, { $addToSet: { favoriteTeams: teamId }, $pull: { blacklist: { id: teamId } } });
    }
}

export async function addFavoriteLeague(leagueId: number, user: UserModel) {

    if (user) {
        let userId: ObjectId = user._id!
        let userInformation: UserInformation = {
            favoriteLeague: leagueId,
            userId: userId
        }
        await dbService.userInfoCollection.updateOne({ userId: userId }, { $set: { ...userInformation } });
    }
}

export async function addTeamToBlacklist(teamId: number, user: UserModel, reason: string) {
    if (user) {
        let userId: ObjectId = user._id!
        let userInformation: UserInformation = {
            userId: userId
        }

        let blacklistedItem: BlacklistedItem = { id: teamId, reason: reason }

        await dbService.userInfoCollection.updateOne({ userId: userId }, { $addToSet: { blacklist: blacklistedItem }, $pullAll: { favoriteTeams: [teamId] } });
    }
}

export async function removeFavoriteTeam(teamId: number, user: UserModel) {

    if (user) {
        let userId: ObjectId = user._id!
        let userInformation: UserInformation = {
            userId: userId,
        }

        console.log(await dbService.userInfoCollection.updateOne({ userId: userId }, { $pull: { favoriteTeams: [teamId] } }));
    }
}

export async function removeFavoriteLeague(user: UserModel) {

    if (user) {
        let userId: ObjectId = user._id!
        let userInformation: UserInformation = {
            userId: userId,
            favoriteLeague: undefined
        }

        await dbService.userInfoCollection.updateOne({ userId: userId }, { $set: { ...userInformation } });
    }
}

export async function removeTeamFromBlacklist(teamId: number, user: UserModel) {
    if (user) {
        let userId: ObjectId = user._id!
        let userInformation: UserInformation = {
            userId: userId,
        }

        let blacklistedItem: BlacklistedItem = { id: teamId, }

        await dbService.userInfoCollection.updateOne({ userId: userId }, { $pullAll: { blacklist: [blacklistedItem] } });
    }
}
