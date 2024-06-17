import { Collection } from "mongodb";
import UserModel from "../models/UserModel";
import * as dbService from "./dbService"
import bcrypt from "bcrypt"


const SALT_ROUNDS: number = 10
const userCollection: Collection<UserModel> = dbService.userCollection

export async function login(email: string, password: string) {
    if (email === "" || password === "") {
        throw new Error("Email and password required");
    }
    let user: UserModel | null = await dbService.userCollection.findOne<UserModel>({ email: email });
    if (user) {
        if (await bcrypt.compare(password, user.password!)) {
            return user;
        } else {
            throw new Error("Password incorrect");
        }
    } else {
        throw new Error("User not found");
    }
}

export async function createUser(email: string, password: string) {

    if (!await userCollection.findOne({ email: email })) {
        await userCollection.insertOne({
            email: email,
            password: await bcrypt.hash(password, SALT_ROUNDS),
            favoriteTeams: [],
            favoriteLeague: undefined,
            blacklistedTeams: [],
            BlacklistedLeagues: [],
            currentHighscore: 0
        });
    } else {
        console.log("user exists already");
    }
}

export async function checkIfUserExists(email: string): Promise<boolean> {
    let user: UserModel | null = await dbService.userCollection.findOne({ email: email })
    if (user) {
        return true
    }
    return false
};