interface IMessageRequest {
    id: number | null;
    userId: string;
    chatId: string;
    text: string;
}

export default IMessageRequest;