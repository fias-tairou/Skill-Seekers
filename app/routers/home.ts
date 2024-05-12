import express from "express"

export default function homeRouter() {
    const router = express.Router()

    router.get("/", (req, res) => {
        res.render("home")
    });

    return router
}
