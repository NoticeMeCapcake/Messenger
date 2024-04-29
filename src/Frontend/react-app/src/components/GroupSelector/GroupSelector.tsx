"use client";

import "./style.css";
import {MouseEvent} from "react";
import { selectSelectedChatType, setSelectedChatType } from '@/services/store/slices/SelectedChatTypeSlice';
import { useAppDispatch, useAppSelector } from '@/services/store/types/hooks';
import ChatType from '@/dto/ChatType';


const GroupSelector = () => {
    const dispatch = useAppDispatch();

    const groupMapper: Map<string, ChatType> = new Map([
        ["All", ChatType.all],
        ["Personal", ChatType.personal],
        ["Groups", ChatType.group],
        ["Channels", ChatType.channel]
    ]);

    const handleClick = (type: ChatType) => {
        dispatch(setSelectedChatType(type));
    }
    return <small className="row py-2" style={{borderBottom: "1px solid #3b3a39"}}>
        {Array.from(groupMapper).map(([key, value]) => {
            return <div className="col-3 light-hover text-center cursor-pointer group-item" onClick={e => handleClick(value)}>
                {key}
            </div>
        })}
        </small>

}

export default GroupSelector;