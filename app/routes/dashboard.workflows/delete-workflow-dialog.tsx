
import { useRevalidator } from '@remix-run/react';
import { useMutation } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react'
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '~/components/ui/alert-dialog'
import { Input } from '~/components/ui/input';

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    workflowName: string;
    id: string
}
export default function DeleteWorkFlowDialog({ open, setOpen, workflowName, id }: Props) {
    const [text, setText] = useState("")
    const requestRevalidation = useRevalidator();


    const { mutate, isPending } = useMutation({
        mutationFn: async (workflowId: string) => {
            const response = await fetch("/api/delete-workflow", {
                method: "POST",
                body: JSON.stringify({ id: workflowId }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res_data = await response.json();

            if (res_data.error) {
                throw new Error(res_data.error);
            }

            return;
        },
        onSuccess: () => {
            toast.success("Successfully deleted", { id });
            requestRevalidation.revalidate();
            setText("");
        },
        onError: (error) => {
            toast.error(error.message, { id });
            setText("");
        }
    })

    const onSubmit = useCallback(async () => {
        mutate(id)
    }, [mutate, id])


    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        If you delete this workflow you will not be able to recover it
                        <div className="flex flex-col py-4 gap-2">
                            <p>If you are sure, enter <b>{workflowName}</b> to confirm</p>
                            <Input value={text} onChange={(e) => setText(e.target.value)} />
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel >Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        id="btn"
                        onClick={onSubmit}
                        onKeyDown={(e) => {

                            if (e.key === "Enter") {

                                document.getElementById("btn")?.click()
                            }
                        }
                        }
                        disabled={text !== workflowName || isPending}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
