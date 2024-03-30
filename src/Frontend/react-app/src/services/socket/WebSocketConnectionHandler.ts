import {useAppDispatch, useAppSelector} from "@/services/store/types/hooks";
import IMessageRequest from "@/dto/IMessageRequest";
import {RequestType} from "@/dto/RequestType";
import {selectCurrentUser} from "@/services/store/slices/currentUserSlice";
import {
    connectSocket,
    selectSocketConnection,
    sendMessageViaSocket
} from "@/services/store/slices/webSocketConnectionSlice";
import IMessageResponse from "@/dto/IMessageResponse";
import {setIdMessage} from "@/services/store/slices/messagesSlice";
import {NetworkConstants} from "@/networking/NetworkConstants";
import {StompSubscription} from "@stomp/stompjs";

