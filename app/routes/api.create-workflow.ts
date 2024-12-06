import { ActionFunction, json, redirect } from "@remix-run/node";
import { createWorkFlowSchema } from "schema/workflows";
import { CustomNode, TaskType, WorkFlowStatus } from "types/types";
import { db } from "~/db/db.server";
import { id } from "./dashboard.workflows/route";
import { Prisma } from "@prisma/client";
import { CreateFlowNode } from "~/lib/workflow/create-flow";
import { Edge } from "@xyflow/react";

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.json();
    const workflowData = {
      name: formData.name,
      description: formData.description,
    };

    const {
      success,
      data,
      error: validationError,
    } = createWorkFlowSchema.safeParse(workflowData);
    if (!success) {
      return json({ error: validationError }, { status: 400 });
    }

    const initialFlow: { nodes: CustomNode[]; edges: Edge[] } = {
      nodes: [],
      edges: [],
    };

    //add the entry point
    initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));

    const result = await db.workflow.create({
      data: {
        userId: id,
        definition: JSON.stringify(initialFlow),
        ...data,
        status: WorkFlowStatus.DRAFT,
      },
    });

    if (!result) {
      return json({ error: "Failed to create new workflow" }, { status: 500 });
    }

    return json({ success: true, url: `/workflow/editor/${result.id}` });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return json(
          { error: "A workflow with this name already exists." },
          { status: 409 }
        );
      }
    }
    // For other errors, return a generic server error message
    return json({ error: "Server error" }, { status: 500 });
  }
};
