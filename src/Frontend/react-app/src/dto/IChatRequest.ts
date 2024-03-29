interface IChatRequest {
    id: number | null;
    userId: string;
    chatId: string;
    text: string;
}

export default IChatRequest;