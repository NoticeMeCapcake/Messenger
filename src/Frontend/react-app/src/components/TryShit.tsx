"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import DialogueArea from "@/components/dialogues/DialogueArea";
import MessageList from "@/components/MessageList/MessageList";
import ChatMessage from "@/dto/ChatMessage";
import {useState} from "react"; // Import bootstrap CSS


let id = 1;
let message = "template";
let senderName = "templateName"

// const messages: ChatMessage[] = [{id: id, senderId: senderName, text: message}]

export default function TryShit() {
    const [messages, setMessages] = useState<ChatMessage[]>([{id: id, senderId: senderName, text: message}])

    return (
        <div className="container-fluid bg-black">
            <div className="row">
                <div className="col-3 bg-dark" style={{height: "100vh"}}>
                    <DialogueArea clickAction={(tag: string): void => {
                        console.log(tag);
                        const newMessages: ChatMessage[] = messages.copyWithin(messages.length, 0);
                        newMessages.push({id: id, senderId: senderName, text: tag});
                        setMessages(newMessages);
                        console.log(messages)
                    }}></DialogueArea>
                </div>
                <div className="col-9 bg-light">
                    <MessageList messages={messages}/>
                </div>
            </div>
        </div>
    );
}