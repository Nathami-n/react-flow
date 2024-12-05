import { useLocation } from "@remix-run/react"
import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "~/components/ui/breadcrumb";
import { MobileSideBar } from "./sidebar";


export default function BreadCrumbHeader() {
    const pathname = useLocation()?.pathname;
    const paths = pathname?.split("/")
    return (
        <div className="flex items-center">
            <MobileSideBar />
            <Breadcrumb>
                <BreadcrumbList>
                    {paths?.map((path, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    className="capitalize"
                                    href={path.includes("dashboard") ? `/${path}` : `/dashboard/${path}`}
                                >
                                    {path == "dashboard" ? "Home" : path}
                                </BreadcrumbLink>{index === 0 ? "" : "/"}
                            </BreadcrumbItem>
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}
