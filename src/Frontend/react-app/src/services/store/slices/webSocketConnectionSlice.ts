import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/services/store/store';
import ChatType from '@/dto/ChatType';

export interface IWebSocketConnectionState {
    selectedChatType: ChatType;
}

const initialState = {
    selectedChatType: ChatType.All
} satisfies IWebSocketConnectionState as IWebSocketConnectionState

export const webSocketConnectionSlice = createSlice({
    name: "webSocketConnection",
    initialState,
    reducers: {
        setSelectedChatType: (state, action: PayloadAction<ChatType>) => {
            state.selectedChatType = action.payload;
        },
        unsetSelectedChatType: (state) => {
            state.selectedChatType = "all";
        }
    }
});

export const { setSelectedChatType, unsetSelectedChatType } = selectedChatTypeSlice.actions;

export const selectSelectedChatType = (state: RootState) => state.selectedChatType.selectedChatType as ChatType;

export const selectedChatTypeReducer = selectedChatTypeSlice.reducer ;