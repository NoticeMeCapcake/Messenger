"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatList from "@/components/ChatList/ChatList";
import MessageList from "@/components/MessageList/MessageList";
import React, {useCallback, useEffect, useRef} from 'react';
import Title from "@/components/ChatHeader/Title";
import {SendMessageForm} from "@/components/SendMessageForm/SendMessageForm";
import {SideMenu} from "@/components/SideMenu/SideMenu";
import GroupSelector from "@/components/GroupSelector/GroupSelector";
import Searcher from "@/components/Searcher/Searcher";
import {useAppDispatch, useAppSelector} from '@/services/store/types/hooks';
import {addMessage, setCreatedTimeMessage, setIdMessage} from '@/services/store/slices/messagesSlice'; // Import bootstrap CSS
import IMessageRequest from '@/dto/IMessageRequest';
import {RequestType} from "@/dto/RequestType";
import {selectCurrentUser} from "@/services/store/slices/currentUserSlice";
import {sendMessageViaSocket} from "@/services/store/thunks/sendMessageViaSocket";
import {connectToSocket} from "@/services/store/thunks/connectToSocket";
import {selectSelectedChat} from "@/services/store/slices/selectedChatSlice";
import CreateChatPopup from "@/components/CreateChatPopup/CreateChatPopup";
import {IMessage} from "@stomp/stompjs";
import IMessageResponse from "@/dto/IMessageResponse";
import {NetworkConstants} from "@/networking/NetworkConstants";
import {RootState} from "@/services/store/store";


export default function AppLayout() {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser);
    const currentChat = useAppSelector(selectSelectedChat);

    useEffect(() => {
        dispatch(connectToSocket());
        // wait(300).then( () =>
        //     dispatch(getMessagesFromChat({requestType: RequestType.GetAll, message: {chatId: currentChat.id ?? "0"}}))
        // )
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
        // console.log("adjustMessageListSize");

        if (!messageList) return;

        // console.log(`calc(100vh - ${titleRef.current?.clientHeight ?? 0}px - ${inputContainerRef.current?.clientHeight ?? 0}px - 20px)`)

        messageList.style.height = `calc(100vh - ${titleRef.current?.clientHeight ?? 0}px - ${inputContainerRef.current?.clientHeight ?? 0}px - 20px)`;
        // console.log(messageList.style.height);t
        // console.log("scrolled")
    }

    const sendMsgCallback = (response: IMessage) => {
        const body = JSON.parse(response.body) as IMessageResponse;

        alert("New message id: " + body.id);

        dispatch(setIdMessage({tempId: body.tempId, id: body.id}));
        dispatch(setCreatedTimeMessage({id: body.id, createdAt: new Date((body.createdAt + NetworkConstants.timeZoneOffsetInSeconds) * 1000)}));
    }

    const sendMsgTimeoutCallback = (state: RootState, arg: any) => {
        const message = arg as IMessageRequest;
        state.messages.messages.map(
            storedMsg => {
                if (storedMsg.tempId === message.tempId) {
                    if (!storedMsg.id) { //
                        alert("sending message failure");
                    }
                }
            }
        );
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
                            <div className="col-auto">
                                <CreateChatPopup/>
                            </div>
                            <div className="col-6 align-self-center">
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
                                // console.log(text)
                                // console.log("in set text: ", messageListScrollAreaRef.current?.scrollHeight);
                                const payload : IMessageRequest = {id: null, tempId: Math.floor(Math.random() * 10000).toString(), userId: currentUser.id, chatId: currentChat.id ?? "0", text: text, action: RequestType.Create};
                                dispatch(addMessage({id: null, tempId: payload.tempId ?? "0", chatId: currentChat.id ?? "0", senderId: currentUser.id, senderName: currentUser.username, text: text}))
                                console.log("Will send: " + JSON.stringify(payload));
                                dispatch(sendMessageViaSocket({message: payload, callback: sendMsgCallback, timeoutCallback: sendMsgTimeoutCallback}));
                            }} />
                    </div>
                </div>
            </div>
        </div>
  </main>
    );
}