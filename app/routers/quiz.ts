import express, { Router } from "express"
import * as quizService from "../services/quizService"
import QuizQuestion from "../models/QuizQuestionModel";
import Session from "../models/SessionModel";
import { utils } from "../services/utils";
import SessionPoolModel from "../models/SessionPoolModel";
import { log } from "console";

export default function quizRouter(sessionPool: SessionPoolModel) {
    const router = express.Router()

    router.get("/", (req, res) => {
        res.render("quiz")
    });


    router.post("/", async (req, res) => {

        let sessionId: string | undefined = req.cookies.quizSessionId
        let answer: string = req.body.answer
        console.log(answer);

        let score: number | undefined

        let session: Session | undefined = utils.getSession(sessionPool, sessionId)

        if (!session) {
            console.log("Session Not found creating new session");
            session = await utils.createSession()
            res.cookie("quizSessionId", session.id)
            utils.addSession(sessionPool, session)
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
            // Antwoord werd gegeven en is relevant aan de huidige sessie
            if (answer && session.quiz.currentQuestion.options.includes(answer)) {
                console.log("controlling");
                // Antwoord controleren
                const currentQuestion: QuizQuestion | undefined = session.quiz.currentQuestion
                console.log(answer);
                console.log(currentQuestion.name);
                console.log(answer === currentQuestion.name);



                if (answer === currentQuestion.name) {
                    await quizService.progressQuiz(session.quiz)
                    console.log("ok");

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
                        res.render("quiz_high_score", { score, highscore })
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

    return router
}