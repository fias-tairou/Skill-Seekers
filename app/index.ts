import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, { Express } from "express";
import path from "path";


import blacklistRouter from "./routers/blacklist";
import contactRouter from "./routers/contacts";
import favorietenRouter from "./routers/favorieten";
import homeRouter from "./routers/home";
import indexRouter from "./routers/index";
import loginRouter from "./routers/login";
import quizRouter from "./routers/quiz";
import * as dbService from './services/dbService';
import * as middleware from './services/middleware';
import session from './services/sessions';

dotenv.config();
const app: Express = express();


// Configuraties
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, "views"));
app.set("port", process.env.PORT || 3000);
app.use(cookieParser())

// Globale properties
app.use(session);

app.use((req, res, next) => {
    res.locals.title = "FIFA";
    next();
});

// Routers
app.use('/', loginRouter())
app.use('/', indexRouter())
app.use(middleware.checkIfLoggedIn)

app.use('/contact', contactRouter())
app.use('/contacten', contactRouter())
app.use('/quiz', quizRouter())

app.use('/blacklist', blacklistRouter())
app.use('/favorieten', favorietenRouter())
app.use('/home', homeRouter())

app.listen(app.get("port"), async () => {
    console.log("Server started on http://localhost:" + app.get('port'));
    await dbService.connect()
    await dbService.createInitialUser()
    // await userService.createUser("user1@gmail.com", "toor")
});