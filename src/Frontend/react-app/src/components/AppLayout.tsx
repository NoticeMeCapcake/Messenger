"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatList from "@/components/DialogueArea/ChatList";
import MessageList from "@/components/MessageList/MessageList";
import React, {useCallback, useEffect, useRef} from 'react';
import Title from "@/components/ChatHeader/Title";
import {SendMessageForm} from "@/components/SendMessageForm/SendMessageForm";
import {SideMenu} from "@/components/SideMenu/SideMenu";
import GroupSelector from "@/components/GroupSelector/GroupSelector";
import Searcher from "@/components/Searcher/Searcher";
import {useAppDispatch, useAppSelector} from '@/services/store/types/hooks';
import {addMessage, setIdMessage} from '@/services/store/slices/messagesSlice'; // Import bootstrap CSS
import IMessageRequest from '@/dto/IMessageRequest';
import {RequestType} from "@/dto/RequestType";
import {selectCurrentUser} from "@/services/store/slices/currentUserSlice";
import {sendMessageViaSocket} from "@/services/store/thunks/sendMessageViaSocket";
import {connectToSocket} from "@/services/store/thunks/connectToSocket";


export default function AppLayout() {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser);

    useEffect(() => {
        dispatch(connectToSocket())
    })

    const messageListRef = useRef<HTMLDivElement | null>(null);
    const messageListScrollAreaRef = useRef<HTMLDivElement | null>(null); //TODO: change messageListScrollAreaRef
    const titleRef = useRef<HTMLDivElement | null>(null);
    const inputContainerRef = useRef<HTMLDivElement | null>(null);

    //TODO: change messageListRef to actual scroll area
    const scrollToNewMessage = useCallback(() => {
        console.log("scrollToNewMessage", messageListScrollAreaRef.current?.scrollHeight);
        messageListScrollAreaRef.current?.scrollTo({top: messageListScrollAreaRef.current?.scrollHeight, behavior: "smooth"})
    }, [messageListScrollAreaRef]) // Scroll to bottom on new message

    const adjustMessageListSize = () => {
        const messageList = messageListRef.current;
        console.log("adjustMessageListSize");

        if (!messageList) return;

        console.log(`calc(100vh - ${titleRef.current?.clientHeight ?? 0}px - ${inputContainerRef.current?.clientHeight ?? 0}px - 20px)`)

        messageList.style.height = `calc(100vh - ${titleRef.current?.clientHeight ?? 0}px - ${inputContainerRef.current?.clientHeight ?? 0}px - 20px)`;
        console.log(messageList.style.height);
        console.log("scrolled")
    }

    return (
      <main style={{width: "100vw", height: "100vh"}}>
        <div className="container-fluid" style={{backgroundColor:  "#1a181b"}}>
            <div className="row justify-content-center" id="mainRow">
                <div className="col-3 dark-bg" style={{height: "100vh", borderRight: "1px solid #3b3a39"}}>
                    <div className="" style={{height: "47px"}}>
                        <div className="row justify-content-between">
                            <div className="col-auto">
                                <SideMenu/>
                            </div>
                            <div className="col-7 align-self-center">
                                <Searcher/>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <GroupSelector/>
                    </div>
                    <div className="">
                        <ChatList/>
                    </div>
                </div>
                <div className="col-9">
                    <div ref={titleRef} className="">
                        <Title/>
                    </div>
                    <div ref={messageListRef} style={{height: "calc(100vh - 145px)"}} className="">
                        <MessageList scrollAreaRef={messageListScrollAreaRef} scrollMessageListToBottom={scrollToNewMessage}/>
                    </div>
                    <div ref={inputContainerRef} className="align-self-end">
                            <SendMessageForm scrollMessageListToBottom={scrollToNewMessage} adjustMessageListSize={adjustMessageListSize} initialText={''} sendMessage={(text: string): void => {
                                console.log(text)
                                console.log("in set text: ", messageListScrollAreaRef.current?.scrollHeight);
                                const payload : IMessageRequest = {id: null, tempId: Math.floor(Math.random() * 10000).toString(), userId: "42", chatId: "42", text: text};
                                dispatch(addMessage({id: null, tempId: payload.tempId, chatId: "42", senderId: "42", senderName: "", text: text}))
                                console.log("Will send: " + JSON.stringify(payload));
                                dispatch(sendMessageViaSocket({message: payload, requestType: RequestType.Create}));
                            }} />
                    </div>
                </div>
            </div>
        </div>
  </main>
    );
}