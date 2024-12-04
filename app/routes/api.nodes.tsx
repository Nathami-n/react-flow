import { ActionFunctionArgs } from "@remix-run/node";

import { db } from "~/db/db.server";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method === "POST") {
    const formData = await request.formData();

    const type = formData.get("type") as string;
    const label = formData.get("label") as string;

    if (!type || !label) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    // Assign a default position
    const defaultPosition = { x: 0, y: 0 };

    const newNode = await db.node.create({
      data: {
        type,
        label,
        position: {
          create: defaultPosition,
        },
      },
    });

    return Response.json(newNode, { status: 201});
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 });
}

export async function loader() {
  const nodes = await db.node.findMany({
    include: { sourceFor: true, targetFor: true, position: true },
  });

  const edges = await db.edge.findMany({
    include: { source: true, target: true },
  });

  return { nodes, edges };
}


export default function Page() {
  return null
}