import { useLocation } from "@remix-run/react"
import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "~/components/ui/breadcrumb";


export default function BreadCrumbHeader() {
    const pathname = useLocation()?.pathname;
    console.log(pathname)
    const paths = pathname?.split("/")
    return (
        <div className="flex items-center">
            <Breadcrumb>
                <BreadcrumbList>
                    {paths?.map((path, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    className="capitalize"
                                    href={`/${path}`}
                                >
                                    {path == "dashboard" ? "Home" : path}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}
