import { configureStore } from '@reduxjs/toolkit';
import { messagesReducer } from '@/services/store/slices/messagesSlice';
import { chatReducer } from '@/services/store/slices/chatSlice';
import { selectedChatTypeReducer } from '@/services/store/slices/SelectedChatTypeSlice';
import { selectedChatReducer } from '@/services/store/slices/selectedChatSlice';

export const store = configureStore({
    reducer: {
        messages: messagesReducer,
        chat: chatReducer,
        selectedChatType: selectedChatTypeReducer,
        selectedChat: selectedChatReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
