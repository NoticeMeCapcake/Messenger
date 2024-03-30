import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '@/services/store/store';
import SockJS from 'sockjs-client';
import {ActivationState, CompatClient, Stomp, StompSubscription} from '@stomp/stompjs';
import {IUserInfo} from '@/services/store/slices/currentUserSlice';
import IMessageRequest from '@/dto/IMessageRequest';
import {RequestType} from '@/dto/RequestType';
import IChatRequest from "@/dto/IChatRequest";

//TODO: make a cool callback function onConnect to parse responses for message read state etc.

const isSocketConnected = (socketState: ActivationState) => socketState === ActivationState.ACTIVE;

export interface IWebSocketConnectionState {
    socketClient: CompatClient | null;
    socketSubscriptions: StompSubscription[];
    currentUser: IUserInfo | null;
}

const initialState = {
    socketClient: null,
    socketSubscriptions: [] as StompSubscription[],
    currentUser: null
} satisfies IWebSocketConnectionState as IWebSocketConnectionState

export const webSocketConnectionSlice = createSlice({
    name: "webSocketConnection",
    initialState,
    reducers: {
        connectSocket: (state, action: PayloadAction<{user: IUserInfo}>) => {
            if (isSocketConnected(state?.socketClient?.state ?? ActivationState.INACTIVE)) {
                alert("socket already connected");
                return;
            }
            state.currentUser = action.payload.user;

            const sockJs = new SockJS("http://localhost:8080/ws-messenger-api");
            const stompClient = Stomp.over(sockJs);

            state.socketClient = stompClient;

            state.socketClient.connect({}, () => {
                    console.log('Connected!');
                    alert('Connected!');
                    stompClient.subscribe("/user/" + state.currentUser?.token ?? "" + '/topic/message', (greeting) => {
                        // console.log("Received: " + (JSON.parse(greeting.body) as ).content)
                        alert("Received msg");
                    });
                },
                () => {console.log("Error")}
            );
        },
        sendMessageViaSocket: (state, action: PayloadAction<{message: IMessageRequest; requestType: RequestType;}>) => {
            if (!isSocketConnected(state?.socketClient?.state ?? ActivationState.INACTIVE) || state.currentUser === null) {
                alert("Connection lost, refresh the page.")
                return;
            }

            state?.socketClient?.send(
              `/app/message/${action.payload.requestType}`,
              {},
              JSON.stringify(action.payload.message)
            ) ?? alert("socket is null"); // P.S. смотреть сюда и в AppLayout, где вызывается этот редьсер. И, да, тут пробрасывается алерт
        },
        sendChatViaSocket: (state, action: PayloadAction<{message: IChatRequest; requestType: RequestType;}>) => {
            state?.socketClient?.send(
              `/app/chat/${action.payload.requestType}`,
              {},
              JSON.stringify(action.payload.message)
            );
        }
    }
});

export const { connectSocket, sendMessageViaSocket, sendChatViaSocket } = webSocketConnectionSlice.actions;

export const selectSocketConnection = (state: RootState) => state.webSocketConnection as IWebSocketConnectionState;

export const webSocketConnectionReducer = webSocketConnectionSlice.reducer ;