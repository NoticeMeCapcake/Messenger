"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import DialogueArea from "@/components/DialogueArea/DialogueArea";
import MessageList from "@/components/MessageList/MessageList";
import IChatMessage from "@/dto/IChatMessage";
import {useState} from "react";
import {Title} from "@/components/ChatHeader/Title";
import {SendMessageForm} from "@/components/SendMessageForm/SendMessageForm";
import {SideMenu} from "@/components/SideMenu/SideMenu";
import GroupSelector from "@/components/GroupSelector/GroupSelector"; // Import bootstrap CSS


let id = 1;
let message = "template";
let senderName = "templateName"

// const messages: ChatMessage[] = [{id: id, senderId: senderName, text: message}]

export default function AppLayout() {
    const [messages, setMessages] = useState<IChatMessage[]>([{id: id, isFromUser: false, senderId: senderName, text: message}])

    return (
        <div className="container-fluid" style={{backgroundColor:  "#1a181b"}}>
            <div className="row justify-content-center" id="mainRow">
                <div className="col-3 dark-bg" style={{height: "100vh"}}>
                    <div className="" style={{height: "6%", minHeight: "48px"}}>
                        <SideMenu/>
                    </div>
                    <div className="">
                        <GroupSelector/>
                    </div>
                    <div className="">
                        <DialogueArea clickAction={(tag: string): void => {
                            console.log(tag);
                            setMessages([...messages, {id: id, isFromUser: false, senderId: senderName, text: tag}]);
                            console.log(messages)
                        }}></DialogueArea>
                    </div>
                </div>
                <div className="col-9">
                    <div className="">
                        <Title chatName={senderName}/>
                    </div>
                    <div className="">
                        <MessageList messages={messages}/>
                    </div>
                    <div className="align-self-end position-relative w-100">
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