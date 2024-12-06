import { workflow } from '@prisma/client'
import { Background, Controls, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react'
import "@xyflow/react/dist/style.css";
import { TaskType } from 'types/types';
import { CreateFlowNode } from '~/lib/workflow/create-flow';
import NodeComponent from '../custom-node/node-component';
import { useEffect } from 'react';


const nodeTypes = {
    Node: NodeComponent
}


const snapGrid: [number, number] = [10, 10];

export default function FlowEditor({ workflow }: { workflow: workflow }) {

    const [nodes, setNodes, onNodesChange] = useNodesState([

    ]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { setViewport } = useReactFlow();

    useEffect(() => {
        try {
            const flow = JSON.parse(workflow?.definition as string);
            if (!flow) return;
            setNodes(flow.nodes || []);
            setEdges(flow.edges || []);

            if (!flow.viewport) return;

            const { x = 0, y = 0, zoom = 1 } = flow.viewport;
            setViewport({ x, y, zoom });

        } catch (error) {
            console.error('errror parsing the workflow', error);
        }

    }, [workflow.definition, setNodes, setEdges, setViewport])

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
