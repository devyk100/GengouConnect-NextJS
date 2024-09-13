"use client"
import { OptionType, Whiteboard } from "./Whiteboard";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { MouseEvent, useEffect, useState } from "react";
import WhiteboardApi from "./WhiteboardApi";

function setSelected(event: MouseEvent<HTMLButtonElement>) {
    console.log(event.currentTarget.value)
}

type ToolbarOptionType = {
    value: OptionType,
    icon?: string
}

const ToolbarOptions: ToolbarOptionType[] = [
    {
        value: OptionType.Circle
    },
    {
        value: OptionType.Rectangle
    },
    {
        value: OptionType.Line
    }
];

function Toolbar() {
    const [selectedOption, setSelectedOption] = useState<OptionType>()
    useEffect(() => {
        console.log(selectedOption, "did change")
    }, [selectedOption])
    return (
        <ToggleGroup type="single">
            {ToolbarOptions.map((val, i) => (
                <ToggleGroupItem value={val.value} onClick={() => WhiteboardApi.instance.setToolbarOption(val.value)} key={i}>C</ToggleGroupItem>
            ))}
        </ToggleGroup>

    )
}


export default function WhiteboardMain() {
    return (<>
        <ResizablePanelGroup
            direction="horizontal"
            className="max-w-full rounded-lg border md:min-w-[450px]"
        >
            <ResizablePanel defaultSize={80}>
                <Toolbar />
                <Whiteboard />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={20}>
                <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={25}>
                        <div className="flex h-full items-center justify-center p-6">
                            <span className="font-semibold">Two</span>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={75}>
                        <div className="flex h-full items-center justify-center p-6">
                            <span className="font-semibold">Three</span>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup>

    </>)
}