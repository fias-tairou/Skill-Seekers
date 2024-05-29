import QuizModel from "./QuizModel"
import UserModel from "./UserModel"

export default interface Session {
    user: UserModel | undefined
    id: string
    quiz: QuizModel | undefined
}