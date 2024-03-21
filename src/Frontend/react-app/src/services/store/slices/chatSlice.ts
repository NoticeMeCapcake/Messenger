import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/services/store/store';

export interface IChatInfo {
    id: string | null;
    users: string[];
    chatName: string;
    type: string;
}

export interface IChatInfoState {
    chats: IChatInfo[]
}

const initialState = {
    chats: [ {
        id: "42",
        users: ["42", "21"],
        chatName: "templateChat",
        type: "private"
    }
    ]
} satisfies IChatInfoState as IChatInfoState

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addChat: (state, action: PayloadAction<IChatInfo>) => {
            state.chats.push(action.payload);
        },
        setChats: (state, action: PayloadAction<IChatInfo[]>) => {
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
    }
});

export const { addChat, setChats, removeChat, clearChats, modifyChat } = chatSlice.actions;

export const selectChats = (state: RootState) => state.chat.chats;

export const chatReducer = chatSlice.reducer ;