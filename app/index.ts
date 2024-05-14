import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import indexRouter from "./routers/index";
import contactRouter from "./routers/contacts";
import blacklistRouter from "./routers/blacklist";
import favorietenRouter from "./routers/favorieten";
import homeRouter from "./routers/home";
import loginRouter from "./routers/login";
import quizRouter from "./routers/quiz";
import registerRouter from "./routers/register";
import { utils } from './services/utils'
import { createQuizQuestion } from './services/quizService'
import { log } from "console";
import { render } from "ejs";

dotenv.config();

const app: Express = express();


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, "views"));
app.set("port", process.env.PORT || 3000);



// Routers
app.use('/', indexRouter())
app.use('/contact', contactRouter())
app.use('/contacten', contactRouter())
app.use('/quiz', quizRouter())
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
    let x = createQuizQuestion()
    console.log(x);


    res.render('test', { clubImage, leagueImage })
})

app.listen(app.get("port"), async () => {
    console.log("Server started on http://localhost:" + app.get('port'));
});