import QuizQuestion from "./QuizQuestionModel"
import UserModel from "./UserModel"

export default interface QuizModel {
    id: string
    currentQuestion: QuizQuestion
    score: number
}