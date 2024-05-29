import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

import indexRouter from "./routers/index";
import contactRouter from "./routers/contacts";
import blacklistRouter from "./routers/blacklist";
import favorietenRouter from "./routers/favorieten";
import homeRouter from "./routers/home";
import loginRouter from "./routers/login";
import quizRouter from "./routers/quiz";
import registerRouter from "./routers/register";
import { utils } from './services/utils'
import { createClubQuizQuestion } from './services/quizService'
import Session from "./models/SessionModel";
import UserModel from "./models/UserModel";
import { v4 as uuidv4 } from 'uuid';
import SessionPoolModel from "./models/SessionPoolModel";


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
let sessions: SessionPoolModel = {}


// Routers
app.use('/', indexRouter())
app.use('/contact', contactRouter())
app.use('/contacten', contactRouter())
app.use('/quiz', quizRouter(sessions))
app.use('/blacklist', blacklistRouter())
app.use('/favorieten', favorietenRouter())
app.use('/home', homeRouter())
app.use('/login', loginRouter())
app.use('/register', registerRouter())



app.get('/test', async (req, res) => {

    let clubImage = await utils.getClubImage(13)
    let leagueImage = await utils.getLeagueImage(16)
    let club = await utils.getClubs(15)
    console.log(club);
    let x = createClubQuizQuestion()
    console.log(x);

    res.render('test', { clubImage, leagueImage })
})


app.listen(app.get("port"), async () => {

    console.log("Server started on http://localhost:" + app.get('port'));
});