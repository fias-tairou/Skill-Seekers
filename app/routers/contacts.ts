import express from "express";

export default function contactRouter() {

    const router = express.Router()

    router.get("/", (req, res) => {
        res.render("contact")
    });

    return router
}