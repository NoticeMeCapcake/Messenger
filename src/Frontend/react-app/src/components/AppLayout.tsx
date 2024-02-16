"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import DialogueArea from "@/components/dialogues/DialogueArea";
import MessageList from "@/components/MessageList/MessageList";
import IChatMessage from "@/dto/IChatMessage";
import {useState} from "react";
import {Title} from "@/components/ChatHeader/Title";
import {SendMessageForm} from "@/components/SendMessageForm/SendMessageForm";
import {SideMenu} from "@/components/SideMenu/SideMenu"; // Import bootstrap CSS


let id = 1;
let message = "template";
let senderName = "templateName"

// const messages: ChatMessage[] = [{id: id, senderId: senderName, text: message}]

export default function AppLayout() {
    const [messages, setMessages] = useState<IChatMessage[]>([{id: id, isFromUser: false, senderId: senderName, text: message}])

    return (
        <div className="container-fluid px-0" style={{backgroundColor:  "#1a181b"}}>
            <div className="row w-100 h-100">
                <div className="col-3 bg-dark px-0" style={{height: "100vh"}}>
                    <div className="dark-bg" style={{height: "6%", minHeight: "48px"}}>
                        <SideMenu/>
                    </div>
                    <div style={{height: "94%"}}>
                        <DialogueArea clickAction={(tag: string): void => {
                            console.log(tag);
                            setMessages([...messages, {id: id, isFromUser: false, senderId: senderName, text: tag}]);
                            console.log(messages)
                        }}></DialogueArea>
                    </div>
                </div>
                <div className="col-9 row px-5">
                    <div className="col-12 align-self-start px-0">
                        <Title chatName={senderName}/>
                    </div>
                    <div className="col-12 align-self-start px-0" style={{height: "50%"}}>
                        <MessageList messages={messages}/>
                    </div>
                    <div className="col-12 align-self-end px-0">
                        <div>
                            <SendMessageForm initialText={''} sendMessage={(text: string): void => {
                                console.log(text)
                                setMessages([...messages, {id: id, isFromUser: true, senderId: "Me", text: text}]);
                                console.log(messages)
                            }} />
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}