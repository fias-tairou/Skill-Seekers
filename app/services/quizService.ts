import ClubModel from "../models/ClubModel"
import LeagueModel from "../models/LeagueModel";
import QuizModel from "../models/QuizModel";
import QuizQuestion from "../models/QuizQuestionModel"
import Session from "../models/SessionModel"
import { utils } from "./utils"
import { v4 as uuidv4 } from 'uuid';

const CLUBS_ENDPOINT: string = '/api/clubs'
const CLUBS_PAGES: number = 38
const OPTION_COUNT: number = 4


const LEAGUES_ENDPOINT: string = '/api/leagues'
const LEAGUES_PAGES: number = 4


function getRandomClub(pool: ClubModel[]): ClubModel {

    let poolSize: number = pool.length
    let club: ClubModel = pool[utils.randomInt(poolSize)]
    return club
}

function getRandomLeague(pool: LeagueModel[]): LeagueModel {

    let poolSize: number = pool.length
    let league: LeagueModel = pool[utils.randomInt(poolSize)]
    return league
}

function getRandomClubOption(pool: ClubModel[], unavailableOptions: string[]): string {

    let club: ClubModel = getRandomClub(pool)
    let name: string = club.name

    while (unavailableOptions.includes(name)) {
        club = getRandomClub(pool)
        name = club.name
    }
    return name
}

function getRandomLeagueOption(pool: LeagueModel[], unavailableOptions: string[]): string {

    let league: LeagueModel = getRandomLeague(pool)
    let name: string = league.name

    while (unavailableOptions.includes(name)) {
        league = getRandomLeague(pool)
        name = league.name
    }
    return name
}

export async function createClubQuizQuestion(): Promise<QuizQuestion> {
    let page: number = utils.randomRange(1, CLUBS_PAGES)
    let clubPool: ClubModel[] = await utils.getClubs(page)
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
        question.options.push(getRandomClubOption(clubPool, question.options))
    }

    utils.shuffleArray(question.options)

    // Recursief uitvoeren tot er een bas64 word gegenereeerd die geen "application/json" bevat
    if (question.image_url.includes("application/json")) {
        return createClubQuizQuestion()
    } else {
        return question
    }
}


export async function createLeagueQuizQuestion(): Promise<QuizQuestion> {

    let page: number = utils.randomRange(1, LEAGUES_PAGES)
    let leaguePool: LeagueModel[] = await utils.getLeagues(page)
    let question: QuizQuestion | undefined = {
        answer_id: "",
        name: "",
        options: [],
        image_url: ""
    }

    let answer = await getRandomLeague(leaguePool)

    question.answer_id = answer.id
    question.name = answer.name
    question.options.push(answer.name)
    question.image_url = await utils.getLeagueImage(answer.id)

    for (let index = 0; index < OPTION_COUNT - 1; index++) {
        question.options.push(getRandomLeagueOption(leaguePool, question.options))
    }

    utils.shuffleArray(question.options)

    // Recursief uitvoeren tot er een bas64 word gegenereeerd die geen "application/json" bevat
    if (question.image_url.includes("application/json")) {
        return createClubQuizQuestion()
    } else {

        return question
    }


}

export async function createNewQuiz(): Promise<QuizModel> {

    let quiz: QuizModel | undefined = {
        currentQuestion: await createClubQuizQuestion(),
        score: 0,
        questionIndex: 1
    }
    return quiz
}

export async function progressQuiz(quiz: QuizModel) {
    if (!quiz.questionIndex) {
        quiz.questionIndex = 0
    }
    quiz.questionIndex += 1
    quiz.score += 10

    if (quiz.questionIndex % 2 == 0) {
        quiz.currentQuestion = await createLeagueQuizQuestion()
    } else {
        quiz.currentQuestion = await createClubQuizQuestion()
    }



}
