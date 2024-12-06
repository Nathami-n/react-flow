import { workflow } from "@prisma/client";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Link } from "@remix-run/react";
import { FileIcon, MoreVertical, PlayIcon, ShuffleIcon, TrashIcon, Workflow } from "lucide-react";
import { useState } from "react";
import { WorkFlowStatus } from "types/types";
import { TooltipWrapper } from "~/components";
import { Button, buttonVariants } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";
import DeleteWorkFlowDialog from "./delete-workflow-dialog";

const statusColors = {
    [WorkFlowStatus.DRAFT]: "bg-yellow-400 text-yellow-600",
    [WorkFlowStatus.PUBLISHED]: "bg-primary"
}
export function WorkflowCard({ workflow }: { workflow: workflow }) {
    const isDraft = workflow.status === WorkFlowStatus.DRAFT;
    return (
        <Card className="border-separate border shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/20">
            <CardContent className="p-4 flex items-center justify-between h-[100px]">
                <div className="flex items-center justify-end space-x-3">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center",
                        statusColors[workflow.status as WorkFlowStatus]
                    )}>
                        {isDraft ? <FileIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5 text-white" />}
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-muted-foreground flex items-center">
                            <Link to={`/workflow/editor/${workflow.id}`} className="flex items-center hover:underline">
                                {workflow.name}
                            </Link>
                            {isDraft && <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                Draft</span>}
                        </h3>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Link to={`/workflow/editor/${workflow.id}`} className={cn(
                        buttonVariants({
                            variant: "outline",
                            size: "sm"
                        }),
                        "flex items-center gap-2"
                    )}>
                        <ShuffleIcon size={16} /> Edit
                    </Link>
                    <WorkflowActions workflowId={workflow.id} workflowName={workflow.name} />
                </div>
            </CardContent>

        </Card>
    )
}

function WorkflowActions({ workflowName, workflowId }: { workflowName: string, workflowId: string }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    return (
        <>
            <DeleteWorkFlowDialog
                id={workflowId}
                workflowName={workflowName}
                open={showDeleteDialog}
                setOpen={setShowDeleteDialog}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"outline"} size={"sm"}>
                        <TooltipWrapper content={"More actions"}>
                            <div className="flex items-center justify-center w-full h-full">
                                <MoreVertical size={18} />
                            </div>
                        </TooltipWrapper>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onSelect={() => {
                            setShowDeleteDialog((prev) => !prev);
                        }}
                        className="text-destructive flex items-center gap-2">
                        <TrashIcon size={16} /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>

            </DropdownMenu></>
    )
}