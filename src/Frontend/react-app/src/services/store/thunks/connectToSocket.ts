import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "@/services/store/store";
import {INotificationDto} from "@/dto/INotificationDto";

export const connectToSocket = createAsyncThunk(
    'websocket/connectToSocket',
    async (_, { getState, rejectWithValue, dispatch }) => {
        console.log('GET STATE', getState());
        const state = getState() as RootState;
        const {socketClient } = state.webSocketConnection;
        try {
            socketClient.connect({}, () => {
                    console.log('Connected!');
                    alert('Connected!');
                    // manage notifications
                    socketClient.subscribe("/user/queue/notification", (notificationMessage) => {
                        const notification = JSON.parse(notificationMessage.body) as INotificationDto;
                        alert("Received notification: " + notification);
                    });
                },
                () => {alert("Error")}
            );
        } catch (error) {
            alert("Can not connect");
            return rejectWithValue('can not connect')
        }

    }
)