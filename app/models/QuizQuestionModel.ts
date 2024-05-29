export default interface QuizQuestionModel {
    dislikeFormAction?: string
    likeFormAction?: string
    answer_id: string | number
    name: string,
    options: string[],
    image_url: string
}