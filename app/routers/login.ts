import express from "express"

export default function loginRouter() {
    const router = express.Router()

    router.get("/", (req, res) => {
        res.render("login")
    });

    router.get("/reset", (req, res) => {
        res.render("password-reset")
    });

    return router
}