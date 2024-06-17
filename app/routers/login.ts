import express from "express"
import * as userService from "../services/userService"
import UserModel from "../models/UserModel";

export default function loginRouter() {
    const router = express.Router()

    router.get("/login", (req, res) => {
        res.render("login")
    });


    router.post("/login", async (req, res) => {

        let email: string = req.body.email
        let password: string = req.body.password

        let userExists: boolean = await userService.checkIfUserExists(email)
        let user: UserModel | null = await userService.login(email, password)

        let props = {
            title: "Log In",
            error: false
        }

        if (!userExists) {
            props.error = true
        }

        if (!user) {
            props.error = true
            res.render("login", { ...props });
        }

        if (user) {
            req.session.user = user
            res.redirect('/')
        }
    });




    router.get("/register", (req, res) => {
        res.render("register")
    });

    router.post("/register", async (req, res) => {

        let email: string = req.body.email
        let password: string = req.body.password
        let userExists: boolean = await userService.checkIfUserExists(email)

        if (!userExists) {
            await userService.createUser(email, password)
            return res.redirect("/login");
        } else {
            let props = {
                title: "Register",
                error: true
            }
            res.render("register", { ...props })
        }
    });


    router.get("/reset", (req, res) => {
        res.render("password-reset")
    });

    return router
}