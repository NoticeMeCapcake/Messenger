'use client';
import React, {useState} from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import "./style.css";
import {PersonIcon} from "@radix-ui/react-icons";
import { IChatInfo, selectChats } from '@/services/store/slices/chatSlice';
import { useAppSelector } from '@/services/store/types/hooks';
import { selectMessages } from '@/services/store/slices/messagesSlice';

type Props = {
    clickAction: (tag: string) => void,
}
const ChatList = (props: Props) => {
    const chats = useAppSelector(selectChats);
    return <ScrollArea.Root className="ScrollAreaRoot dark-bg" style={{ height: "calc(100vh - 100px)"}}>
        <ScrollArea.Viewport className="ScrollAreaViewport">
            <div style={{padding: '15px 20px'}}>
                {chats.filter(chat -> chat.type).map((chat) => (
                    <div className="row align-items-center tag px-1 light-hover py-2 cursor-pointer" key={chat} onClick={() => props.clickAction(chat )}>
                        <div className="col-auto">
                            <PersonIcon width={25} height={25}/>
                        </div>
                        <div className="col-auto">
                            {chat}
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