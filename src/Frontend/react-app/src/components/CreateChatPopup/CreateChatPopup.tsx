import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import {MixerHorizontalIcon, Cross2Icon, PlusIcon} from '@radix-ui/react-icons';
import * as Tabs from "@radix-ui/react-tabs";
import './style.css';
import ChatType from "@/dto/ChatType";

const CreateChatPopup = () => {
    const groupMapper: Map<string, ChatType> = new Map([
        ["Personal", ChatType.personal],
        ["Groups", ChatType.group],
        ["Channels", ChatType.channel]
    ]);
    let chatType = ChatType.personal;
    const users = ["42"] as string[];

    const handleClick = (_type: ChatType) => {
        chatType = _type;
    };

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
                            <button className="Button">
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