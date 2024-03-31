export default interface IChatMessage {
    id: string | null;
    tempId: string;
    chatId: string;
    senderName: string;
    senderId: string;
    text: string;
    isRead?: boolean;
    error?: boolean;
    loading?: boolean;
}
