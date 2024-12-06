import { ActionFunctionArgs, ActionFunction, json } from "@remix-run/node";
import { WorkFlowStatus } from "types/types";
import { db } from "~/db/db.server";

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  try {
    const { id, definition } = await request.json();

    const workflow = await db.workflow.findUnique({
      where: {
        id,
      },
    });

    if (!workflow) {
      return json(
        {
          error: "Workflow not found",
          success: false,
        },
        { status: 400 }
      );
    }

    if (workflow.status !== WorkFlowStatus.DRAFT) {
      return json(
        {
          error: "workflow is not a draft",
          success: false,
        },
        { status: 403 }
      );
    }

    await db.workflow.update({
      data: {
        definition,
      },
      where: {
        id,
      },
    });

    return json({
      success: true,
      error: null,
    });
  } catch (error) {
    return json(
      {
        error: "A server error has occurred",
        success: false,
      },
      { status: 500 }
    );
  }
};
