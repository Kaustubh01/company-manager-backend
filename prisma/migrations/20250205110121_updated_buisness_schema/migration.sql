/*
  Warnings:

  - You are about to drop the column `admin_id` on the `Buisness` table. All the data in the column will be lost.
  - Added the required column `owner_id` to the `Buisness` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Buisness` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Buisness" DROP CONSTRAINT "Buisness_admin_id_fkey";

-- AlterTable
ALTER TABLE "Buisness" DROP COLUMN "admin_id",
ADD COLUMN     "owner_id" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Buisness" ADD CONSTRAINT "Buisness_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
