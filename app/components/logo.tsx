import { Link } from "@remix-run/react"
import { SquareDashedMousePointer } from "lucide-react"
import { cn } from "~/lib/utils"

export default function Logo({
    fontSize = "2xl",
    iconSize = 20
}: {
    fontSize?: string,
    iconSize?: number
}) {

    return (
        <Link
            className={cn(
                "text-2xl font-extrabold flex items-center gap-2",
                fontSize
            )}
            to={"/"}>
            <div className="rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 p-2">
                <SquareDashedMousePointer size={iconSize} className="stroke-white" />
            </div>
            <div>
                <span className="bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent">
                    Flow
                </span>
            </div>
        </Link>
    )
}