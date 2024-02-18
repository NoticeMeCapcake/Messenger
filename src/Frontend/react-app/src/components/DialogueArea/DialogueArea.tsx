'use client';
import React, {useState} from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import "./style.css";

const TAGS = Array.from({ length: 50 }).map((_, i, a) => `Chat:1.${a.length - i}`);

type Props = {
    clickAction: (tag: string) => void
}
const DialogueArea = (props: Props) => {
    return <ScrollArea.Root className="ScrollAreaRoot dark-bg" style={{overflowY: "auto", height: "calc(100vh - 100px)"}}>
        <ScrollArea.Viewport className="ScrollAreaViewport">
            <div style={{padding: '15px 20px'}}>
                {TAGS.map((tag) => (
                    <div className="tag px-1 light-hover py-2 cursor-pointer" key={tag} onClick={() => props.clickAction(tag)}>
                        {tag}
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