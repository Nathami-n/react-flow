import { useNavigate } from "@remix-run/react";
import { ChevronLeftIcon } from "lucide-react";
import { TooltipWrapper } from "~/components";
import { Button } from "~/components/ui/button";
import SaveWorkflowButton from "./save-button";

interface Props {
    title: string;
    subtitle?: string;
    workflowId: string;
}
export default function TopBar({ title, subtitle, workflowId }: Props) {
    const router = useNavigate();
    return (
        <header className="flex p-2 border-p-2 border-separate justify-between w-full h-[60x] sticky top-0 bg-background z-10">
            <div className="flex gap-1 flex-1">
                <TooltipWrapper content="Back">
                    <Button
                        onClick={() => router("/dashboard/workflows")}
                        variant={"ghost"}>
                        <ChevronLeftIcon size={20} />
                    </Button>
                </TooltipWrapper>
                <div>
                    <p className="font-bold text-ellipsis truncate">{title}</p>
                    {subtitle && (
                        <p className="text-xs text-muted-foreground truncate text-ellipsis">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
            <SaveWorkflowButton workflowId={workflowId}/>
        </header>
    )
}
