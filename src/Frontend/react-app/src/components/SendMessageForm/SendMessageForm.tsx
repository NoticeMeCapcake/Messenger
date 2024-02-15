'use client'

import {FormEvent, ReactNode, useState} from "react";
import {FaceIcon, FilePlusIcon, PaperPlaneIcon} from "@radix-ui/react-icons"
import "./style.css";
import Tooltip from "@/components/Tooltip/Tooltip";


interface IProps {
    initialText: string,
    sendMessage:  (text: string) => void
}

function auto_height(event: FormEvent<HTMLTextAreaElement>) {
    console.log(event.currentTarget.scrollHeight);
    event.currentTarget.style.height = '1px';
    event.currentTarget.style.height = event.currentTarget.scrollHeight + 'px';
}

export const SendMessageForm = (props: IProps) => {
    const [text, setText] = useState(props.initialText);
    return (
        <form
            className="send-message-form"
            onSubmit={event => {
                event.preventDefault();
                if (text === "") {
                    return
                }
                props.sendMessage(text);
                setText("")
            }}>
            <div className="row justify-content-center align-items-center my-2 ">
                <div className="text-window col-10 row align-items-center py-1">
                    <div className="col-auto px-0 align-self-end">
                        <Tooltip trigger={<button className="submit-msg">
                            <FilePlusIcon className="custom-icon"/>
                        </button>} text={"Pin File"}/>

                    </div>
                    <div className="col-auto px-0 align-self-end">
                        <button className="submit-msg">
                            <FaceIcon className="custom-icon"/>
                        </button>
                    </div>
                    <div className="col-11 row align-items-center">
                        <textarea
                            onChange={event => setText(event.target.value)}
                            value={text}
                            rows={1}
                            onInput={(e) => auto_height(e)}
                            placeholder="Type your message and hit ENTER"
                            className="auto-height text-window w-100 p-1"/>
                    </div>
                </div>

                <div className="col-1">
                    <button className="submit-msg" itemType="submit">
                        <PaperPlaneIcon className="custom-icon"/>
                    </button>
                </div>
            </div>
        </form>
    )
}