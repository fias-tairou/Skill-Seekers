export default interface ClubDisplayModel {
    id: string | number
    name: string,
    league: number | string
    image_url: string | undefined
    reason?: string
}