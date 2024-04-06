interface IMessageResponse  {
    id: string;
    tempId: string;
    userId: string;
    chatId: string;
    text: string;
    createdAt: number;
}
export default IMessageResponse;