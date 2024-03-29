import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/services/store/store';
import ChatType from '@/dto/ChatType';

export interface ISelectedChatTypeInfoState {
    selectedChatType: ChatType;
}

const initialState = {
    selectedChatType: ChatType.All
} satisfies ISelectedChatTypeInfoState as ISelectedChatTypeInfoState

export const selectedChatTypeSlice = createSlice({
    name: "selectedChatType",
    initialState,
    reducers: {
        setSelectedChatType: (state, action: PayloadAction<ChatType>) => {
            state.selectedChatType = action.payload;
        },
        unsetSelectedChatType: (state) => {
            state.selectedChatType = ChatType.All;
        }
    }
});

export const { setSelectedChatType, unsetSelectedChatType } = selectedChatTypeSlice.actions;

export const selectSelectedChatType = (state: RootState) => state.selectedChatType.selectedChatType as ChatType;

export const selectedChatTypeReducer = selectedChatTypeSlice.reducer ;