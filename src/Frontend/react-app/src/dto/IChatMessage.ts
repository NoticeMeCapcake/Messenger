interface IChatMessage {
    id: number;
    isFromUser: boolean;
    senderId: string;
    text: string;
}

export default IChatMessage;