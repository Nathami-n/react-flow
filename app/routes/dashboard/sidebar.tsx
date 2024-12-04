import { Link, useNavigation } from "@remix-run/react"
import { CoinsIcon, HomeIcon, Layers2Icon, ShieldIcon } from "lucide-react"
import { Logo } from "~/components"
import { buttonVariants } from "~/components/ui/button"



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
