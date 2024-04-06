import {createAsyncThunk} from "@reduxjs/toolkit";
import {RequestType} from "@/dto/RequestType";
import IMessageRequest from "@/dto/IMessageRequest";
import IMessageResponse from "@/dto/IMessageResponse";
import {NetworkConstants} from "@/networking/NetworkConstants";
import {removeMessage, setCreatedTimeMessage, setIdMessage} from "@/services/store/slices/messagesSlice";
import {RootState} from "@/services/store/store";

export const sendDeleteMessage = createAsyncThunk(
    'websocket/deleteMessage',
    async ({requestType, message} : {requestType: RequestType, message: IMessageRequest}, { getState, rejectWithValue, dispatch }) => {
        console.log('GET STATE', getState());
        const state = getState() as RootState;
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
                `/user/queue/message/delete${message.id}`,
                (response) => {
                    const body = JSON.parse(response.body) as IMessageResponse;

                    alert("Deleted message id: " + body.id);

                    dispatch(removeMessage(body.id));
                    subscription.unsubscribe();
                }
            );

            setTimeout(() => {
                subscription.unsubscribe();
            }, NetworkConstants.subTimeout);
            return message;
        } catch (error) {
            return rejectWithValue(`Acquired error while sending message: [${error}]`)
        }
    }
)