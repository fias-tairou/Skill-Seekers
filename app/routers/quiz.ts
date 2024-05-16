import express, { Router } from "express"
import { createQuizQuestion, createSession } from "../services/quizService"
import QuizQuestion from "../models/QuizQuestionModel";
import Session from "../models/SessionModel";
import { log } from "console";

export default function quizRouter(sessionPool: Session[] = []) {
    let session: Session | undefined
    const router = express.Router()

    router.get("/", (req, res) => {
        let session: string | undefined
        res.clearCookie("quizSessionId")
        res.render("quiz", { session })
    });


    router.post("/vraag/:id", async (req, res) => {
        let sessionId: string | undefined = req.cookies.quizSessionId
        let answer: string = req.body.answer
        let score: number | undefined

        let session: Session | undefined = sessionPool.filter((session) => {
            if (session.id === sessionId) {
                return session
            }
        })[0]

        if (!session) {
            let newQuizSession: Session = await createSession()

            sessionPool.push(newQuizSession)
            session = newQuizSession
            res.cookie("quizSessionId", newQuizSession.id)
            sessionId = newQuizSession.id
            session.score = 0
            let question: QuizQuestion
            question = session.currentQuestion
            score = session.score
            res.render("quiz_question", { question, score })
        }

        // Antwoord werd gegeven en is relevant aan de huidige sessie
        if (answer && session.currentQuestion.options.includes(answer)) {
            console.log("controlling");
            // Antwoord controleren
            const currentQuestion: QuizQuestion = session.currentQuestion
            if (answer === currentQuestion.name) {
                session.score += 10 // score toekennen
                session.currentQuestion = await createQuizQuestion() // niew vraage creeren
                let question: QuizQuestion
                question = session.currentQuestion
                score = session.score
                res.render("quiz_question", { question, score })
            }
            else { // Fout antwoord dus sessie moet gestopt worden
                sessionPool = sessionPool.filter((session) => {
                    if (session.id !== sessionId) {
                        return session
                    }
                })
                console.log("session cleared from pool");
                console.log("SESSIONPOOL SIZE IS " + sessionPool.length);
                res.clearCookie("quizSessionId")
                res.redirect("/quiz")
            }
        }
    });
    return router
}