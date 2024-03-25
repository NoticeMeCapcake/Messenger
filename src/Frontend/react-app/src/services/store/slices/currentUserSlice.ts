import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/services/store/store';

export interface IUserInfo {
    username: string;
    id: string;
    token: string;
}

export interface ICurrentUserState {
    currentUser: IUserInfo;
}

const initialState = {
    currentUser: {
        username: "templateName",
        id: "42",
        token: "templateToken42"
    }
} satisfies ICurrentUserState as ICurrentUserState

export const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<IUserInfo>) => {
            state.currentUser = action.payload;
        }
    }
});

export const { setCurrentUser } = currentUserSlice.actions;

export const selectCurrentUser = (state: RootState) => state.currentUser.currentUser as IUserInfo;

export const currentUserReducer = currentUserSlice.reducer ;