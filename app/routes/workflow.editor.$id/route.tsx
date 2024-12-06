
import { workflow } from "@prisma/client";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/db/db.server";
import Editor from "./editor/editor";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  try {
    const work = await db.workflow.findUnique({
      where: {
        id
      }
    })

    return json<{ work: workflow | null }>({ work });
  } catch (error) {
    console.error("error getting the workflow");
    return json({ work: null });
  }

}


export default function WorkFlowEditorPage() {
  const { work } = useLoaderData<typeof loader>();
  if (!work) {
    return <div>Workflow not found</div>
  }
  return (
    <Editor workflow={work as unknown as workflow} />
  )
}
