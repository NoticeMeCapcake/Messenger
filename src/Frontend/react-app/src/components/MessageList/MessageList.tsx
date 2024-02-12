"use client"
import * as React from 'react';
import IChatMessage from "../../dto/IChatMessage";
import {number} from "prop-types";
import {useState} from "react";

interface IProps {
    messages: IChatMessage[];
}

const tryGetSenderName = (senderId: string, prevSenderId: string, setter: (val: string) => void) => {
    console.log(senderId + "     " + prevSenderId);
    if (senderId === prevSenderId) {
        setter(senderId);
        return <div>
            {senderId}
        </div>;
    }
    setter(senderId);
}

const MessageList = ({messages}: IProps) => {
    const [previousMessageSenderId, setPreviousMessageSenderId] = useState('-1')
    return (
        <div className="light-bg">
            {messages.map(message => {
                return <div key={message.id} className={(message.isFromUser ? "text-end " : "") + "dark-bg my-2"}>
                    <div>{tryGetSenderName(message.senderId, previousMessageSenderId, setPreviousMessageSenderId)}</div>
                    <div>
                        {message.text}
                    </div>
                </div>;
            })}
        </div>
    )
}

export default MessageList;