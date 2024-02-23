import { combineReducers } from 'redux';
import { messagesReducer } from '@/services/store/reducers/messagesReducer/messagesReducer';

export const rootReducer = combineReducers({messages: messagesReducer});