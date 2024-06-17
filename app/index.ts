import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, { Express } from "express";
import path from "path";


import * as dbService from './services/dbService'
import SessionPoolModel from "./models/SessionPoolModel";
import blacklistRouter from "./routers/blacklist";
import contactRouter from "./routers/contacts";
import favorietenRouter from "./routers/favorieten";
import homeRouter from "./routers/home";
import indexRouter from "./routers/index";
import loginRouter from "./routers/login";
import quizRouter from "./routers/quiz";
import registerRouter from "./routers/register";
import { createClubQuizQuestion } from './services/quizService';
import { utils } from './services/utils';


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

app.use((req, res, next) => {
    res.locals.title = "FIFA";
    next();
});

// Routers
app.use('/', indexRouter())
app.use('/contact', contactRouter())
app.use('/contacten', contactRouter())
app.use('/quiz', quizRouter(sessions))
app.use('/blacklist', blacklistRouter())
app.use('/favorieten', favorietenRouter(sessions))
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
    dbService.connect()
});