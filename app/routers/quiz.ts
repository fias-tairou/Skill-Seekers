import express, { Router } from "express"
import * as quizService from "../services/quizService"
import * as userService from "../services/userService"
import QuizQuestion from "../models/QuizQuestionModel";
import Session from "../models/SessionModel";
import { utils } from "../services/utils";
import SessionPoolModel from "../models/SessionPoolModel";
import { log } from "console";
import QuizQuestionModel from "../models/QuizQuestionModel";
import QuizModel from "../models/QuizModel";

export default function quizRouter(sessionPool: SessionPoolModel) {
    const router = express.Router()

    router.get("/", (req, res) => {
        let sessionId: string | undefined = req.cookies.quizSessionId
        let score: number | undefined
        let session: Session | undefined = utils.getSession(sessionPool, sessionId)



        if (session && session.quiz) {
            let question: QuizQuestion | undefined
            question = session.quiz.currentQuestion
            score = session.quiz.score
            res.render("quiz_question", { question, score })
        }
        else {
            res.render("quiz")

        }
    });


    router.post("/", async (req, res) => {


        let sessionId: string | undefined = req.cookies.quizSessionId
        let answer: string | undefined = req.body.answer
        console.log(answer);
        let score: number | undefined
        let session: Session | undefined = utils.getSession(sessionPool, sessionId)


        if (!session) {
            console.log("Session Not found creating new session");
            session = await utils.createSession()
            res.cookie("quizSessionId", session.id)
            utils.addSession(sessionPool, session)
        }

        if (!answer && session.quiz) {
            console.log("reload");
            console.log(session.quiz);

            let question: QuizQuestion | undefined
            question = session.quiz.currentQuestion
            score = session.quiz.score
            res.render("quiz_question", { question, score })
        }

        if (!session.quiz) {
            console.log("QUIZ GAME NOT FOUND CREATING NEW ONE");
            session.quiz = await quizService.createNewQuiz()
            let question: QuizQuestion | undefined
            question = session.quiz.currentQuestion
            score = session.quiz.score
            res.render("quiz_question", { question, score })
        }


        if (session.quiz && session.quiz.currentQuestion) {

            if (answer && !session.quiz.currentQuestion.options.includes(answer)) {
                answer = undefined
            }

            // Antwoord werd gegeven en is relevant aan de huidige sessie
            if (answer && session.quiz.currentQuestion.options.includes(answer)) {
                // Antwoord controleren
                const currentQuestion: QuizQuestion | undefined = session.quiz.currentQuestion
                if (answer == currentQuestion.name) {
                    await quizService.progressQuiz(session.quiz)

                    let question: QuizQuestion
                    question = session.quiz.currentQuestion
                    score = session.quiz.score

                    res.render("quiz_question", { question, score })
                }
                else { // Fout antwoord dus sessie moet gestopt worden
                    let score = session.quiz.score
                    let highscore = session.user?.currentHighscore
                    highscore = highscore ? highscore : 0
                    console.log("Current highscore is " + highscore);

                    console.log("WRONG ANSWER QUIZ GAME OVER");
                    if (score <= highscore) {
                        session.quiz = undefined
                        res.render("quiz_game_over", { score })
                    } else {
                        res.render("quiz_high_score", { score, highscore, })
                    }
                }
            }
        }
    });

    router.post("/register-score", async (req, res) => {
        let sessionId: string | undefined = req.cookies.quizSessionId
        let session: Session | undefined = utils.getSession(sessionPool, sessionId)

        if (session && session.user && session.quiz) {
            let score: number | undefined = session.quiz?.score
            session.user.currentHighscore = score
            session.quiz = undefined
        }
        res.render("quiz")
    })

    router.post("/add/", async (req, res) => {
        let sessionId: string | undefined = req.cookies.quizSessionId
        let session: Session | undefined = utils.getSession(sessionPool, sessionId)
        let id: number = parseInt(req.body.id)

        if (session && session.user && session.quiz) {

            let quiz: QuizModel = session.quiz
            let questionIndex: number | undefined = quiz.questionIndex

            if (questionIndex) {
                if (questionIndex % 2 === 0) {
                    userService.addFavoriteLeague(id, session.user)
                } else {
                    userService.addFavoriteTeam(id, session.user)
                }
            }
        }
        res.redirect("/quiz")
    })


    router.post("/blacklist/", async (req, res) => {
        let sessionId: string | undefined = req.cookies.quizSessionId
        let session: Session | undefined = utils.getSession(sessionPool, sessionId)
        let id: number = parseInt(req.body.id)

        if (session && session.user && session.quiz) {

            let quiz: QuizModel = session.quiz
            let questionIndex: number | undefined = quiz.questionIndex

            if (questionIndex) {
                if (questionIndex % 2 === 0) {
                    userService.addLeagueToBlacklist(id, session.user)
                } else {
                    userService.addTeamToBlacklist(id, session.user)
                }
            }
        }
        res.redirect("/quiz")
    })

    return router
}