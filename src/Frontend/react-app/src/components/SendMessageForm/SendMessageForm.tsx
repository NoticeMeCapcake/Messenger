'use client'

import {ChangeEvent, KeyboardEvent, SyntheticEvent, UIEvent, useRef, useState} from "react";
import {FaceIcon, FilePlusIcon, PaperPlaneIcon} from "@radix-ui/react-icons"
import "./style.css";
import Tooltip from "@/components/Tooltip/Tooltip";


interface IProps {
    initialText: string,
    sendMessage:  (text: string) => void
}


export const SendMessageForm = (props: IProps) => {
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const [text, setText] = useState(props.initialText);

    const handleTextChange = (event:  ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        const textArea = inputRef.current;
        if (!textArea) return;
        console.log(event.currentTarget.scrollHeight);
        textArea.style.height = 'auto';
        textArea.style.height = `${event.currentTarget.scrollHeight}px`;
    }

    const submitOnEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); // Prevents the addition of a new line in the text field
            if (!event.repeat) {
                handleSubmitForm(event);
            }
        }
    }
    // TODO: fix the height of the text area

    const handleSubmitForm = (event: SyntheticEvent<HTMLElement>) => {
        event.preventDefault();
        if (!text.trim()) return;
        props.sendMessage(text);
        setText("");
        const textArea = inputRef.current;
        if (!textArea) return;
        textArea.style.height;
    }

    return (
        <form
            className="send-message-form"
            onSubmit={handleSubmitForm}>
            <div className="row justify-content-center align-items-center my-2 ">
                <div className="text-window col-10 py-1">
                    <div className="row">
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
                        <div className="col-11 align-self-center">
                            <div className="row align-items-center">
                                <textarea
                                    onChange={handleTextChange}
                                    value={text}
                                    rows={1}
                                    onKeyDown={submitOnEnter}
                                    placeholder="Type your message and hit ENTER"
                                    className="auto-height text-window w-100"/>
                            </div>
                        </div>
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