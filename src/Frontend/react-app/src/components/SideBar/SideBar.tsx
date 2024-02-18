import * as React from "react";
import ChatInfoDto from "../../dto/ChatInfoDto";

type Props = {
    chatList: ChatInfoDto[ ];
}



const DUMMY_DATA = [
    {
        id: 1,
        name: "perborgen",
        lastMessage: "hey"
    },
    {
        id: 2,
        name: "janedoe",
        lastMessage: "hey1"
    },
]

export const SideBar = (props: Props) => {
    let chatList = DUMMY_DATA;
    return <div className="chat-side-bar h-100 bg-gray-900">
        <div className="chat-side-bar-body">
            <ul>
                {chatList.map(chat =>
                        <li key={chat.id}> <p>{chat.name}</p> <p>{chat.lastMessage}</p> </li>)}
            </ul>
        </div>
    </div>;
}
