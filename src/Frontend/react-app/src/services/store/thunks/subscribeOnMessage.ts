// import {createAsyncThunk} from "@reduxjs/toolkit";
// import {RequestType} from "@/dto/RequestType";
// import IMessageRequest from "@/dto/IMessageRequest";
// import {IWebSocketConnectionState} from "@/services/store/slices/webSocketConnectionSlice";
// import IMessageResponse from "@/dto/IMessageResponse";
// import {NetworkConstants} from "@/networking/NetworkConstants";
// import {setIdMessage} from "@/services/store/slices/messagesSlice";
//
// export const subscribeOnMessage = createAsyncThunk(
//     'websocket/subscribeOnMessage',
//     async ({requestType, message} : {requestType: RequestType, message: IMessageRequest}, { getState, rejectWithValue, dispatch }) => {
//         const state = getState() as IWebSocketConnectionState;
//         const { socketClient, currentUser } = state;
//
//         if (!socketClient || !currentUser) {
//             return rejectWithValue('socket or current user is null');
//         }
//
//         try {
//             const subscription = state?.socketClient?.subscribe(
//                 `user/${state?.currentUser?.id}/topic/message/${message.tempId}`,
//                 (response) => {
//                     const body = JSON.parse(response.body) as IMessageResponse;
//
//                     dispatch(setIdMessage({tempId: body.tempId, id: body.id}));
//
//                     alert("New message id: " + body.id);
//                 }
//             );
//
//             setTimeout(() => {
//                 subscription?.unsubscribe();
//                 //TODO: add error to msg
//             }, NetworkConstants.subTimeout);
//             return message;
//         } catch (error) {
//             return rejectWithValue(`Acquired error while subscribing on message: [${error}]`)
//         }
//     }
// )