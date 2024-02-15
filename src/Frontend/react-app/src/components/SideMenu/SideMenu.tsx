"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {GearIcon, HamburgerMenuIcon, PersonIcon, QuestionMarkCircledIcon, StarIcon} from "@radix-ui/react-icons";
import "./style.css";

export const SideMenu = () => {
    return <div>
        <DropdownMenu.Root >
            <DropdownMenu.Trigger asChild>
                <HamburgerMenuIcon className="m-2 mx-3 p-1 light-hover" style={{width: 28, height: 28, borderRadius: 5}}/>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content className="light-bg DropdownMenuContent">
                    <DropdownMenu.Item>
                        <div>
                            Saved Messages <StarIcon/>
                        </div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                        <div>
                            Settings <GearIcon/>
                        </div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                        <div>
                            Profile <PersonIcon/>
                        </div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                        <div>
                            About <QuestionMarkCircledIcon/>
                        </div>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    </div>
}