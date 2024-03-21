import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/services/store/store';

export interface IChatMessage {
    id: number | null;
    isFromUser: boolean;
    chatId: string;
    senderName: string;
    senderId: string;
    text: string;
}

export interface IChatMessageState {
    messages: IChatMessage[]
}

const initialState = {
    messages: [
        {
            id: Math.floor(Math.random() * 10000),
            isFromUser: false,
            senderName: "Template Name",
            senderId: "42",
            chatId: "42",
            text: "Template text"
        }
    ]
} satisfies IChatMessageState as IChatMessageState

export const messagesSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<IChatMessage>) => {
            state.messages.push(action.payload);
        },
        setMessages: (state, action: PayloadAction<IChatMessage[]>) => {
            state.messages = action.payload;
        },
        removeMessage: (state, action: PayloadAction<number>) => { // remove by id
            state.messages = state.messages.filter(message => message.id !== action.payload);
        },
        clearMessages: (state) => {
            state.messages = [];
        },
        modifyMessage: (state, action: PayloadAction<{id: number, text: string}>) => {
            state.messages = state.messages.map(message =>
              message.id === action.payload.id ?
                { ...message, text: action.payload.text } : message);
        }
    }
});

export const { addMessage, setMessages, removeMessage, clearMessages, modifyMessage } = messagesSlice.actions;

export const selectMessages = (state: RootState) => state.messages.messages;

export const messagesReducer = messagesSlice.reducer ;