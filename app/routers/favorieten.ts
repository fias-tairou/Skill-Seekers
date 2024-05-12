import express from "express"

export default function favorietenRouter() {
    const router = express.Router()

    router.get("/", (req, res) => {
        res.render("favorieten")
    });

    router.get("/league", (req, res) => {
        res.render("favoriete-league")
    });

    router.get("/clubs/", (req, res) => {
        res.render("favoriete-club")
    });

    return router
}