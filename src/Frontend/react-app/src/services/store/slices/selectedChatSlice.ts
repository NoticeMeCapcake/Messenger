import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '@/services/store/store';
import {IChatInfo} from '@/services/store/slices/chatSlice';
import ChatType from "@/dto/ChatType";

export interface ISelectedChatState {
    selectedChat: IChatInfo | null;
}

const initialState = {
    selectedChat: {
        id: null,
        users: [],
        chatName: "",
        type: ChatType.personal
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
            state.selectedChat = null;
        }
    }
});

export const { setSelectedChat, unsetSelectedChat } = selectedChatSlice.actions;

export const selectSelectedChat = (state: RootState) => state.selectedChat.selectedChat as IChatInfo;

export const selectedChatReducer = selectedChatSlice.reducer ;