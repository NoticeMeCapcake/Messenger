import * as React from "react";
import {IconProps} from "@radix-ui/react-icons/dist/types";
import { GearIcon, PersonIcon, QuestionMarkCircledIcon, StarIcon } from '@radix-ui/react-icons';
import { ExoticComponent, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

interface IMenuItems {
    title: string;
    Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
    // icon: React.ReactNode;
}

export const MENU_ITEMS: IMenuItems[] = [
    {
        title: "Saved Messages",
        Icon: StarIcon,
    },
    {
        title: "Settings",
        Icon: GearIcon
    },
    {
        title: "Profile",
        Icon: PersonIcon
    },
    {
        title: "About",
        Icon: QuestionMarkCircledIcon
    },

]