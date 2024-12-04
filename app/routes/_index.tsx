import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { useState } from "react";

import Flow from "~/components/flow"
import { db } from "~/db/db.server";



export async function loader() {
  const nodes = await db.node.findMany({
    include: { sourceFor: true, targetFor: true, position: true },
  });

  const edges = await db.edge.findMany({
    include: { source: true, target: true },
  });


  const customNodes = [];

  for (const n of nodes) {
    let customNode = {
      id: n.id,
      position: {
        x: n.position.x,
        y: n.position.y
      },
      data: {
        label: n.label
      }
    }

    customNodes.push(customNode);
  }
  return { customNodes, edges };
}


export default function Index() {
  const { customNodes, edges } = useLoaderData<typeof loader>();

console.log(customNodes)

  const [flowNodes, setNodes] = useState(customNodes);
  const [flowEdges, setEdges] = useState(edges);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw"
      }}
    >
      <Flow
        nodes={customNodes}
        edges={flowEdges}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
      />

    </div>
  )
}