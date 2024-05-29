import express from "express"
import SessionPoolModel from "../models/SessionPoolModel";
import Session from "../models/SessionModel";
import { utils } from "../services/utils";
import LeagueModel from "../models/LeagueModel";
import ClubDisplayModel from "../models/ClubDisplayModel";
import { getClubs, getLeagueClubs } from "../services/favoriteService";



export default function favorietenRouter(sessionPool: SessionPoolModel) {
    const router = express.Router()

    router.get("/", async (req, res) => {
        let sessionId: string | undefined = req.cookies.quizSessionId
        let session: Session | undefined = utils.getSession(sessionPool, sessionId)
        let favoriteLeagueId: string | number | undefined
        let favoriteLeagueImage

        if (!session) {
            session = utils.createSession()
            utils.addSession(sessionPool, session)
            favoriteLeagueId = session.user?.favoriteLeague
            favoriteLeagueImage = await utils.getLeagueImage(favoriteLeagueId)
            res.cookie("quizSessionId", session.id)
        }
        favoriteLeagueId = session.user?.favoriteLeague

        if (!favoriteLeagueImage) {
            favoriteLeagueImage = await utils.getLeagueImage(favoriteLeagueId)
        }
        res.render("favorieten", { favoriteLeagueImage, })
    });


    router.get("/league", async (req, res) => {

        let sessionId: string | undefined = req.cookies.quizSessionId
        let answer: string | undefined = req.body.answer
        let session: Session | undefined = utils.getSession(sessionPool, sessionId)
        let clubs: ClubDisplayModel[]
        let favoriteLeagueId: string | number | undefined
        let favoriteLeagueImage = ""
        let league: LeagueModel | undefined



        if (session && session.user?.favoriteLeague) {
            clubs = await getLeagueClubs(session.user?.favoriteLeague)
            favoriteLeagueId = session.user?.favoriteLeague
            league = await utils.getLeague(favoriteLeagueId)
            if (!favoriteLeagueImage) {
                favoriteLeagueImage = await utils.getLeagueImage(favoriteLeagueId)
            }
        } else {
            clubs = []
        }

        res.render("favoriete-league", { clubs, league, favoriteLeagueImage })
    });


    router.get("/clubs", async (req, res) => {

        let sessionId: string | undefined = req.cookies.quizSessionId
        let session: Session | undefined = utils.getSession(sessionPool, sessionId)
        let favoriteClubs: number[] | string[]
        let clubs: ClubDisplayModel[]
        if (session) {
            favoriteClubs = session.user!.favoriteTeams
            clubs = await getClubs(favoriteClubs)
            res.render("favoriete-club", { clubs })
        } else {
            res.redirect("/")
        }
    });

    return router
}