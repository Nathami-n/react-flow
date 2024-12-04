
import { ReactFlow, addEdge, MiniMap, Controls, Background} from "@xyflow/react"

import '@xyflow/react/dist/style.css';
import { useCallback } from "react"
export default function Flow({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange
}) {
    
    const onConnect = useCallback((connection) => {
        onEdgesChange(eds => addEdge(connection, eds))
    }, [])

    
    
    return (


        <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            onConnect={onConnect}
        >
            <Background />
            <MiniMap />
            <Controls />
        </ReactFlow>
    )
}