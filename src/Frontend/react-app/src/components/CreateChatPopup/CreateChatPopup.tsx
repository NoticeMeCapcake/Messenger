import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import {Cross2Icon, PlusIcon} from '@radix-ui/react-icons';
import * as Tabs from "@radix-ui/react-tabs";
import './style.css';
import ChatType from "@/dto/ChatType";
import IChatRequest from "@/dto/IChatRequest";
import {useAppDispatch, useAppSelector} from "@/services/store/types/hooks";
import {selectCurrentUser} from "@/services/store/slices/currentUserSlice";
import {RequestType} from "@/dto/RequestType";
import {sendChatViaSocket} from "@/services/store/thunks/sendChatViaSocket";
import {IMessage} from "@stomp/stompjs";
import {addChat, IChatInfo} from "@/services/store/slices/chatSlice";
import {setSelectedChat} from "@/services/store/slices/selectedChatSlice";
import {sendMessageViaSocket} from "@/services/store/thunks/sendMessageViaSocket";
import IMessageRequest from "@/dto/IMessageRequest";
import IMessageResponse from "@/dto/IMessageResponse";
import {setMessages} from "@/services/store/slices/messagesSlice";
import IChatMessage from "@/dto/IChatMessage";
import {NetworkConstants} from "@/networking/NetworkConstants";
import {resolveMessageCallbackByRequestType} from "@/services/store/thunks/helpers/resolveMessageCallbackByRequestType";

const CreateChatPopup = () => {
    const dispatch = useAppDispatch();

    const groupMapper: Map<string, ChatType> = new Map([
        ["Personal", ChatType.personal],
        ["Groups", ChatType.group],
        ["Channels", ChatType.channel]
    ]);
    const currentUser = useAppSelector(selectCurrentUser);
    let chatType = ChatType.personal;
    const users = ["42"] as string[];

    const handleClick = (_type: ChatType) => {
        chatType = _type;
    };

    const convertResponseToMessages = (response: IMessageResponse[]) => {
        const messages = [] as IChatMessage[];
        response.map(message => {
            const convertedMessage = {
                id: message.id,
                senderId: message.userId,
                chatId: message.chatId,
                createdAt: new Date((message.createdAt + NetworkConstants.timeZoneOffsetInSeconds) * 1000),
                text: message.text,
                senderName: "Template"
            } as IChatMessage;
            messages.push(convertedMessage);
        });
        return messages
    }

    const getMessagesByChatCallback = (response: IMessage) => {
        const body = JSON.parse(response.body) as IMessageResponse[];

        alert("Got messages " + body.length);

        dispatch(setMessages(convertResponseToMessages(body)));
    }

    const createChatCallback = (response: IMessage) => {
        const body = JSON.parse(response.body) as IChatInfo;

        alert("New chat id: " + body.id);

        dispatch(addChat(body));
        dispatch(setSelectedChat(body));
        const payload = {
            action: RequestType.GetAll,
            chatId: body.id,
        } as IMessageRequest;
        dispatch(sendMessageViaSocket({message: payload, callback: resolveMessageCallbackByRequestType(RequestType.GetAll, dispatch)}))
    }

    const onCreateHandle = () => {
        const tempId = Math.floor(Math.random() * 10000).toString();
        const payload = {
            id: "0",
            tempId: tempId,
            chatName: "test chat" + [currentUser.id, "43"].join(" : ") + "+" + tempId,
            userId: currentUser.id,
            userIds: [currentUser.id, "43"],
            type: chatType,
            action: RequestType.Create
        } as IChatRequest;
        dispatch(sendChatViaSocket({message: payload, callback: createChatCallback}))
    }
    return <div>
        <Popover.Root>
            <Popover.Trigger asChild>
                <button className="m-2 IconButton" aria-label="Update dimensions">
                    <PlusIcon />
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className="PopoverContent blur-bg" sideOffset={5}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <p className="Text" style={{ marginBottom: 10 }}>
                            New chat
                        </p>
                        <div className="">
                            <Tabs.Root className="TabsRoot" defaultValue="Personal">
                                <Tabs.List className="TabsList">
                                    <div className="container-fluid py-2">
                                        <small className="row py-2" style={{borderBottom: "1px solid #5e5e5e"}}>
                                            {Array.from(groupMapper).map(([key, value]) => {
                                                return <Tabs.Trigger value={key}
                                                                     className="col-3 group-item dark-hover text-center cursor-pointer "
                                                                     onClick={e => handleClick(value)}>
                                                    {key}
                                                </Tabs.Trigger>
                                            })}
                                        </small>
                                    </div>
                                </Tabs.List>
                                <Tabs.Content className="TabsContent" value="Personal">
                                    <fieldset className="Fieldset">
                                        <label className="Label" htmlFor="name">
                                            Username
                                        </label>
                                        <input className="Input" id="name" defaultValue="@"/>
                                    </fieldset>
                                </Tabs.Content>
                                <Tabs.Content className="TabsContent" value="Groups">
                                    <fieldset className="Fieldset">
                                        <label className="Label" htmlFor="groupName">
                                            Group name
                                        </label>
                                        <input className="Input" id="groupName" type="password" />
                                    </fieldset>
                                    <fieldset className="Fieldset">
                                        <label className="Label" htmlFor="initInviteUsers">
                                            Invite
                                        </label>
                                        <input className="Input" id="initInviteUsers" type="password" />
                                    </fieldset>
                                </Tabs.Content>
                            </Tabs.Root>

                        </div>
                        <fieldset className="Fieldset">
                            <button className="Button" onClick={onCreateHandle}>
                                Create
                            </button>
                        </fieldset>
                    </div>
                    <Popover.Close className="PopoverClose" aria-label="Close">
                        <Cross2Icon />
                    </Popover.Close>
                    <Popover.Arrow className="PopoverArrow" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    </div>
    };

export default CreateChatPopup;