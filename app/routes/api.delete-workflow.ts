import { json } from "@remix-run/node";
import { ActionFunction, ActionFunctionArgs } from "@remix-run/node";
import { db } from "~/db/db.server";

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  try {
    const { id } = await request.json();

    const item = await db.workflow.delete({
      where: {
        id,
      },
    });

    if (!item) {
      return json(
        {
          error: "Item not found. It must have been deleted",
          success: false,
        },
        { status: 404 }
      );
    }

    return json({ success: true, error: null });
  } catch (error) {
    return json(
      {
        error: "A server error occurred, please try again later",
        success: false,
      },
      { status: 500 }
    );
  }
};
