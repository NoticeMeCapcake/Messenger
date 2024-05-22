import {RequestType} from "@/dto/RequestType";
import {IMessage} from "@stomp/stompjs";
import IMessageResponse from "@/dto/IMessageResponse";
import {setMessages} from "@/services/store/slices/messagesSlice";
import IChatMessage from "@/dto/IChatMessage";
import {NetworkConstants} from "@/networking/NetworkConstants";
import {UnknownAction} from "redux";
import {ThunkDispatch} from "redux-thunk";


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

export const resolveMessageCallbackByRequestType = (requestType: RequestType, dispatch: ThunkDispatch<any, undefined, UnknownAction>) => {
    switch (requestType) {
        case RequestType.Create:
            return (response: IMessage) => {};
        case RequestType.Delete:
            return (response: IMessage) => {};
        case RequestType.Get:
            return (response: IMessage) => {};
        case RequestType.GetAll:
            return (response: IMessage) => {
                const body = JSON.parse(response.body) as IMessageResponse[];

                alert("Got messages " + body.length);

                dispatch(setMessages(convertResponseToMessages(body)));
            };
        case RequestType.Update:
            return (response: IMessage) => {};
    }
}