import ClubDisplayModel from "../models/ClubDisplayModel";
import ClubModel from "../models/ClubModel";
import { utils } from "./utils";


const LEAGUES_PAGES: number = 4
const CLUBS_PAGES: number = 38



export async function getClubs(clubIdentifiers: number[] | string[]): Promise<ClubDisplayModel[]> {
    let clubs: ClubDisplayModel[] = []

    for (let index = 0; index < clubIdentifiers.length; index++) {
        const element = clubIdentifiers[index];

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
export async function getLeagueClubs(leagueId: string | number): Promise<ClubDisplayModel[]> {
    let clubPool: ClubModel[]
    let clubs: ClubDisplayModel[] = []

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
                console.log(clubs.length);

            }
        }
    }

    return clubs
}

