import express from "express"
import { ObjectId } from "mongodb";
import ClubDisplayModel from "../models/ClubDisplayModel";
import UserModel from "../models/UserModel";
import { UserInformation } from "../models/models";
import { getBlacklistedClubs, getClubs, getLeagueClubs } from "../services/favoriteService";

import * as userService from "../services/userService";


export default function blacklistRouter() {
    const router = express.Router()

    router.get("/", async (req, res) => {

        let user: UserModel = req.session.user!
        let userId: ObjectId = user._id!
        let userInformation: UserInformation | null = await userService.getUserInfo(userId)
        let clubs: ClubDisplayModel[] = []
        let clubIds: number[] = []
        let league: number[] = []
        const blacklist = userInformation!.blacklist

        if (userInformation) {
            const blacklist = userInformation.blacklist
            clubs = await getBlacklistedClubs(blacklist)
        }
        res.render("blacklisted-pagina", { clubs })
    });

    return router
}