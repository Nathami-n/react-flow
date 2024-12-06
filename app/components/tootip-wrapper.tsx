import React from 'react'
import { Tooltip, TooltipProvider } from './ui/tooltip';
import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';

interface Props {
    children: React.ReactNode;
    content: string;
    side?: "top" | "left" | "right" | "bottom"
}
export default function TooltipWrapper(props: Props) {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {props.children}
                </TooltipTrigger>
                <TooltipContent side={props.side}>
                    {props.content}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
