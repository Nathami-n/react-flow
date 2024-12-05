import { db } from "../db.server";

function returnWorkFlows(id: string) {
    return db.workflow.findMany({
        where: {
            userId: id
        },
        orderBy: {
            createdAt: "asc"
        }
    })
}

export {returnWorkFlows}