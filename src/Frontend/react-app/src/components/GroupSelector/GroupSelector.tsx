"use client";

import "./style.css";
import {MouseEvent} from "react";
import { selectSelectedChatType, setSelectedChatType } from '@/services/store/slices/SelectedChatTypeSlice';
import { useAppDispatch, useAppSelector } from '@/services/store/types/hooks';
import ChatType from '@/dto/ChatType';


const GroupSelector = () => {
    const dispatch = useAppDispatch();
    const selectedChatType = useAppSelector(selectSelectedChatType);

    const groupMapper: Map<string, ChatType> = new Map([
        ["All", ChatType.All],
        ["Personal", ChatType.Personal],
        ["Groups", ChatType.Groups],
        ["Channels", ChatType.Channels]
    ]);

    console.log(groupMapper.size);

    const generateGroupList = (groupType: ChatType) => {
        return Array.from({ length: 50 }).map((_, i, a) => `Chat:${groupType}.${a.length - i}`);
    }
    const handleClick = (key: string) => {
        dispatch(setSelectedChatType(groupMapper.get(key)!));
    }
    return <small className="row py-2" style={{borderBottom: "1px solid #3b3a39"}}>
        {Array.from(groupMapper).map(([key, value]) => {
            return <div className="col-3 light-hover text-center cursor-pointer group-item" onClick={e => handleClick(key)}>
                {key}
            </div>
        })}
        </small>

}

export default GroupSelector;