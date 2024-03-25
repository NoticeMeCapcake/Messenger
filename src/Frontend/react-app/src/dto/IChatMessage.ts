export default interface IChatMessage {
    id: number | null;
    tempId: string;
    isFromUser: boolean;
    chatId: string;
    senderName: string;
    senderId: string;
    text: string;
}
