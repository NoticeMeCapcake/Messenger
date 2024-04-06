"use client";
import * as React from 'react';
import { FC, MutableRefObject, useEffect, useState } from 'react';
import {PersonIcon} from "@radix-ui/react-icons";
import "./style.css"
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useAppSelector } from '@/services/store/types/hooks';
import {selectMessages } from '@/services/store/slices/messagesSlice';
import {selectCurrentUser} from "@/services/store/slices/currentUserSlice";
import IChatMessage from "@/dto/IChatMessage";
import {selectSelectedChat} from "@/services/store/slices/selectedChatSlice";
import {MessageContextMenuContainer} from "@/components/ContextMenuContainer/MessageContextMenuContainer";

interface IProps {
    scrollAreaRef: MutableRefObject<HTMLDivElement | null>;
    scrollMessageListToBottom: () => void;
}

const MessageList: FC<IProps> = ({scrollAreaRef, scrollMessageListToBottom}) => {
    const messages = useAppSelector(selectMessages);
    const currentUser = useAppSelector(selectCurrentUser);
    const selectedChat = useAppSelector(selectSelectedChat);

    useEffect(() => {
        // console.log("RERENDER");
        console.log('message selector', messages);
        if (messages[messages.length - 1]?.senderId === currentUser.id) {
            scrollMessageListToBottom();
        }
    }, [messages])


    const tryGetSenderName = (message: IChatMessage, prevSenderId: string | undefined, isFromUser: boolean) => {
        console.debug(message.senderName + "     " + prevSenderId + "     " + (message.id === prevSenderId));
        return message.senderId === prevSenderId || isFromUser ? null : <small style={{color: "#b436c1"}}> {message.senderName} </small>;
    }


    return (
            <ScrollArea.Root className="ScrollAreaRoot">
                <ScrollArea.Viewport ref={scrollAreaRef} className="ScrollAreaViewport">
                    {
                        selectedChat.id
                            ? messages.map((message, index) => {
                                    const isFromCurrentUser = message.senderId === currentUser.id;
                                    return(<MessageContextMenuContainer messageSlot={<div key={message.id}
                                                                                                className={"my-2 row justify-content-start"}>
                                            <div
                                                className={"col-7 row pt-2" + (isFromCurrentUser ? " offset-4" : " offset-1")}>
                                                {isFromCurrentUser ? null :
                                                    <div className="col-auto">
                                                        <PersonIcon/>
                                                    </div>}
                                                <div
                                                    className={"text-container py-1" + (isFromCurrentUser ? " light-bg" : " dark-bg-msg")}>
                                                    {tryGetSenderName(message, messages[index - 1]?.senderId, isFromCurrentUser)}
                                                    <div>{message.text}</div>
                                                </div>
                                                <div className="text-container text-end"
                                                     style={{color: "#b8b8b8", fontSize: 12}}>
                                                    {message.createdAt?.getHours() + ":" + message.createdAt?.getMinutes()}
                                                </div>

                                            </div>
                                        </div>}/>
                                    )
                                }
                            )
                            : <div>
                                Create or select the chat
                            </div>
                    }
</ScrollArea.Viewport>
<ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
    <ScrollArea.Thumb className="ScrollAreaThumb"/>
</ScrollArea.Scrollbar>
<ScrollArea.Corner className="ScrollAreaCorner"/>
</ScrollArea.Root>
)
}

export default MessageList;