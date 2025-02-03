-- CreateTable
CREATE TABLE "Buisness" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "admin_id" INTEGER NOT NULL,

    CONSTRAINT "Buisness_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Buisness" ADD CONSTRAINT "Buisness_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
