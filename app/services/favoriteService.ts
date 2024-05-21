import ClubDisplayModel from "../models/ClubDisplayModel";
import ClubModel from "../models/ClubModel";
import { utils } from "./utils";

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

// NOG UITWERKEN
export async function getLeagueClubs(leagueId: string | number): Promise<ClubDisplayModel[]> {
    let clubs: ClubDisplayModel[] = []
    let clubIdentifiers: number[] = []

    // OP basis van league ID bijhorende clubs zoeken (Beter 1 keer uitvoeren en opslaan in db)
    // MOGELIJK periodiek (begin seizoen) uitvoeren en db updaten

    for (let index = 0; index < clubIdentifiers.length; index++) {
        const element = clubIdentifiers[index];
        const clubInfo: ClubModel = await utils.getClub(element)
        let club: ClubDisplayModel = {
            ...clubInfo,
            image_url: await utils.getClubImage(clubInfo.id)
        }
        clubs.push(club)
    }
    return clubs
}

