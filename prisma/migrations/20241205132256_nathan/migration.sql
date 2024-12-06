/*
  Warnings:

  - You are about to drop the column `descrition` on the `workflow` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_workflow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "definition" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_workflow" ("createdAt", "definition", "id", "name", "status", "updatedAt", "userId") SELECT "createdAt", "definition", "id", "name", "status", "updatedAt", "userId" FROM "workflow";
DROP TABLE "workflow";
ALTER TABLE "new_workflow" RENAME TO "workflow";
CREATE UNIQUE INDEX "workflow_name_userId_key" ON "workflow"("name", "userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
