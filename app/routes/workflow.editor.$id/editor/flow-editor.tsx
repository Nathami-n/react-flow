import { workflow } from '@prisma/client'
import { Background, Controls, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react'
import "@xyflow/react/dist/style.css";
import { TaskType } from 'types/types';
import { CreateFlowNode } from '~/lib/workflow/create-flow';
import NodeComponent from '../custom-node/node-component';


const nodeTypes = {
    Node: NodeComponent
}


const snapGrid: [number, number] = [10, 10];

export default function FlowEditor({ workflow }: { workflow: workflow }) {

    const [nodes, setNodes, onNodesChange] = useNodesState([
        CreateFlowNode(TaskType.LAUNCH_BROWSER)
    ]);

    
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);


    return (
        <main className='h-full w-full'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes} // custom node
                snapGrid={snapGrid}
                snapToGrid
                fitViewOptions={
                    {
                        padding: 1
                    }
                }
                fitView
            >
                <Controls position='top-left' fitViewOptions={{ padding: 1 }} />
                <Background gap={12} />
            </ReactFlow>
        </main>
    )
}
