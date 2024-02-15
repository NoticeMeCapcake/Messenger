import React, {ReactNode} from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

interface IProps {
    trigger: ReactNode,
    text: string
}

const TooltipDemo = ({trigger, text} : IProps) => {
    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    {trigger}
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content className="TooltipContent" sideOffset={1}>
                        {text}
                        <Tooltip.Arrow className="TooltipArrow" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
};

export default TooltipDemo;