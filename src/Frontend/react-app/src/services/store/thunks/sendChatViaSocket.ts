import {createAsyncThunk} from "@reduxjs/toolkit";
import {RequestType} from "@/dto/RequestType";
import {NetworkConstants} from "@/networking/NetworkConstants";
import {RootState} from "@/services/store/store";
import {IMessage} from "@stomp/stompjs";
import IChatRequest from "@/dto/IChatRequest";


export const sendChatViaSocket = createAsyncThunk(
    'websocket/SendChat',
    async ({message, callback, timeoutCallback} : {message: IChatRequest , callback: (response: IMessage) => void, timeoutCallback?: (state: RootState, arg: any) => void}, { getState, rejectWithValue, dispatch }) => {
        console.log('GET STATE', getState());
        const state = getState() as RootState;
        const {socketClient } = state.webSocketConnection;
        const currentUser = state.currentUser.currentUser;

        console.log("Before check: " + socketClient, 'USER', currentUser)
        if (!socketClient) {
            return rejectWithValue('socket or current user is null');
        }
        console.log("After check")

        try {
            socketClient.send(
                `/app/chat`,
                {},
                JSON.stringify(message)
            );
            const subscription = socketClient.subscribe(
                `/user/queue/chat${message.action === RequestType.Create
                    ? message.tempId
                    : message.action === RequestType.GetAll
                        ? "/all" + message.userId
                        : message.id}`,
                (response) => {
                    callback(response);

                    subscription.unsubscribe();
                }
            );

            setTimeout(() => {
                subscription.unsubscribe();
                if (timeoutCallback !== undefined) {
                    timeoutCallback(getState() as RootState, message);
                }
            }, NetworkConstants.subTimeout);
            return message;
        } catch (error) {
            return rejectWithValue(`Acquired error while sending message: [${error}]`)
        }
    }
)