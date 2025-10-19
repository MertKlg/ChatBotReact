export default interface IChat {
    id: string,
    owner: string,
    role: string,
    title: string,
    type: string,
    updated_at: string,
    created_at: string
}


export interface CreateChatRequest {
    title: string,
    ai_models: [{ id: string }]
}