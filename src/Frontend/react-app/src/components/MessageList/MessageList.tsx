"use client"
import * as React from 'react';
import IChatMessage from "../../dto/IChatMessage";

interface Props {
    messages: IChatMessage[];
}

const MessageList  = ({messages}: Props) => {
    return (
        <ul className="message-list">
            {messages.map(message => {
                return (
                    <li key={message.id}>
                        <div>
                            {message.senderId}
                        </div>
                        <div>
                            {message.text}
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default MessageList;