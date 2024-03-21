import { configureStore } from '@reduxjs/toolkit';
import { messagesReducer } from '@/services/store/slices/messagesSlice';
import { chatReducer } from '@/services/store/slices/chatSlice';

export const store = configureStore({
    reducer: {
        messages: messagesReducer,
        chat: chatReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
