import * as ContextMenu from '@radix-ui/react-context-menu';
import {ReactNode} from "react";
import "./style.css";
import IChatMessage from "@/dto/IChatMessage";

interface IProps {
    messageSlot: ReactNode,
    currentMessage: IChatMessage
}

export const MessageContextMenuContainer = (props : IProps) => {
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