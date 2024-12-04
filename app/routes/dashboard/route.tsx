import { Outlet } from "@remix-run/react"
import { Separator } from "~/components/ui/separator"
import DesktopSideBar from "./sidebar"
import BreadCrumbHeader from "./breadcrumb"
import { ModeToggle } from "~/components/mode-toggle"

export default function DashBoardLayout() {
    return (
        <div className="flex h-screen">
            <DesktopSideBar />
            <div className="flex flex-col flex-1 min-h-screen">
                <header className="flex items-center justify-between px-6 py-4 h-[50x] container">
                    <BreadCrumbHeader />
                    <div className="ga-1 flex items-center ">
                        <ModeToggle />
                    </div>
                </header>
                <Separator />
                <div className="overflow-auto">
                    <div className="flex-1 container py-4 text-accent-foreground">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
