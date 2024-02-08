'use client';
import React from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import "./style.css";

const TAGS = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
const DialogueArea = (clickAction: (tag: string) => void) => (
    <ScrollArea.Root className="ScrollAreaRoot">
        <ScrollArea.Viewport className="ScrollAreaViewport">
            <div style={{ padding: '15px 20px' }}>
                <div className="Text">Tags</div>
                {TAGS.map((tag) => (
                    <div className="Tag hover" key={tag} onClick={() => clickAction(tag)}>
                        {tag}
                    </div>
                ))}
            </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
            <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
            <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="ScrollAreaCorner" />
    </ScrollArea.Root>
);

export default DialogueArea;