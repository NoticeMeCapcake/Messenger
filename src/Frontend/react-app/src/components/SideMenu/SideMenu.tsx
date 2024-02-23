"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {GearIcon, HamburgerMenuIcon, PersonIcon, QuestionMarkCircledIcon, StarIcon} from "@radix-ui/react-icons";
import "./style.css";
import { MENU_ITEMS } from '@/components/SideMenu/stubs';

export const SideMenu = () => {
    return <div>
        <DropdownMenu.Root >
            <DropdownMenu.Trigger asChild>
                <HamburgerMenuIcon className="m-2 mx-3 p-1 light-hover" style={{width: 28, height: 28, borderRadius: 5}}/>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content className="dropdown-menu-content p-2">
                    {MENU_ITEMS.map(({title, icon}) =>
                    <DropdownMenu.Item className="dropdown-menu-item cursor-pointer">
                        <div className="p-2">
                            {title}
                        </div>
                    </DropdownMenu.Item>
                    )}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    </div>
}