import { SET_MESSAGES } from '@/services/store/actions/messagesActions';
import { IChatMessage } from '@/services/store/reducers/messagesReducer/types';

export interface ISetMessage {
  readonly type: typeof SET_MESSAGES;
  readonly payload: IChatMessage[];
}

