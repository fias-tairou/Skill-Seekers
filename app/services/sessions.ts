import dotenv from "dotenv";
dotenv.config();

import session, { MemoryStore } from "express-session";
import mongoDbSession from "connect-mongodb-session";
import QuizModel from "../models/QuizModel";
import UserModel from "../models/UserModel";
const MongoDBStore = mongoDbSession(session);

const mongoStore = new MongoDBStore({
    uri: process.env.MONGODB_URI ?? "mongodb://localhost:27017",
    collection: "sessions",
    databaseName: process.env.DB_NAME || "fifadb",
});

mongoStore.on("error", (error) => {
    console.error(error);
});

declare module 'express-session' {
    export interface SessionData {
        quiz?: QuizModel
        user?: UserModel
    }
}

// export default session({
//     secret: process.env.SESSION_SECRET ?? "my-super-secret-secret",
//     store: mongoStore,
//     resave: false,
//     saveUninitialized: false,
// });

export default session({
    secret: process.env.SESSION_SECRET ?? "my-super-secret-secret",
    store: new MemoryStore(),
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    }
});