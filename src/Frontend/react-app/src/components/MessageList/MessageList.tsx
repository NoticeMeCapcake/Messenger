"use client"
import * as React from 'react';
import ChatMessage from "../../dto/ChatMessage";

interface Props {
    messages: ChatMessage[];
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