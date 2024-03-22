'use client';
import React, {useState} from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import "./style.css";
import {PersonIcon} from "@radix-ui/react-icons";
import { IChatInfo, selectChats } from '@/services/store/slices/chatSlice';
import { useAppDispatch, useAppSelector } from '@/services/store/types/hooks';
import { selectMessages } from '@/services/store/slices/messagesSlice';
import { selectSelectedChatType } from '@/services/store/slices/SelectedChatTypeSlice';
import { setSelectedChat } from '@/services/store/slices/selectedChatSlice';

const ChatList = () => {
    const dispatch = useAppDispatch();
    const chats = useAppSelector(selectChats);
    const selectedChatType = useAppSelector(selectSelectedChatType);
    return <ScrollArea.Root className="ScrollAreaRoot dark-bg" style={{ height: "calc(100vh - 100px)"}}>
        <ScrollArea.Viewport className="ScrollAreaViewport">
            <div style={{padding: '15px 20px'}}>
                {chats.filter(chat => chat.type === selectedChatType || selectedChatType === "all")
                  .map((chat) => (<div className="row align-items-center tag px-1 light-hover py-2 cursor-pointer"
                         key={chat.id}
                         onClick={() => dispatch(setSelectedChat(chat))}>
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