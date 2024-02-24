"use client";
import * as React from 'react';
// import IChatMessage from "../../dto/IChatMessage";
import { FC, MutableRefObject, useEffect, useState } from 'react';
import {PersonIcon} from "@radix-ui/react-icons";
import "./style.css"
// import "../dialogues/style.css"
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useAppSelector } from '@/services/store/types/hooks';
import { IChatMessage, selectMessages } from '@/services/store/slices/messagesSlice';

interface IProps {
    scrollAreaRef: MutableRefObject<HTMLDivElement | null>
}

const MessageList: FC<IProps> = ({scrollAreaRef}) => {
    const messages = useAppSelector(selectMessages);

    useEffect(() => {
        console.log("RERENDER");
    }, [])

    console.log("msg list render")
    console.warn(messages.length)

    const tryGetSenderName = (message: IChatMessage, prevSenderId: string | undefined) => {
        console.debug(message.senderName + "     " + prevSenderId + "     " + (message.senderName === prevSenderId));
        return message.senderName === prevSenderId || message.isFromUser ? null : <small style={{color: "#b436c1"}}> {message.senderName} </small>;
    }


    return (
            <ScrollArea.Root className="ScrollAreaRoot">
                <ScrollArea.Viewport ref={scrollAreaRef} className="ScrollAreaViewport">
                    {messages.map((message, index) =>
                        <div key={message.id} className={"my-2 row justify-content-start"}>

                            <div className={"col-7 row py-2" + (message.isFromUser ? " offset-4" : " offset-1")}>
                                {message.isFromUser ? null :
                                    <div className="col-auto">
                                        <PersonIcon/>
                                    </div>}
                                <div className={"text-container py-1" + (message.isFromUser ? " light-bg" : " dark-bg-msg")}>
                                    {tryGetSenderName(message, messages[index - 1]?.senderName)}
                                    <div>{message.text}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
                    <ScrollArea.Thumb className="ScrollAreaThumb"/>
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner className="ScrollAreaCorner"/>
            </ScrollArea.Root>
    )
}

export default MessageList;