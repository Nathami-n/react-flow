import { DialogTrigger } from "@radix-ui/react-dialog";
import { Layers2Icon, Loader2Icon } from "lucide-react";
import { useCallback, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form";
import { createWorkFlowSchema, WorkFlowSchema } from "schema/workflows";
import { z } from "zod";
import { CustomDialogHeader } from "~/components";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "@remix-run/react";


export function CreateWorkFlowDialog({
    triggerText
}: {
    triggerText?: string;
}) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const form = useForm<WorkFlowSchema>({
        resolver: zodResolver(createWorkFlowSchema),
        defaultValues: {},
    })

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: WorkFlowSchema) => {
            const response = await fetch("/api/create-workflow", {
                method: "POST",
                body: JSON.stringify(data),
            })
            const res = await response.json();

            if (!response.ok) {
                throw new Error(res.error);
            }
            return res.url;
        },
        onSuccess: (url) => {
            toast.success("Workflow created", { id: "create-workflow" });
            navigate(url);
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message);
        }
    })


    const onSubmit: SubmitHandler<WorkFlowSchema> = useCallback((data) => {
        mutate(data)
    }, [mutate])

    return <Dialog open={open} onOpenChange={() => {
        form.reset()
        setOpen(!open)
    }
    }>
        <DialogTrigger asChild>
            <Button>
                {triggerText ?? "Create workflow"}
            </Button>
        </DialogTrigger>

        <DialogContent className="px-0">
            <CustomDialogHeader
                icon={Layers2Icon}
                title="Create workflow"
                subTitle="Start building your workflow"
            />
            <div className="p-6">
                <Form {...form}>
                    <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="flex gap-1 items-center">
                                        Name
                                        <p className="text-xs text-primary">(required)</p>
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Choose a descriptive and unique name for workflow
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="flex gap-1 items-center">
                                        Description
                                        <p className="text-xs text-primary">(optional)</p>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea className="resize-none" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Provide a brief description of what your workflow does. This is optional but can help with remembering the purpose of the workflow
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full">
                            {isPending ? <Loader2Icon className="animate-spin" /> : "Proceed"}
                        </Button>
                    </form>

                </Form>
            </div>
        </DialogContent>

    </Dialog>
}