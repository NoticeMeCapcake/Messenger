'use client'

import {useState} from "react";

interface IProps {
    initialText: string,
    sendMessage:  (text: string) => void
}


export const SendMessageForm = (props: IProps) => {
    const [text, setText] = useState(props.initialText);
    return (
        <form
            className="send-message-form"
            onSubmit={event => {
                event.preventDefault();
                props.sendMessage(text);
                setText("")
            }}>
            <input style={{width: 500}}
                onChange={event => setText(event.target.value)}
                value={text}
                placeholder="Type your message and hit ENTER"
                type="text" />
        </form>
    )
}