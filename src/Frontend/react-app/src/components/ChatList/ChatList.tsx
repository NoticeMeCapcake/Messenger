'use client';
import React, {useEffect, useState} from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import "./style.css";
import {PersonIcon} from "@radix-ui/react-icons";
import {IChatInfo, selectChats, setChats} from '@/services/store/slices/chatSlice';
import {useAppDispatch, useAppSelector} from '@/services/store/types/hooks';
import {selectSelectedChatType} from '@/services/store/slices/SelectedChatTypeSlice';
import {selectSelectedChat, setSelectedChat} from '@/services/store/slices/selectedChatSlice';
import {RequestType} from "@/dto/RequestType";
import {IMessage} from "@stomp/stompjs";
import IMessageResponse from "@/dto/IMessageResponse";
import {setMessages} from "@/services/store/slices/messagesSlice";
import IChatMessage from "@/dto/IChatMessage";
import {NetworkConstants} from "@/networking/NetworkConstants";
import {sendMessageViaSocket} from "@/services/store/thunks/sendMessageViaSocket";
import {sendChatViaSocket} from "@/services/store/thunks/sendChatViaSocket";
import IChatRequest from "@/dto/IChatRequest";
import {selectCurrentUser} from "@/services/store/slices/currentUserSlice";
import ChatType from "@/dto/ChatType";

const ChatList = () => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser)
    const chats = useAppSelector(selectChats)
    // const chats = useAppSelector(selectChats);
    const selectedChat = useAppSelector(selectSelectedChat);
    const selectedChatType = useAppSelector(selectSelectedChatType);

    const getAllChatsCallback = (response: IMessage) => {
        const body = JSON.parse(response.body) as IChatInfo[];

        console.log("In chats callback chats: " + JSON.stringify(chats));
        console.log("In chats callback body: " + JSON.stringify(body));
        console.log("In chats callback if: " + !body.every((chatInfo) => chats.includes(chatInfo))
            || body.length === chats.length);


        if (!body.every((chatInfo) => chats.includes(chatInfo))
            || body.length === chats.length) {
            alert("Got chats and reset " + body.length);

            dispatch(setChats(body as IChatInfo[]))
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const payload = {
                id: "0",
                tempId: "0",
                chatName: "",
                userId: currentUser.id,
                userIds: [],
                type: ChatType.group,
                action: RequestType.GetAll
            } as IChatRequest;
            console.log("Interval")
            dispatch(sendChatViaSocket({message: payload, callback: getAllChatsCallback}))
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    const convertResponseToMessages = (response: IMessageResponse[]) => {
        const messages = [] as IChatMessage[];
        response.map(message => {
            const convertedMessage = {
                id: message.id,
                senderId: message.userId,
                chatId: message.chatId,
                createdAt: new Date((message.createdAt + NetworkConstants.timeZoneOffsetInSeconds) * 1000),
                text: message.text,
                senderName: "Template"
            } as IChatMessage;
            messages.push(convertedMessage);
        });
        return messages
    }

    const getMessagesByChatCallback = (response: IMessage) => {
        const body = JSON.parse(response.body) as IMessageResponse[];

        alert("Got messages " + body.length);

        dispatch(setMessages(convertResponseToMessages(body)));
    }

    return <ScrollArea.Root className="ScrollAreaRoot dark-bg" style={{ height: "calc(100vh - 100px)"}}>
        <ScrollArea.Viewport className="ScrollAreaViewport">
            <div style={{padding: '15px 20px'}}>
                {chats.filter(chat => chat.type === selectedChatType || selectedChatType === "all")
                  .map((chat) => (<div className="row align-items-center tag px-1 light-hover py-2 cursor-pointer"
                         key={chat.id}
                         onClick={() => {
                             if (selectedChat.id === chat.id) return;
                             dispatch(setSelectedChat(chat));
                             dispatch(sendMessageViaSocket({message: {chatId: chat.id ?? "0", action: RequestType.GetAll}, callback: getMessagesByChatCallback}))
                         }}
                         >
                        <div className="col-auto">
                            <PersonIcon width={25} height={25}/>
                        </div>
                        <div className="col-auto">
                            {chat.chatName}
                            <div>
                                <small style={{color: "#b8b8b8"}}>last message template</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
            <ScrollArea.Thumb className="ScrollAreaThumb"/>
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
            <ScrollArea.Thumb className="ScrollAreaThumb"/>
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="ScrollAreaCorner"/>
    </ScrollArea.Root>;
}

export default ChatList;