import express from "express";
import QuizModel from "../models/QuizModel";
import Session from "../models/SessionModel";
import * as favoriteService from "../services/favoriteService";
import * as quizService from "../services/quizService";
import { utils } from "../services/utils";
import UserModel from "../models/UserModel";
import SessionPoolModel from "../models/SessionPoolModel";

export default function quizRouter(sessionPool: SessionPoolModel = {}) {
    const router = express.Router()

    router.get("/", async (req, res) => {

        req.session.quiz = {
            currentQuestion: await quizService.createClubQuizQuestion(),
            questionIndex: 1,
            score: 0,
        }
        res.render("quiz")
    });


    router.post("/", async (req, res) => {

        let quiz: QuizModel | undefined = req.session.quiz || {
            currentQuestion: await quizService.createClubQuizQuestion(),
            questionIndex: 1,
            score: 0,
        }

        let answer: string = req.body.answer || undefined

        console.log(answer);

        if (!answer) {
            return res.render("quiz_question", { ...quiz })
        }

        let rightAnswer: boolean = quizService.checkIfAnsweredRight(quiz, answer)

        if (rightAnswer) {
            await quizService.progressQuiz(quiz)
            return res.render("quiz_question", { ...quiz })
        }

        else if (!rightAnswer) {
            return res.render("quiz_game_over", { ...quiz })
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
    });

    router.post("/add/", async (req, res) => {

        let id = req.body.id
        let questionIndex: number | undefined = req.session.quiz!.questionIndex

        let user: UserModel = req.session.user!
        if (questionIndex) {
            if (questionIndex % 2 === 0) {
                favoriteService.addFavoriteLeague(id, user)
            } else {
                favoriteService.addFavoriteTeam(id, user)
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
                    favoriteService.addLeagueToBlacklist(id, session.user)
                } else {
                    favoriteService.addTeamToBlacklist(id, session.user)
                }
            }
        }
        res.redirect("/quiz")
    })

    return router

}