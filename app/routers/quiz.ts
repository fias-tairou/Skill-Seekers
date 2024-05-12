import express from "express"

export default function quizRouter() {
    const router = express.Router()

    router.get("/", (req, res) => {
        res.render("quiz")
    });

    return router
}