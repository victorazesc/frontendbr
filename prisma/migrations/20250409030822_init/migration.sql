-- CreateEnum
CREATE TYPE "RepositorySource" AS ENUM ('GITHUB', 'FRONTENDBR', 'LINKEDIN');

-- CreateTable
CREATE TABLE "Job" (
    "id" UUID NOT NULL,
    "repository" "RepositorySource" NOT NULL,
    "title" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'open',
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "closedAt" TIMESTAMP(3),
    "authorAssociation" TEXT,
    "type" TEXT,
    "body" TEXT NOT NULL,
    "companyName" TEXT,
    "companyDomain" TEXT,
    "companyIcon" TEXT,
    "hasSalaryInfo" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT,
    "subscriptionAction" TEXT,
    "companyId" UUID,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Label" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Label_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT,
    "icon" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JobLabels" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_JobLabels_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_JobLabels_B_index" ON "_JobLabels"("B");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobLabels" ADD CONSTRAINT "_JobLabels_A_fkey" FOREIGN KEY ("A") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobLabels" ADD CONSTRAINT "_JobLabels_B_fkey" FOREIGN KEY ("B") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;
