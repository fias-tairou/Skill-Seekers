import Session from "./SessionModel";

export default interface SessionPoolModel {
    [id: string]: Session
}