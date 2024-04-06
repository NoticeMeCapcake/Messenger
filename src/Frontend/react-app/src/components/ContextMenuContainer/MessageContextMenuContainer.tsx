import * as ContextMenu from '@radix-ui/react-context-menu';
import {ReactNode} from "react";
import "./style.css";
import IChatMessage from "@/dto/IChatMessage";
import {useAppDispatch} from "@/services/store/types/hooks";
import IMessageRequest from "@/dto/IMessageRequest";
import {sendDeleteMessage} from "@/services/store/thunks/sendDeleteMessage";
import {RequestType} from "@/dto/RequestType";

interface IProps {
    messageSlot: ReactNode,
    currentMessage: IChatMessage
}

export const MessageContextMenuContainer = (props : IProps) => {
    const dispatch = useAppDispatch();
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
                    const messageRequest = {id: props.currentMessage.id} as IMessageRequest;
                    dispatch(sendDeleteMessage({requestType: RequestType.Delete, message: messageRequest}))
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