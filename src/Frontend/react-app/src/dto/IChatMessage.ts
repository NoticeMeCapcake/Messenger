interface IChatMessage {
    id: number;
    isFromUser: boolean;
    senderName: string;
    userId: string;
    chatId: string;
    text: string;
}

export default IChatMessage;