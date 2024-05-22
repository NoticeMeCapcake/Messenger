import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/services/store/store';
import ChatType from '@/dto/ChatType';
import {sendMessageViaSocket} from "@/services/store/thunks/sendMessageViaSocket";
import IMessageRequest from "@/dto/IMessageRequest";
import {sendChatViaSocket} from "@/services/store/thunks/sendChatViaSocket";

export interface IChatInfo {
    id: string;
    usersIds: string[];
    chatName: string;
    type: ChatType;
}

export interface IChatInfoState {
    chats: IChatInfo[]
}

const initialState = {
    chats: [ {
        id: "42",
        usersIds: ["42", "21"],
        chatName: "templateChat",
        type: ChatType.personal
    }, {
        id: "43",
        usersIds: ["42", "22", "21"],
        chatName: "templateChat2",
        type: ChatType.group
    } ]
} satisfies IChatInfoState as IChatInfoState

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addChat: (state, action: PayloadAction<IChatInfo>) => {
            state.chats.push(action.payload);
        },
        setChats: (state, action: PayloadAction<IChatInfo[]>) => {
            console.log("set Chats, " + JSON.stringify(action.payload))
            state.chats = action.payload;
        },
        removeChat: (state, action: PayloadAction<string>) => { // remove by id
            state.chats = state.chats.filter(chat => chat.id !== action.payload);
        },
        clearChats: (state) => {
            state.chats = [];
        },
        modifyChat: (state, action: PayloadAction<{id: string, chatName: string}>) => {
            state.chats = state.chats.map(chat =>
              chat.id === action.payload.id ?
                { ...chat, chatName: action.payload.chatName } : chat);
        }
    },
    extraReducers: (builder) => {
        builder //TODO: add loading, error, read and sent states
            .addCase(sendChatViaSocket.fulfilled, (state, action: PayloadAction<IMessageRequest>) => {
                // TODO: message is successfully loaded
            })
            .addCase(sendChatViaSocket.rejected, (state, action) => {
                // TODO: Encountered some error
            })
    }
});

export const { addChat, setChats, removeChat, clearChats, modifyChat } = chatSlice.actions;

export const selectChats = (state: RootState) => state.chat.chats as IChatInfo[];

export const chatReducer = chatSlice.reducer ;