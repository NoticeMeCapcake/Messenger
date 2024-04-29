import * as ContextMenu from '@radix-ui/react-context-menu';
import {ReactNode} from "react";
import "./style.css";
import IChatMessage from "@/dto/IChatMessage";
import {useAppDispatch} from "@/services/store/types/hooks";
import IMessageRequest from "@/dto/IMessageRequest";
import {RequestType} from "@/dto/RequestType";
import {IMessage} from "@stomp/stompjs";
import IMessageResponse from "@/dto/IMessageResponse";
import {removeMessage} from "@/services/store/slices/messagesSlice";
import {sendMessageViaSocket} from "@/services/store/thunks/sendMessageViaSocket";

interface IProps {
    messageSlot: ReactNode,
    currentMessage: IChatMessage
}

export const MessageContextMenuContainer = (props : IProps) => {
    const dispatch = useAppDispatch();

    const deleteMsgCallback = (response: IMessage) => {
        const body = JSON.parse(response.body) as IMessageResponse;

        alert("Deleted message id: " + body.id);

        dispatch(removeMessage(body.id));
    }

    return <ContextMenu.Root>
        <ContextMenu.Trigger>
            {props.messageSlot}
        </ContextMenu.Trigger>
        <ContextMenu.Portal>
            <ContextMenu.Content className="ContextMenuContent">
                <ContextMenu.Item className="ContextMenuItem">
                    Select
                </ContextMenu.Item>
                <ContextMenu.Item className="ContextMenuItem" onClick={() => {
                    const messageRequest = {id: props.currentMessage.id, action: RequestType.Delete} as IMessageRequest;
                    dispatch(sendMessageViaSocket({callback: deleteMsgCallback, message: messageRequest}))
                }}>
                    Delete
                </ContextMenu.Item>
                <ContextMenu.Item className="ContextMenuItem">
                    Reload
                </ContextMenu.Item>
            </ContextMenu.Content>
        </ContextMenu.Portal>
    </ContextMenu.Root>
}