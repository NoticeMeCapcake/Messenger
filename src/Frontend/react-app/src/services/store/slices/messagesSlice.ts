import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/services/store/store';
import IChatMessage from '@/dto/IChatMessage';
import {sendMessageViaSocket} from "@/services/store/thunks/sendMessageViaSocket";
import {RequestType} from "@/dto/RequestType";
import IMessageRequest from "@/dto/IMessageRequest";

export interface IChatMessageState {
    messages: IChatMessage[]
}

const initialState: IChatMessageState = {
    messages: [
    ]
}

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
        },
        setCreatedTimeMessage: (state, action: PayloadAction<{id: string, createdAt: Date}>) => {
            state.messages = state.messages.map(message =>
                message.id === action.payload.id ?
                    { ...message, createdAt: action.payload.createdAt } : message);
        }
    },
    extraReducers: (builder) => {
        builder //TODO: add loading, error, read and sent states
            .addCase(sendMessageViaSocket.pending, (state, action: PayloadAction<undefined, string, { arg: { message: IMessageRequest; requestType: RequestType; };}>) => {
                // TODO: current message is sending
            })
            .addCase(sendMessageViaSocket.fulfilled, (state, action: PayloadAction<IMessageRequest>) => {
                // TODO: message is successfully loaded
            })
            .addCase(sendMessageViaSocket.rejected, (state, action) => {
                // TODO: Encountered some error
            })
    }
});

export const { addMessage, setMessages, removeMessage, clearMessages, modifyMessage, setIdMessage, setCreatedTimeMessage } = messagesSlice.actions;

export const selectMessages = (state: RootState) => state.messages.messages;

export const messagesReducer = messagesSlice.reducer ;