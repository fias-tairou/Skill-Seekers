import QuizQuestion from "./QuizQuestionModel"
import UserModel from "./UserModel"

export default interface Session {
    user: UserModel | undefined
    id: string
    currentQuestion: QuizQuestion
    score: number
}