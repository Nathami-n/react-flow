import { memo } from "react";
import { NodeProps } from "@xyflow/react";
import { TaskRegistry } from "~/lib/workflow/tasks/registry";
import { CustomNodeData } from "types/types";
import NodeCardComponent from "./node-card";
import NodeHeader from "./node-header";
import NodeInputs from "./node-inputs-wrapper";
import NodeInput from "./node-input";


const NodeComponent = memo((props: NodeProps) => {
    const nodeData = props.data as CustomNodeData;

    const task = TaskRegistry[nodeData.task_type];

    return <NodeCardComponent
        isSelected={!!props.selected}
        nodeId={props.id}
    >
        <NodeHeader taskType={nodeData.task_type} />
        <NodeInputs>
            {task.inputs.map(input => (
                <NodeInput
                    key={input.name}
                    nodeId={props.id}
                    input={input}
                />
            ))}
        </NodeInputs>
    </NodeCardComponent>
})

export default NodeComponent;
NodeComponent.displayName = "NodeComponent"