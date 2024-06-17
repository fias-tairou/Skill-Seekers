import express from "express"

export default function registerRouter() {
    const router = express.Router()

    router.get("/register", (req, res) => {
        res.render("register")
    });

    router.post("/register", (req, res) => {

        console.log(req.body);

        res.render("register")
    });

    return router
}