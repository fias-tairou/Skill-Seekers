import express from "express"
import * as dbService from "../services/dbService";

export default function homeRouter() {
    const router = express.Router()



    router.get("/", async (req, res) => {
        let users = await dbService.userCollection.find({}).toArray()
        res.render("home")
    });

    return router
}
