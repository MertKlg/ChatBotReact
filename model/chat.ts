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

export interface GetChatMessageResult {
    message_id: string,
    content: string,
    is_from_ai: boolean,
    created_at: Date,
    sender_id: string,
    sender_name: string
}

// MARK : CHAT_PARTICIPANTS
export interface GetChatParticipantsDetails {
    participant_name: string,
    role: string,
    participants_id: string
}