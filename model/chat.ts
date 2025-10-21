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

export interface GetChatMessage {

}

// MARK : CHAT_PARTICIPANTS
export interface GetChatParticipantsDetails {
    participant_name: string,
    role: string,
    participants_id: string
}