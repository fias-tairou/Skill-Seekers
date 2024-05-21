import Club from "../models/ClubModel"
import QuizQuestion from "../models/QuizQuestionModel"
import Session from "../models/SessionModel"
import { utils } from "./utils"
import { v4 as uuidv4 } from 'uuid';

const CLUBS_ENDPOINT: string = '/api/clubs'
const CLUBS_PAGES: number = 38
const OPTION_COUNT: number = 4


const LEAGUES_ENDPOINT: string = '/api/leagues'
const LEAGUES_PAGES: number = 4


function getRandomClub(pool: Club[]): Club {

    let poolSize: number = pool.length
    let club: Club = pool[utils.randomInt(poolSize)]
    return club
}

function getRandomOption(pool: Club[], unavailableOptions: string[]): string {

    let club: Club = getRandomClub(pool)
    let name: string = club.name

    while (unavailableOptions.includes(name)) {
        club = getRandomClub(pool)
        name = club.name
    }
    return name
}

export async function createSession(): Promise<Session> {
    let session: Session = {
        id: uuidv4(),
        quiz: {
            currentQuestion: await createQuizQuestion(),
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

export async function createQuizQuestion(): Promise<QuizQuestion> {
    let page: number = utils.randomRange(1, CLUBS_PAGES)
    let clubPool: Club[] = await utils.getClubs(page)
    let question: QuizQuestion | undefined = {
        answer_id: "",
        name: "",
        options: [],
        image_url: ""
    }

    let answer = await getRandomClub(clubPool)
    question.answer_id = answer.id
    question.name = answer.name
    question.options.push(answer.name)
    question.image_url = await utils.getClubImage(answer.id)

    for (let index = 0; index < OPTION_COUNT - 1; index++) {
        question.options.push(getRandomOption(clubPool, question.options))
    }

    utils.shuffleArray(question.options)

    // Recursief uitvoeren tot er een bas64 word gegenereeerd die geen "application/json" bevat
    if (question.image_url.includes("application/json")) {
        return createQuizQuestion()
    } else {
        return question
    }
}