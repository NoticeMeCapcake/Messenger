import * as React from "react";
import {IconProps} from "@radix-ui/react-icons/dist/types";
import { GearIcon, PersonIcon, QuestionMarkCircledIcon, StarIcon } from '@radix-ui/react-icons';
import { ExoticComponent, ReactNode, RefAttributes } from 'react';

interface IMenuItems {
    title: string;
    icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
    // icon: React.ReactNode;
}

export const MENU_ITEMS: IMenuItems[] = [
    {
        title: "Saved Messages",
        icon: StarIcon,
    },
    {
        title: "Settings",
        icon: GearIcon
    },
    {
        title: "Profile",
        icon: PersonIcon
    },
    {
        title: "About",
        icon: QuestionMarkCircledIcon
    },

]