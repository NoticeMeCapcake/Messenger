"use client";

import {MouseEvent} from "react";
// import {Simulate} from "react-dom/test-utils";
// import click = Simulate.click;

enum GroupType {
    All, Personal, Groups, Channels
}

interface IProps {
    groupListSetter: (groupList: string[]) => void
}

const GroupSelector = ({groupListSetter}: IProps) => {

    const groupMapper: Map<string, GroupType> = new Map([
        ["All", GroupType.All],
        ["Personal", GroupType.Personal],
        ["Groups", GroupType.Groups],
        ["Channels", GroupType.Channels]
    ]);

    console.log(groupMapper.size);

    const generateGroupList = (groupType: GroupType) => {
        return Array.from({ length: 50 }).map((_, i, a) => `Chat:${groupType}.${a.length - i}`);
    }
    const handleClick = (key: string) => {
        groupListSetter(generateGroupList(groupMapper.get(key) ?? GroupType.All));
    }
    return <small className="row" >
        {Array.from(groupMapper).map(([key, value]) => {
            return <div className="col-3 light-hover" onClick={e => handleClick(key)}>
                {key}
            </div>
        })}
        </small>

}

export default GroupSelector;