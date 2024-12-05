import { LoaderFunction, defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { AlertCircle, InboxIcon } from "lucide-react";
import { Suspense } from "react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Skeleton } from "~/components/ui/skeleton";
import { returnWorkFlows } from "~/db/actions/stream";



export const id = "123"

export const loader: LoaderFunction = async () => {
    try {
        return defer({ data: returnWorkFlows(id) });

    } catch (error) {
        if (error instanceof Error) {
            console.error("error fetching workflows", error);
            throw new Response("Error fetching workflows", { status: 500 });
        }
    }
}

export default function WorkFlows() {
    return (
        <div className="flex-1 flex flex-col h-full">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold">Workflows</h1>
                    <p className="text-muted-foreground">Manage your workflows</p>
                </div>
            </div>

            <div className="h-full py-6">

                <UserWorkFlows />

            </div>
        </div>
    );
}

function UserWorkFlowSkeleton() {
    return (
        <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton className="h-32 w-full" key={index} />
            ))}
        </div>
    );
}

function UserWorkFlows() {
    const { data } = useLoaderData<typeof loader>();
    console.log(data)

    return (
        <Suspense fallback={<UserWorkFlowSkeleton />}>
            <Await
                resolve={data}
                errorElement={
                    <Alert variant={"destructive"}>
                        <AlertCircle className="w-4 h-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>Something went wrong, please try again later</AlertDescription>
                    </Alert>
                }
            >
                {(workflows) => {
                    console.log(workflows)
                    if (workflows.length == 0) {
                        return (
                            <div className="flex flex-col gap-4 h-full items-center justify-center">
                                <div className="rounded-full bg-accent w-20 h-20 flex justify-center items-center">
                                    <InboxIcon size={40} className="stroke-primary" />
                                </div>
                                <div className="flex flex-col gap-1 text-center">
                                    <p className="font-bold">No workflows created yet</p>
                                </div>
                            </div>
                        );
                    }


                }}
            </Await>
        </Suspense>
    );
}
