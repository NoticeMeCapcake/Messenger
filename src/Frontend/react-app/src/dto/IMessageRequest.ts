interface IMessageRequest {
    id?: string | null;
    tempId?: string;
    userId?: string;
    chatId?: string;
    text?: string;
}

export default IMessageRequest;