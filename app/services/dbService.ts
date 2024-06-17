import { Collection, MongoClient } from "mongodb";
import dotenv from "dotenv";
import UserModel from "../models/UserModel";
import LeagueModel from "../models/LeagueModel";
import QuizModel from "../models/QuizModel";
import bcrypt from "bcrypt"
import { log } from "console";

dotenv.config()


const CONNECTION_STRING = process.env.MONGODB_URI || "mongodb://localhost:27017"
const DB_NAME = process.env.DB_NAME || "fifadb"
const SALT_ROUNDS = 10

const client = new MongoClient(CONNECTION_STRING);
const database = client.db(DB_NAME)



// Collections
export const userCollection: Collection<UserModel> = database.collection<UserModel>("users")
export const leagueCollection: Collection<LeagueModel> = database.collection<LeagueModel>("leagues")
export const squadsCollection: Collection<LeagueModel> = database.collection<LeagueModel>("leagues")
export const favoritesCollection: Collection<LeagueModel> = database.collection<LeagueModel>("leagues")


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

        await userCollection.createIndex({ email: 1 }, { unique: true })
        process.on("SIGINT", exit);
    } catch (error) {
        console.error(error);
    }
}


export async function createInitialUser() {
    if (await userCollection.countDocuments() > 0) {
        return;
    }

    log("creating initial user")
    let email: string | undefined = process.env.ADMIN_EMAIL || "user1@gmail.com";
    let password: string | undefined = process.env.ADMIN_PASSWORD || "toor";

    await userCollection.insertOne({
        email: email,
        password: await bcrypt.hash(password, SALT_ROUNDS),
        favoriteTeams: [],
        favoriteLeague: undefined,
        blacklistedTeams: [],
        BlacklistedLeagues: [],
        currentHighscore: 0
    });

    console.log("done");
}

