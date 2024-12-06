import { Handle, Position } from "@xyflow/react"
import { ActualTaskInputsType } from "types/types"
import { cn } from "~/lib/utils"
import TaskInputType from "./task-input-type"



export default function NodeInput({ input, nodeId }: {
    input: ActualTaskInputsType,
    nodeId: string,
}) {
    return (
        <div className="flex justify-start relative p-3 bg-secondary w-full">
            <TaskInputType nodeId={nodeId} input={input} />
            {!input.hideHandle && (
                <Handle id={input.name} type="target" className={cn("!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4")} position={Position.Left} />
            )}
        </div>
    )
}
