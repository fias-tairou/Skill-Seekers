import { Request, Response, NextFunction } from "express";
import UserModel from "../models/UserModel";


export const setLocals = (req: Request, res: Response, next: NextFunction) => {

    let user: UserModel | undefined = req.session.user || undefined
    res.locals.title = "Auction Finder";
    res.locals.user = user
    next();

}

export const checkIfLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    let user: UserModel | undefined = req.session.user || undefined
    if (!user) {
        res.redirect("/login")
    } else {
        next()
    }
}


export const redirectIfLoggedIn = (req: Request, res: Response, next: NextFunction) => {

    let user: UserModel | undefined = req.session.user || undefined
    console.log(req.url);

    if (user) {
        res.redirect('/')
        next()
    }
    next()
}
