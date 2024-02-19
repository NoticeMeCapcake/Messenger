"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import DialogueArea from "@/components/DialogueArea/DialogueArea";
import MessageList from "@/components/MessageList/MessageList";
import IChatMessage from "@/dto/IChatMessage";
import {useRef, useState} from "react";
import {Title} from "@/components/ChatHeader/Title";
import {SendMessageForm} from "@/components/SendMessageForm/SendMessageForm";
import {SideMenu} from "@/components/SideMenu/SideMenu";
import GroupSelector from "@/components/GroupSelector/GroupSelector"; // Import bootstrap CSS


let id = 1;
let message = "template";
let senderName = "templateName"

// const messages: ChatMessage[] = [{id: id, senderId: senderName, text: message}]

const initGroupList = Array.from({ length: 50 }).map((_, i, a) => `Chat:1.${a.length - i}`);


export default function AppLayout() {
    const [messages, setMessages] = useState<IChatMessage[]>([{id: id, isFromUser: false, senderId: senderName, text: message}])
    const [groupList, setGroupList] = useState<string[]>(initGroupList)
    const messageListRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const inputContainerRef = useRef<HTMLDivElement | null>(null);

    const scrollToNewMessage = () => messageListRef.current?.scrollTo({top: messageListRef.current.scrollHeight, behavior: "smooth"}) // Scroll to bottom on new message

    const adjustMessageListSize = () => {
        const messageList = messageListRef.current;
        console.log("adjustMessageListSize");

        if (!messageList) return;

        console.log(`calc(100vh - ${titleRef.current?.clientHeight ?? 0}px - ${inputContainerRef.current?.clientHeight ?? 0}px - 20px)`)

        messageList.style.height = `calc(100vh - ${titleRef.current?.clientHeight ?? 0}px - ${inputContainerRef.current?.clientHeight ?? 0}px - 20px)`;
        console.log(messageList.style.height);
    }

    return (
        <div className="container-fluid" style={{backgroundColor:  "#1a181b"}}>
            <div className="row justify-content-center" id="mainRow">
                <div className="col-3 dark-bg" style={{height: "100vh"}}>
                    <div className="" style={{height: "6%", minHeight: "48px"}}>
                        <SideMenu/>
                    </div>
                    <div className="">
                        <GroupSelector groupListSetter={setGroupList}/>
                    </div>
                    <div className="">
                        <DialogueArea clickAction={(tag: string): void => {
                            console.log(tag);
                            setMessages([...messages, {id: id, isFromUser: false, senderId: senderName, text: tag}]);
                            console.log(messages)
                        }} groupList={groupList}></DialogueArea>
                    </div>
                </div>
                <div className="col-9">
                    <div ref={titleRef} className="">
                        <Title chatName={senderName}/>
                    </div>
                    <div ref={messageListRef} style={{height: "calc(100vh - 145px)"}} className="">
                        <MessageList messages={messages}/>
                    </div>
                    <div ref={inputContainerRef} className="align-self-end">
                            <SendMessageForm adjustMessageListSize={adjustMessageListSize} initialText={''} sendMessage={(text: string): void => {
                                console.log(text)
                                setMessages([...messages, {id: id, isFromUser: true, senderId: "Me", text: text}]);
                                console.log(messages)
                            }} />
                    </div>
                </div>
            </div>
        </div>
    );
}