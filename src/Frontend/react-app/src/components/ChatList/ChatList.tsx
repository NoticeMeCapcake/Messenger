'use client';
import React from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import "./style.css";
import {PersonIcon} from "@radix-ui/react-icons";
import {selectChats} from '@/services/store/slices/chatSlice';
import {useAppDispatch, useAppSelector} from '@/services/store/types/hooks';
import {selectSelectedChatType} from '@/services/store/slices/SelectedChatTypeSlice';
import {selectSelectedChat, setSelectedChat} from '@/services/store/slices/selectedChatSlice';
import {getMessagesFromChat} from "@/services/store/thunks/getMessagesFromChat";
import {RequestType} from "@/dto/RequestType";

const ChatList = () => {
    const dispatch = useAppDispatch();
    const chats = useAppSelector(selectChats);
    const selectedChat = useAppSelector(selectSelectedChat);
    const selectedChatType = useAppSelector(selectSelectedChatType);
    return <ScrollArea.Root className="ScrollAreaRoot dark-bg" style={{ height: "calc(100vh - 100px)"}}>
        <ScrollArea.Viewport className="ScrollAreaViewport">
            <div style={{padding: '15px 20px'}}>
                {chats.filter(chat => chat.type === selectedChatType || selectedChatType === "all")
                  .map((chat) => (<div className="row align-items-center tag px-1 light-hover py-2 cursor-pointer"
                         key={chat.id}
                         onClick={() => {
                             if (selectedChat.id === chat.id) return;
                             dispatch(setSelectedChat(chat));
                             dispatch(getMessagesFromChat({requestType: RequestType.GetAll, message: {chatId: chat.id ?? "0"}}))
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