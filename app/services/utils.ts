import { v4 as uuidv4 } from 'uuid';
import Session from '../models/SessionModel';
import SessionPoolModel from '../models/SessionPoolModel';

const API_KEY: string = "3be1d466-707b-4667-897e-5498cd656e95"


function randomRange(min: number, max: number): number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

async function getImage(url: string) {
    let headers = {
        'accept': 'image/png',
        'X-AUTH-TOKEN': API_KEY
    }
    return fetch(url, {
        method: "GET",
        headers: headers
    }).then((response) => {
        // console.log(response.blob());
        return response.blob()
    }).then(async (blob) => {
        // console.log(response.blob());
        let buffer = Buffer.from(await blob.arrayBuffer())
        return "data:" + blob.type + ';base64,' + buffer.toString('base64');
    })
}

async function fetchItem(url: string) {
    let headers = {
        'accept': 'application/json',
        'X-AUTH-TOKEN': API_KEY
    }
    return fetch(url, {
        method: "GET",
        headers: headers
    }).then((response) => {
        // console.log(response.blob());
        return response.json()
    }).then((json) => {
        return json.items
    })
}

async function getClubs(page: number | string) {
    const url = `https://futdb.app/api/clubs?page=${page}`
    return fetchItem(url)
}

async function getClubImage(clubId: number | string = 1) {
    const clubEndpoint = "https://futdb.app/api/clubs"
    const endpoint = `${clubEndpoint}/${clubId}/image`
    return getImage(endpoint)
}

async function getLeagueImage(leagueId: number | string = 15) {
    const leagueEndpoint = "https://futdb.app/api/leagues"
    const endpoint = `${leagueEndpoint}/${leagueId}/image`
    return getImage(endpoint)
}

export async function createSession(): Promise<Session> {
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
}

export function getSession(sessionPool: SessionPoolModel, sessionId: string | undefined): Session | undefined {
    if (sessionId) {
        return sessionPool[sessionId]
    } else {
        return undefined
    }
}

export function addSession(sessionPool: SessionPoolModel, session: Session) {
    let id: string = session.id
    sessionPool[id] = session
}



function shuffleArray(array: any) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export const utils = {
    randomRange, randomInt, getClubImage, getLeagueImage, fetchItem, getClubs, shuffleArray, createSession, getSession, addSession
}