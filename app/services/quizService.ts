import ClubModel from "../models/ClubModel"
import QuizQuestionModel from "../models/QuizQuestionModel"
import { utils } from "./utils"

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

function getRandomOption(pool: ClubModel[], unavailableOptions: string[]): string {

    let club: ClubModel = getRandomClub(pool)
    let name: string = club.name

    if (unavailableOptions.includes(name)) {
        getRandomOption(pool, unavailableOptions)
    } else {
        name = club.name
    }
    return name
}

function shuffleOptions(array: string[]) {

    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export async function createQuizQuestion(): Promise<QuizQuestionModel> {
    let page: number = utils.randomRange(1, CLUBS_PAGES)
    let clubPool: ClubModel[] = await utils.getClubs(page)
    let question: QuizQuestionModel | undefined = {
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

    shuffleOptions(question.options)

    return question
}

