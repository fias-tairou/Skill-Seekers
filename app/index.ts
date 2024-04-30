import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app : Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, "views"));

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
    res.render("index", {
        title: "Hello World",
        message: "Hello World"
    })
});

app.get("/", (req, res) => {
    res.render("index")
});


app.get("/contact", (req, res) => {
    res.render("contact")
});

app.get("/contacten", (req, res) => {
    res.render("contact")
});

app.get("/home", (req, res) => {
    res.render("home")
});

app.get("/blacklisted-pagina", (req, res) => {
    res.render("blacklisted-pagina")
});

app.get("/favorieten", (req, res) => {
    res.render("favorieten")
});

app.get("/favoriete-club", (req, res) => {
    res.render("favoriete-club")
});

app.get("/favoriete-league", (req, res) => {
    res.render("favoriete-league")
});

app.get("/quiz", (req, res) => {
    res.render("quiz")
});


app.listen(app.get("port"), () => {
    console.log("Server started on http://localhost:" + app.get('port'));
});