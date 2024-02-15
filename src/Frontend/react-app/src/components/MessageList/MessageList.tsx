"use client";
import * as React from 'react';
import IChatMessage from "../../dto/IChatMessage";
import {useState} from "react";
import {PersonIcon} from "@radix-ui/react-icons";

interface IProps {
    messages: IChatMessage[];
}

const tryGetSenderName = (senderId: string, prevSenderId: IState) => {
    console.log(senderId + "     " + prevSenderId);
    if (senderId === prevSenderId.senderId) {
        return <div>
            {senderId}
        </div>;
    }
    prevSenderId.senderId = senderId
    return <div/>
}

interface IState {
    senderId: string;
}

const MessageList = ({messages}: IProps) => {
    const [previousSenderId, setPreviousMessageSenderId] = useState<IState>({senderId: '-1'})
    console.warn(messages.length)
    return (
        <div className="light-bg">
            {messages.map(message => {
                return <div key={message.id} className={(message.isFromUser ? "text-end " : "") + "dark-bg my-2 row justify-content-start"}>
                    <div className="col-auto">
                        <PersonIcon/>
                    </div>
                    <div className="col-10">
                        <div>{message.senderId}</div>
                        <div>{message.text}</div>
                    </div>
                </div>;
            })}
        </div>
    )
}

export default MessageList;