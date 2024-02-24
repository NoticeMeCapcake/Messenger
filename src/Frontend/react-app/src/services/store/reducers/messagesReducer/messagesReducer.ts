import { IMessagesState } from '@/services/store/reducers/messagesReducer/types';
import { SET_MESSAGES } from '@/services/store/actions/messagesActions';
import { TMessagesActions } from '@/services/store/types/hooks';

export const initialState: IMessagesState = {messages: [{id: 1, isFromUser: false, senderId: 'templateName', text: 'template'}]};

export const messagesReducer = (state = initialState, action: TMessagesActions): IMessagesState  => {
  switch (action.type) {
    case SET_MESSAGES: {
      return {
        ...state,
        messages: [...state.messages, ...action.payload]
      }
    }
    default:
      return state;
  }
};