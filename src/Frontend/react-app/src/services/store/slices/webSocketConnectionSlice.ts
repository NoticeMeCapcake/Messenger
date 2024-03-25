import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/services/store/store';
import ChatType from '@/dto/ChatType';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp, StompSubscription } from '@stomp/stompjs';
import { useAppDispatch, useAppSelector } from '@/services/store/types/hooks';
import { selectCurrentUser } from '@/services/store/slices/currentUserSlice';
import IMessageRequest from '@/dto/IMessageRequest';
import { RequestType } from '@/dto/RequestType';
import { NetworkConstants } from '@/networking/NetworkConstants';

const currentUser = useAppSelector(selectCurrentUser)
const dispatch = useAppDispatch();

const sockJs = new SockJS("http://localhost:8080/ws-messenger-api")
const stompClient = Stomp.over(sockJs);
//TODO: make a cool callback function onConnect to parse responses for message read state etc.
stompClient.connect({}, () => {
      console.log('Connected!');
      stompClient.subscribe("/user/" + currentUser.token + '/topic/message', (greeting) => {
          console.log("Received: " + JSON.parse(greeting.body).content)
          alert(JSON.parse(greeting.body).content);
      });
  },
  () => {console.log("Error")}
);

const unsubscribe = (subscription: StompSubscription) => {
    subscription.unsubscribe();
}

export interface IWebSocketConnectionState {
    socketClient: CompatClient;
    socketSubscriptions: StompSubscription[];
}

const initialState = {
    socketClient: stompClient
} satisfies IWebSocketConnectionState as IWebSocketConnectionState

export const webSocketConnectionSlice = createSlice({
    name: "webSocketConnection",
    initialState,
    reducers: {
        sendMessageViaSocket: (state, action: PayloadAction<{message: IMessageRequest; requestType: RequestType;}>) => {
            state.socketClient.send(
              `/app/message/${action.payload.requestType}`,
              {},
              JSON.stringify(action.payload.message)
            );
            const subscription = state.socketClient.subscribe(
              `/topic/message/${currentUser.id}/${action.payload.message.tempId}`,
              (response) => {
                  const body = JSON.parse(response.body);

                  dispatch(setIdMessage(body.tempMessageId, body.messageId))

                  alert("New message id: " + body.messageId);
              }
            );
            
            setTimeout(() => {
                unsubscribe(subscription);
                //TODO: add error to msg
            }, NetworkConstants.subTimeout)
        },
        sendChatViaSocket: (state, action: PayloadAction<{message: ; requestType: RequestType;}>) => {
            state.socketClient.send(
              `/app/chat/${action.payload.requestType}`,
              {},
              JSON.stringify(action.payload.message)
            );
        }
    }
});

export const { setSelectedChatType, unsetSelectedChatType } = selectedChatTypeSlice.actions;

export const selectSelectedChatType = (state: RootState) => state.selectedChatType.selectedChatType as ChatType;

export const selectedChatTypeReducer = selectedChatTypeSlice.reducer ;