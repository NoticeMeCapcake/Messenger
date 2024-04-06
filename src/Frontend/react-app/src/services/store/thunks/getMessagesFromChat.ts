'use client'
import {createAsyncThunk} from "@reduxjs/toolkit";
import {RequestType} from "@/dto/RequestType";
import IMessageRequest from "@/dto/IMessageRequest";
import IMessageResponse from "@/dto/IMessageResponse";
import {NetworkConstants} from "@/networking/NetworkConstants";
import {setCreatedTimeMessage, setIdMessage, setMessages} from "@/services/store/slices/messagesSlice";
import {RootState} from "@/services/store/store";
import IChatMessage from "@/dto/IChatMessage";

// const convertSecondsToTime = (seconds: number) => {
//     return new Date((seconds + NetworkConstants.timeZoneOffsetInSeconds) * 1000);
// }

const convertResponseToMessages = (response: IMessageResponse[]) => {
    const messages = [] as IChatMessage[];
    response.map(message => {
        const convertedMessage = {
            id: message.id,
            senderId: message.userId,
            chatId: message.chatId,
            createdAt: new Date((message.createdAt + NetworkConstants.timeZoneOffsetInSeconds) * 1000),
            text: message.text,
            senderName: "Template"
        } as IChatMessage;
        messages.push(convertedMessage);
    });
    return messages
}

export const getMessagesFromChat = createAsyncThunk(
    'websocket/getAllMessages',  // in message should be set senderId and chatId
    async ({requestType, message} : {requestType: RequestType, message: IMessageRequest}, { getState, rejectWithValue, dispatch }) => {
        const state = getState() as RootState;
        const {socketClient } = state.webSocketConnection;
        const currentUser = state.currentUser.currentUser;
        console.log("Before check get")

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
                `/user/queue/message/all${message.chatId}`,
                (response) => {
                    const body = JSON.parse(response.body) as IMessageResponse[];

                    alert("Got messages " + body.length);

                    dispatch(setMessages(convertResponseToMessages(body)));

                    subscription.unsubscribe();
                }
            );

            setTimeout(() => {
                subscription.unsubscribe();
            }, NetworkConstants.subTimeout);
            return message;
        } catch (error) {
            return rejectWithValue(`Acquired error while fetching messages: [${error}]`)
        }
    }
)