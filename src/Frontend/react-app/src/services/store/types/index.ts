import { ISetMessage } from '@/services/store/actionCreators/messagesActionCreator';

export type TMessagesActions = ISetMessage;


import { store } from '@/services/store/store';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from "react-redux";

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions = TMessagesActions;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch>()