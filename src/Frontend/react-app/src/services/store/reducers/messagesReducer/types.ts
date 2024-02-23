export interface IMessagesState {
  messages: IChatMessage[];
}

export interface IChatMessage {
  id: number;
  isFromUser: boolean;
  senderId: string;
  text: string;
}