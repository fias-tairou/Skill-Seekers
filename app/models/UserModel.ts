import { ObjectId } from "mongodb"

export default interface UserModel {
    _id?: ObjectId,
    email: string,
    password?: string
}