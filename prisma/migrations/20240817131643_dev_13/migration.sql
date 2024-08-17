/*
  Warnings:

  - Added the required column `is_user_id_set` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_id_key";

-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_user_id_set" BOOL NOT NULL;
