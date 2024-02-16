"use client";
import * as React from 'react';
import IChatMessage from "../../dto/IChatMessage";
import {useState} from "react";
import {PersonIcon} from "@radix-ui/react-icons";
import "./style.css"
// import "../dialogues/style.css"
import * as ScrollArea from "@radix-ui/react-scroll-area";

interface IProps {
    messages: IChatMessage[];
}

interface IState {
    senderId: string;
}

const MessageList = ({messages}: IProps) => {
    // const [previousSenderId, setPreviousMessageSenderId] = useState<IState>({senderId: '-1'})
    console.warn(messages.length)

    const tryGetSenderName = (message: IChatMessage, prevSenderId: string | undefined) => {
        console.debug(message.senderId + "     " + prevSenderId + "     " + (message.senderId === prevSenderId));
        return message.senderId === prevSenderId || message.isFromUser ? null : <div> {message.senderId} </div>;
    }


    return (
            <ScrollArea.Root className="ScrollAreaRoot">
                <ScrollArea.Viewport className="ScrollAreaViewport">
                    {messages.map((message, index) =>
                        <div key={message.id} className={"my-2 row justify-content-start"}>

                            <div className={"col-7 row py-2" + (message.isFromUser ? " offset-4" : " offset-1")}>
                                {message.isFromUser ? null :
                                    <div className="">
                                        <PersonIcon/>
                                    </div>}
                                <div className={"text-container py-1" + (message.isFromUser ? " light-bg" : " dark-bg-msg")}>
                                    <small style={{color: "#b436c1"}}>{tryGetSenderName(message, messages[index - 1]?.senderId)}</small>
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