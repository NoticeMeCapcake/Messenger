import {createAsyncThunk} from "@reduxjs/toolkit";
import {RequestType} from "@/dto/RequestType";
import IMessageRequest from "@/dto/IMessageRequest";
import {IWebSocketConnectionState} from "@/services/store/slices/webSocketConnectionSlice";
import IMessageResponse from "@/dto/IMessageResponse";
import {NetworkConstants} from "@/networking/NetworkConstants";
import {setIdMessage} from "@/services/store/slices/messagesSlice";
import {CompatClient} from "@stomp/stompjs";
import {RootState} from "@/services/store/store";

export const sendMessageViaSocket = createAsyncThunk(
    'websocket/sendMessage',
    async ({requestType, message} : {requestType: RequestType, message: IMessageRequest}, { getState, rejectWithValue, dispatch }) => {
        console.log('GET STATE', getState());
        const state = getState() as RootState;
        // const { socketClient, currentUser } = state;
        const {socketClient } = state.webSocketConnection;
        const currentUser = state.currentUser.currentUser;

        console.log("Before check: " + socketClient, 'USER', currentUser)
        if (!socketClient || !currentUser) {
            return rejectWithValue('socket or current user is null');
        }
        console.log("After check")


        try {
            socketClient.send(
                `/app/message/${requestType}`,
                {},
                JSON.stringify(message)
            );
            const subscription = socketClient.subscribe(
                `/user/${currentUser.id}/queue/message/${message.tempId}`,
                (response) => {
                    const body = JSON.parse(response.body) as IMessageResponse;

                    dispatch(setIdMessage({tempId: body.tempId, id: body.id}));

                    alert("New message id: " + body.id);
                }
            );

            setTimeout(() => {
                subscription.unsubscribe();
                //TODO: add error to msg
            }, NetworkConstants.subTimeout);
            return message;
        } catch (error) {
            return rejectWithValue(`Acquired error while sending message: [${error}]`)
        }
    }
)