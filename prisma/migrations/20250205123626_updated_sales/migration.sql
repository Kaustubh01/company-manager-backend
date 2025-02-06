/*
  Warnings:

  - You are about to drop the column `owner_id` on the `Buisness` table. All the data in the column will be lost.
  - Added the required column `business_id` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `business_id` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Buisness" DROP CONSTRAINT "Buisness_owner_id_fkey";

-- AlterTable
ALTER TABLE "Buisness" DROP COLUMN "owner_id";

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "phone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "business_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "business_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Buisness"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Buisness"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
