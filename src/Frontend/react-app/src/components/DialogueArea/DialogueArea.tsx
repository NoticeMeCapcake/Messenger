'use client';
import React, {useState} from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import "./style.css";
import {PersonIcon} from "@radix-ui/react-icons";

const TAGS = Array.from({ length: 50 }).map((_, i, a) => `Chat:1.${a.length - i}`);

type Props = {
    clickAction: (tag: string) => void,
    groupList: string[]
}
const DialogueArea = (props: Props) => {
    return <ScrollArea.Root className="ScrollAreaRoot dark-bg" style={{ height: "calc(100vh - 100px)"}}>
        <ScrollArea.Viewport className="ScrollAreaViewport">
            <div style={{padding: '15px 20px'}}>
                {props.groupList.map((chat) => (
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

export default DialogueArea;