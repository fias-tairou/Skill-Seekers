import express from "express"
import * as dbService from "../services/dbService";

export default function homeRouter() {
    const router = express.Router()



    router.get("/", (req, res) => {
        let users = dbService.userCollection.find({}).toArray()
        console.log(users);
        res.render("home")
    });

    return router
}
