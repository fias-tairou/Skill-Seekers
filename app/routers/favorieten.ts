import express from "express";
import ClubDisplayModel from "../models/ClubDisplayModel";
import LeagueModel from "../models/LeagueModel";
import SessionPoolModel from "../models/SessionPoolModel";
import { getClubs, getLeagueClubs } from "../services/favoriteService";
import * as userService from "../services/userService";
import { utils } from "../services/utils";

import { ObjectId } from "mongodb";
import UserModel from "../models/UserModel";
import { UserInformation } from "../models/models";



export default function favorietenRouter(sessionPool: SessionPoolModel = {}) {
    const router = express.Router()

    router.get("/", async (req, res) => {
        let user: UserModel = req.session.user!
        let userId: ObjectId = user._id!

        let userInformation: UserInformation | null = await userService.getUserInfo(userId)
        let favoriteLeagueId: string | number | undefined
        let favoriteLeagueImage


        if (userInformation) {
            favoriteLeagueId = userInformation.favoriteLeague
            favoriteLeagueImage = await utils.getLeagueImage(favoriteLeagueId)
        }

        res.render("favorieten", { favoriteLeagueImage, })

    });


    router.get("/league", async (req, res) => {

        let user: UserModel = req.session.user!
        let userId: ObjectId = user._id!
        let userInformation: UserInformation | null = await userService.getUserInfo(userId)

        let league: LeagueModel | undefined
        let clubs: ClubDisplayModel[]
        let favoriteLeagueId: number | undefined
        let favoriteLeagueImage = ""


        if (userInformation) {
            clubs = await getLeagueClubs(userInformation.favoriteLeague)
            favoriteLeagueId = userInformation.favoriteLeague
            league = await utils.getLeague(favoriteLeagueId)
            if (!favoriteLeagueImage) {
                favoriteLeagueImage = await utils.getLeagueImage(favoriteLeagueId)
            }

            return res.render("favoriete-league", { clubs, league, favoriteLeagueImage })
        }

    });


    router.get("/clubs", async (req, res) => {
        let user: UserModel = req.session.user!
        let userId: ObjectId = user._id!
        let userInformation: UserInformation | null = await userService.getUserInfo(userId)
        let clubs: ClubDisplayModel[] = []

        if (userInformation) {
            const favoriteClubs = userInformation.favoriteTeams
            clubs = await getClubs(favoriteClubs)
        }
        res.render("favoriete-club", { clubs })
    });



    return router
}