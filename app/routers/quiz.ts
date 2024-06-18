import express from "express";
import QuizModel from "../models/QuizModel";
import Session from "../models/SessionModel";
import * as favoriteService from "../services/favoriteService";
import * as quizService from "../services/quizService";
import * as userService from "../services/userService";
import { utils } from "../services/utils";
import UserModel from "../models/UserModel";
import SessionPoolModel from "../models/SessionPoolModel";
import { ObjectId } from "mongodb";
import { UserInformation } from "../models/models";

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

        if (!answer) {
            return res.render("quiz_question", { ...quiz })
        }

        let rightAnswer: boolean = quizService.checkIfAnsweredRight(quiz, answer)

        if (rightAnswer) {
            await quizService.progressQuiz(quiz)
            return res.render("quiz_question", { ...quiz })
        }

        else if (!rightAnswer) {

            let userId: ObjectId = req.session.user?._id!
            let score: number = req.session.quiz!.score

            if (await quizService.isHighscore(userId, score)) {

                return res.render("quiz_high_score", { ...quiz })
            }
            else {

                return res.render("quiz_game_over", { ...quiz })
            }
        }
    });

    router.post("/register-score", async (req, res) => {
        let userId: ObjectId | undefined = req.session.user?._id
        if (userId) {
            let score: number | undefined = req.session.quiz?.score
            let userInfo: UserInformation = {
                userId: userId,
                currentHighscore: score
            }
            await userService.updatteUserInfo(userId, userInfo)

        }
        await quizService.resetQuiz(req.session.quiz!)
        res.render("quiz")
    });

    router.post("/add", async (req, res) => {

        let id = req.body.id
        let questionIndex: number | undefined = req.session.quiz!.questionIndex
        let user: UserModel = req.session.user!
        let quiz: QuizModel = req.session.quiz!

        if (questionIndex) {
            if (questionIndex % 2 === 0) {
                favoriteService.addFavoriteLeague(id, user)
            } else {
                favoriteService.addFavoriteTeam(id, user)
            }
        }
        if (quiz.currentQuestion) {

            return res.render("quiz_question", { ...quiz })
        }

        res.redirect('/quiz')
    })


    router.get("/blacklist", async (req, res) => {
        let id = req.body.id
        let reason = req.body.reason || "geen reden"

        let questionIndex: number | undefined = req.session.quiz!.questionIndex
        let user: UserModel = req.session.user!
        let quiz: QuizModel = req.session.quiz!


        if (quiz.currentQuestion) {

            return res.render("quiz_blacklist_team", { ...quiz })
        }
        res.redirect('/quiz')
    })


    router.post("/blacklist/", async (req, res) => {
        let id = req.body.id

        let reason = req.body.reason
        console.log(req.body);

        let questionIndex: number | undefined = req.session.quiz!.questionIndex
        let user: UserModel = req.session.user!
        let quiz: QuizModel = req.session.quiz!


        if (questionIndex) {
            if (questionIndex % 2 === 0) {
                // favoriteService.addLeagueToBlacklist(id, user)
            } else {
                favoriteService.addTeamToBlacklist(id, user, reason)
            }
        }
        if (quiz.currentQuestion) {

            return res.render("quiz_question", { ...quiz })
        }

        res.redirect('/quiz')
    })

    return router
}