import { v4 as uuidv4 } from 'uuid';
import Session from '../models/SessionModel';
import SessionPoolModel from '../models/SessionPoolModel';

const API_KEY: string = "3be1d466-707b-4667-897e-5498cd656e95"


let fetchItem = async (url: string) => {
    let headers = {
        'accept': 'application/json',
        'X-AUTH-TOKEN': API_KEY
    }
    const response = await fetch(url, {
        method: "GET",
        headers: headers
    });
    const json = await response.json();
    return json;
}

let getImage = async (url: string) => {
    let headers = {
        'accept': 'image/png',
        'X-AUTH-TOKEN': API_KEY
    }
    return fetch(url, {
        method: "GET",
        headers: headers
    }).then((response) => {
        return response.blob()
    }).then(async (blob) => {
        // console.log(response.blob());
        let buffer = Buffer.from(await blob.arrayBuffer())
        return "data:" + blob.type + ';base64,' + buffer.toString('base64');
    })
}

export let utils = {

    randomRange: (min: number, max: number): number => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    randomInt: (max: number): number => {
        return Math.floor(Math.random() * max);
    },

    getClubs: async (page: number | string) => {
        const url = `https://futdb.app/api/clubs?page=${page}`
        let data = await fetchItem(url)
        return data.items
    },

    getClub: async (id: number | string) => {
        const url = `https://futdb.app/api/clubs/${id}`
        let data = await fetchItem(url)
        return data.club
    },

    getLeagues: async (page: number | string) => {
        const url = `https://futdb.app/api/leagues?page=${page}`
        let data = await fetchItem(url)
        return data.items
    },

    getLeague: async (id: number | string) => {
        const url = `https://futdb.app/api/leagues/${id}`
        let data = await fetchItem(url)
        return data.league
    },

    getClubImage: (clubId: number | string = 1) => {
        const clubEndpoint = "https://futdb.app/api/clubs"
        const endpoint = `${clubEndpoint}/${clubId}/image`
        return getImage(endpoint)
    },

    getLeagueImage: (leagueId: number | string = 15) => {
        const leagueEndpoint = "https://futdb.app/api/leagues"
        const endpoint = `${leagueEndpoint}/${leagueId}/image`
        return getImage(endpoint)
    },

    createSession: (): Session => {
        let session: Session = {
            id: uuidv4(),
            quiz: {
                currentQuestion: undefined,
                score: 0
            },
            user: {
                _id: "100",
                username: "dummy1",
                email: "bob@gmail.com",
                favoriteTeams: [1, 2, 3, 4, 5],
                favoriteLeague: 13,
                blacklistedTeams: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                BlacklistedLeagues: [1, 5, 7, 9, 11],
                currentHighscore: 0
            }
        }
        return session
    },
    getSession: (sessionPool: SessionPoolModel, sessionId: string | undefined): Session | undefined => {
        if (sessionId) {
            return sessionPool[sessionId]
        } else {
            return undefined
        }
    },

    addSession: (sessionPool: SessionPoolModel, session: Session) => {
        let id: string = session.id
        sessionPool[id] = session
    },

    shuffleArray: (array: any) => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
}