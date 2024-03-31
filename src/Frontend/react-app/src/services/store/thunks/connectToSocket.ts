import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "@/services/store/store";

export const connectToSocket = createAsyncThunk(
    'websocket/connectToSocket',
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