import { Outlet } from "@remix-run/react";
import { Logo } from "~/components";
import { ModeToggle } from "~/components/mode-toggle";
import { Separator } from "~/components/ui/separator";

export default function WorkFlowLayout() {
    return (
        <div className="flex flex-col w-full h-screen">
            <Outlet />
            <Separator />
            <footer className="flex items-center justify-between p-2">
                <Logo iconSize={16} fontSize="text-xl" />
                <ModeToggle />
            </footer>

        </div>
    )
}