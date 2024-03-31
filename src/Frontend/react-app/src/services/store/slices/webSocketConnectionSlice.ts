import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '@/services/store/store';
import SockJS from 'sockjs-client';
import {ActivationState, CompatClient, Stomp, StompSubscription} from '@stomp/stompjs';
import {IUserInfo} from '@/services/store/slices/currentUserSlice';
import IMessageRequest from '@/dto/IMessageRequest';
import {RequestType} from '@/dto/RequestType';
import IChatRequest from "@/dto/IChatRequest";
import {sendMessageViaSocket} from "@/services/store/thunks/sendMessageViaSocket";
import IMessageResponse from "@/dto/IMessageResponse";
import {setIdMessage} from "@/services/store/slices/messagesSlice";
import {NetworkConstants} from "@/networking/NetworkConstants";

//TODO: make a cool callback function onConnect to parse responses for message read state etc.

const isSocketConnected = (socketState: ActivationState) => socketState === ActivationState.ACTIVE;

const sockJs = new SockJS("http://localhost:8080/ws-messenger-api");
const stompClient = Stomp.over(sockJs);

export interface IWebSocketConnectionState {
    socketClient: CompatClient;
    socketSubscriptions: StompSubscription[];
    currentUser: IUserInfo | null;
}

const initialState: IWebSocketConnectionState = {
    socketClient: stompClient,
    socketSubscriptions: [] as StompSubscription[],
    currentUser: null
}

export const webSocketConnectionSlice = createSlice({
    name: "webSocketConnection",
    initialState,
    reducers: {
        // connectSocket: (state, action: PayloadAction<{user: IUserInfo}>) => {
        //     if (isSocketConnected(state?.socketClient?.state ?? ActivationState.INACTIVE)) {
        //         alert("socket already connected");
        //         return;
        //     }
        //     state.currentUser = action.payload.user;
        //
        //     const sockJs = new SockJS("http://localhost:8080/ws-messenger-api");
        //     const stompClient = Stomp.over(sockJs);
        //
        //     state.socketClient = stompClient;
        //
        //     state.socketClient.connect({}, () => {
        //             console.log('Connected!');
        //             alert('Connected!');
        //             stompClient.subscribe("/user/" + state.currentUser?.token ?? "" + '/topic/message', (greeting) => {
        //                 console.log("Received: " + (JSON.parse(greeting.body) as ).content)
                        // alert("Received msg");
                    // });
                // },
                // () => {console.log("Error")}
            // );
        // },
        // sendMessageViaSocket: (state, action: PayloadAction<{message: IMessageRequest; requestType: RequestType;}>) => {
        //     if (!isSocketConnected(state?.socketClient?.state ?? ActivationState.INACTIVE) || state.currentUser === null) {
        //         alert("Connection lost, refresh the page.")
        //         return;
        //     }
        //
        //     state?.socketClient?.send(
        //       `/app/message/${action.payload.requestType}`,
        //       {},
        //       JSON.stringify(action.payload.message)
        //     ) ?? alert("socket is null"); // P.S. смотреть сюда и в AppLayout, где вызывается этот редьсер. И, да, тут пробрасывается алерт
        // },
        sendChatViaSocket: (state, action: PayloadAction<{message: IChatRequest; requestType: RequestType;}>) => {
            state?.socketClient?.send(
              `/app/chat/${action.payload.requestType}`,
              {},
              JSON.stringify(action.payload.message)
            );
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessageViaSocket.pending, (state, action) => {
                // TODO: current message is sending
            })
            .addCase(sendMessageViaSocket.fulfilled, (state, action: PayloadAction<IMessageRequest>) => {

            })
            .addCase(sendMessageViaSocket.rejected, (state, action) => {
                // TODO: Encountered some error
            })
    }
});

export const { sendChatViaSocket } = webSocketConnectionSlice.actions;

export const selectSocketConnection = (state: RootState) => state.webSocketConnection as IWebSocketConnectionState;

export const webSocketConnectionReducer = webSocketConnectionSlice.reducer ;