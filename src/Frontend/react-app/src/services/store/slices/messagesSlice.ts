import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/services/store/store';
import IChatMessage from '@/dto/IChatMessage';

export interface IChatMessageState {
    messages: IChatMessage[]
}

const initialState = {
    messages: [
        {
            id: "123",
            tempId: "123",
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
        removeMessage: (state, action: PayloadAction<string>) => { // remove by id
            state.messages = state.messages.filter(message => message.id !== action.payload);
        },
        clearMessages: (state) => {
            state.messages = [];
        },
        modifyMessage: (state, action: PayloadAction<{id: string, text: string}>) => {
            state.messages = state.messages.map(message =>
              message.id === action.payload.id ?
                { ...message, text: action.payload.text } : message);
        },
        setIdMessage: (state, action: PayloadAction<{tempId: string, id: string}>) => {
            state.messages = state.messages.map(message =>
              message.tempId === action.payload.tempId ?
                { ...message, id: action.payload.id } : message);
        }
    }
});

export const { addMessage, setMessages, removeMessage, clearMessages, modifyMessage, setIdMessage } = messagesSlice.actions;

export const selectMessages = (state: RootState) => state.messages.messages;

export const messagesReducer = messagesSlice.reducer ;