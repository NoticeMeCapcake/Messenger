import {createAsyncThunk} from "@reduxjs/toolkit";
import {RequestType} from "@/dto/RequestType";
import IMessageRequest from "@/dto/IMessageRequest";
import {IWebSocketConnectionState} from "@/services/store/slices/webSocketConnectionSlice";
import IMessageResponse from "@/dto/IMessageResponse";
import {NetworkConstants} from "@/networking/NetworkConstants";
import {setIdMessage} from "@/services/store/slices/messagesSlice";
import {ActivationState, CompatClient, Stomp} from "@stomp/stompjs";
import {RootState} from "@/services/store/store";
import SockJS from "sockjs-client";

export const sendMessageViaSocket = createAsyncThunk(
    'websocket/sendMessage',
    async (_, { getState, rejectWithValue, dispatch }) => {
        console.log('GET STATE', getState());
        const state = getState() as RootState;
        // const { socketClient, currentUser } = state;
        const {socketClient } = state.webSocketConnection;
        const currentUser = state.currentUser.currentUser;
        try {
            socketClient.connect({}, () => {
                    console.log('Connected!');
                    alert('Connected!');
                    socketClient.subscribe("/user/" + currentUser.token ?? "" + '/topic/message', (greeting) => {
                        // console.log("Received: " + (JSON.parse(greeting.body) as ).content)
                        alert("Received msg");
                    });
                },
                () => {console.log("Error")}
            );
        } catch (error) {
            return rejectWithValue('can not connect')
        }

    }
)