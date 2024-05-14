import express, { Router } from "express"
import { createQuizQuestion } from "../services/quizService"
import QuizQuestionModel from "../models/QuizQuestionModel";

export default function quizRouter() {
    const router = express.Router()
    router.get("/", (req, res) => {
        let session: string | undefined
        let quizProperties = {

        }
        res.render("quiz", { session, ...quizProperties })
    });


    router.post("/vraag/:id", async (req, res) => {
        let session: string | undefined
        let question: QuizQuestionModel = await createQuizQuestion()

        let quizProperties = {
            question,
        }
        res.render("quiz_question", { ...quizProperties })
    });


    return router
}



