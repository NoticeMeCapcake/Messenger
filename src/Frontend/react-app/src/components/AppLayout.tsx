"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import DialogueArea from "@/components/dialogues/DialogueArea";
import MessageList from "@/components/MessageList/MessageList";
import IChatMessage from "@/dto/IChatMessage";
import {useState} from "react";
import {Title} from "@/components/ChatHeader/Title";
import {SendMessageForm} from "@/components/SendMessageForm/SendMessageForm"; // Import bootstrap CSS


let id = 1;
let message = "template";
let senderName = "templateName"

// const messages: ChatMessage[] = [{id: id, senderId: senderName, text: message}]

export default function AppLayout() {
    const [messages, setMessages] = useState<IChatMessage[]>([{id: id, isFromUser: false, senderId: senderName, text: message}])

    return (
        <div className="container-fluid bg-dark">
            <div className="row">
                <div className="col-3 bg-dark" style={{height: "100vh"}}>
                    <DialogueArea clickAction={(tag: string): void => {
                        console.log(tag);
                        setMessages([...messages, {id: id, isFromUser: false, senderId: senderName, text: tag}]);
                        console.log(messages)
                    }}></DialogueArea>
                </div>
                <div className="col-9 row">
                    <div className="col-12">
                        <Title chatName={senderName}/>
                    </div>
                    <div className="col-12">
                        <MessageList messages={messages}/>
                    </div>
                    <div className="col-12">
                        <SendMessageForm initialText={''} sendMessage={(text: string): void => {
                            console.log(text)
                            setMessages([...messages, {id: id, isFromUser: true, senderId: senderName, text: text}]);
                            console.log(messages)
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
}