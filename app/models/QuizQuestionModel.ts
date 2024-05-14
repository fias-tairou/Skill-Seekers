export default interface QuizQuestionModel {
    answer_id: string | number
    name: string,
    options: string[],
    image_url: string
}