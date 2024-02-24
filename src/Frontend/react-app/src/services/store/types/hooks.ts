import { ISetMessage } from '@/services/store/actionCreators/messagesActionCreator';

export type TMessagesActions = ISetMessage;

import {
  TypedUseSelectorHook,
  useDispatch, useSelector
} from 'react-redux';
import { AppDispatch, RootState } from '@/services/store/store';

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector