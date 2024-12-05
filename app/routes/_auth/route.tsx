import { Outlet } from "@remix-run/react";
import { Logo } from "~/components";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex  justify-center items-center">
            <div>
                <Logo />
                <Outlet />
            </div>

        </div>
    )
}