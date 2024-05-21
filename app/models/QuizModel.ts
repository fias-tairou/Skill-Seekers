import QuizQuestion from "./QuizQuestionModel"

export default interface QuizModel {
    currentQuestion: QuizQuestion | undefined
    score: number
}