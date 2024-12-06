
import { useFetcher } from "@remix-run/react";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { CheckCircleIcon } from "lucide-react";

import { toast } from "sonner";
import { Button } from "~/components/ui/button";


export default function SaveWorkflowButton({ workflowId }: {
    workflowId: string
}) {
    const { toObject } = useReactFlow();
    const fetcher = useFetcher();
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: { id: string, definition: string }) => {
            const response = await fetch("/api/update-workflow", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                },

            });

            const d = await response.json();


            if (d.error) {
                throw new Error(d.error);
            }

            return;
        },
        onError: (error) => {
            toast.error(error.message, { id: workflowId });
        },
        onSuccess: () => {
            toast.success("Workflow saved successfully", { id: workflowId });
            fetcher.load("/dashboard/workflows");
        }
    })
    return (
        <Button
            disabled={isPending}
            onClick={() => {

                const workflowDefininition = JSON.stringify(toObject())
                toast.loading("saving workflow", { id: workflowId })
                mutate({
                    id: workflowId,
                    definition: workflowDefininition
                })
            }}
            className="flex items-center gap-2"
            variant={"outline"}>
            <CheckCircleIcon size={16} className="stroke-primary" />
            Save</Button>
    )
}
