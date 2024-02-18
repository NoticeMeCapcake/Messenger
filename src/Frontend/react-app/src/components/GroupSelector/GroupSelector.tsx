"use client";

// import {MouseEvent} from "react";
// import {Simulate} from "react-dom/test-utils";
// import click = Simulate.click;

enum GroupType {
    All, Personal, Groups, Channels
}
const groupMapper = {
    "All": GroupType.All,
    "Personal": GroupType.Personal,
    "Groups": GroupType.Groups,
    "Channels": GroupType.Channels
}

interface IProps {
    groupListSetter: (groupList: string[]) => void
}

const GroupSelector = () => {

    // const generateGroupList = (groupType: GroupType) => {
    //     return Array.from({ length: 50 }).map((_, i, a) => `Chat:${groupType}.${a.length - i}`);
    // }
    // const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        // groupListSetter(generateGroupList(groupMapper[e.currentTarget.textContent]));
    // }
    return <small className="row" >
        {Object.entries(groupMapper).map((entry) => {
            const [key, value] = entry;
            // groupMapper["All"];
            // groupMapper[key];

            return <div className="col-3">
                {key}
            </div>
        })}
        </small>

}

export default GroupSelector;