
import { ActualTaskInputsType, CustomNode, TaskInputType, } from 'types/types'
import { useReactFlow } from '@xyflow/react'
import { useCallback } from 'react'
import StringInput from '../task-input-type-inputs/string'

export default function TaskInput({ input, nodeId }: {
    input: ActualTaskInputsType,
    nodeId: string
}) {

    const { updateNodeData, getNode } = useReactFlow();
    const node = getNode(nodeId) as CustomNode;
    const value = node?.data?.inputs[input.name];

    const updateNodeInputValue = useCallback((newValue: string) => {
        updateNodeData(nodeId, {
            inputs: {
                ...node?.data.inputs,
                [input.name]: newValue
            }
        })

    }, [updateNodeData, input.name, node?.data.inputs, nodeId]);
    switch (input.input_type) {
        case TaskInputType.STRING:
            return <StringInput
                input={input}
                value={value}
                updateNodeInputValue={updateNodeInputValue} />
        default: {
            return (
                <div className='w-full'>
                    <p className="text-xs text-muted-foreground">
                        Not implemented
                    </p>
                </div>
            )
        }
    }
}
