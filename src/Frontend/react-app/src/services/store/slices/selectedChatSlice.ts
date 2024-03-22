import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/services/store/store';
import { IChatInfo } from '@/services/store/slices/chatSlice';

export interface ISelectedChatState {
    selectedChat: IChatInfo | null;
}

const initialState = {
    selectedChat: {
        id: "42",
        users: ["42", "21"],
        chatName: "templateChat",
        type: "private"
    }
} satisfies ISelectedChatState as ISelectedChatState

export const selectedChatSlice = createSlice({
    name: "selectedChat",
    initialState,
    reducers: {
        setSelectedChat: (state, action: PayloadAction<IChatInfo>) => {
            state.selectedChat = action.payload;
        },
        unsetSelectedChat: (state) => {
            state.chats = null;
        }
    }
});

export const { setSelectedChat, unsetSelectedChat } = selectedChatSlice.actions;

export const selectSelectedChat = (state: RootState) => state.selectedChat.selectedChat as IChatInfo | null;

export const selectedChatReducer = selectedChatSlice.reducer ;