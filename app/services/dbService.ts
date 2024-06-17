import { Collection, MongoClient } from "mongodb";
import dotenv from "dotenv";
import UserModel from "../models/UserModel";
import LeagueModel from "../models/LeagueModel";
import QuizModel from "../models/QuizModel";

dotenv.config()

const CONNECTION_STRING = process.env.MONGO_URI || "mongodb://localhost:27017"
const DB_NAME = process.env.DB_NAME || "fifadb"

const client = new MongoClient(CONNECTION_STRING);
const database = client.db(DB_NAME)



// Collections
const userCollection: Collection<UserModel> = database.collection<UserModel>("users")
const leagueCollection: Collection<LeagueModel> = database.collection<LeagueModel>("leagues")


async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

export async function connect() {

    try {
        console.log("Connecting to database ...");
        await client.connect();
        console.log("Connected to database");
        process.on("SIGINT", exit);
    } catch (error) {
        console.error(error);
    }
}