import { Link, useNavigation } from "@remix-run/react"
import { CoinsIcon, HomeIcon, Layers2Icon, MenuIcon, ShieldIcon } from "lucide-react"
import { useState } from "react"
import { Logo } from "~/components"
import { Button, buttonVariants } from "~/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "~/components/ui/sheet"



const routes = [
    {
        href: "",
        label: "Home",
        icon: HomeIcon
    },
    {
        href: "workflows",
        label: "Workflows",
        icon: Layers2Icon
    },
    {
        href: "credentials",
        label: "Credentials",
        icon: ShieldIcon,
    },
    {
        href: "billing",
        label: "Billing",
        icon: CoinsIcon
    }
]
export default function DesktopSideBar() {
    const pathname = useNavigation().location?.pathname;

    const activeRoute = routes.find((route) => route.href.length > 0 && pathname?.includes(route.href) || routes[0]);

    return (
        <div className="hidden relative md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate">
            <div className="flex items-center justify-center gap-2 border-b-[1px] p-4 border-separate">
                <Logo />
            </div>
            <div className="p-2">Todo Credits</div>
            <div className=" flex flex-col p-2 gap-y-1">
                {routes.map((route) => (
                    <Link
                        className={buttonVariants({
                            variant: activeRoute?.href === route.href ? "sidebarActiveItem" : "sidebarItem"
                        })}
                        to={route.href}
                        key={route.href}>
                        <route.icon size={20} />
                        {route.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}


export function MobileSideBar() {
    const pathname = useNavigation().location?.pathname;
    const [isOpen, setOpen] = useState(false);

    const activeRoute = routes.find((route) => route.href.length > 0 && pathname?.includes(route.href) || routes[0]);
    return (
        <div className="block border-separate bg-background md:hidden">
            <nav className="container flex items-center justify-between px-8">
                <Sheet open={isOpen} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant={"ghost"} size={"icon"} >
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side={"left"} className="w-[400px] sm:w-[540px] space-y-4">
                        <Logo />
                        <div className=" flex flex-col p-2 gap-y-1">
                            {routes.map((route) => (
                                <Link
                                    onClick={() => setOpen(!isOpen)}
                                    className={buttonVariants({
                                        variant: activeRoute?.href === route.href ? "sidebarActiveItem" : "sidebarItem"
                                    })}
                                    to={route.href}
                                    key={route.href}>
                                    <route.icon size={20} />
                                    {route.label}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>

    )
}