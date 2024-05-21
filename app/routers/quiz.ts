import express, { Router } from "express"
import { createQuizQuestion } from "../services/quizService"
import QuizQuestion from "../models/QuizQuestionModel";
import Session from "../models/SessionModel";
import { utils } from "../services/utils";
import SessionPoolModel from "../models/SessionPoolModel";
import { log } from "console";

export default function quizRouter(sessionPool: SessionPoolModel) {
    const router = express.Router()

    router.get("/", (req, res) => {
        let session: string | undefined
        res.render("quiz", { session })
    });


    router.post("/vraag/:id", async (req, res) => {

        let sessionId: string | undefined = req.cookies.quizSessionId
        let answer: string = req.body.answer
        console.log(answer);

        let score: number | undefined

        let session: Session | undefined = utils.getSession(sessionPool, sessionId)

        if (!session) {
            console.log("Session Not found creating new session");

            let newSession: Session = await utils.createSession()
            res.cookie("quizSessionId", newSession.id)
            sessionId = newSession.id
            newSession.quiz = {
                currentQuestion: await createQuizQuestion(),
                score: 0
            }

            let question: QuizQuestion | undefined
            question = newSession.quiz.currentQuestion
            score = newSession.quiz.score

            session = newSession
            utils.addSession(sessionPool, newSession)
            res.render("quiz_question", { question, score })
        }


        if (!session.quiz) {
            console.log("QUIZ GAME NOT FOUND CREATING NEW ONE");

            session.quiz = {
                currentQuestion: await createQuizQuestion(),
                score: 0
            }

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
                if (currentQuestion && answer === currentQuestion.name) {
                    session.quiz.score += 10 // score toekennen
                    session.quiz.currentQuestion = await createQuizQuestion() // niew vraage creeren
                    let question: QuizQuestion
                    question = session.quiz.currentQuestion
                    score = session.quiz.score
                    res.render("quiz_question", { question, score })
                }
                else { // Fout antwoord dus sessie moet gestopt worden
                    session.quiz = undefined
                    console.log("WRONG ANSWER QUIZ GAME OVER");
                    console.log(sessionPool);
                    res.redirect("/quiz")
                }
            }
        }

    });
    return router
}