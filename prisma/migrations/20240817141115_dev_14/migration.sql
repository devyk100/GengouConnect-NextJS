/*
  Warnings:

  - Added the required column `is_password_set` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_phone_set` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_password_set" BOOL NOT NULL;
ALTER TABLE "User" ADD COLUMN     "is_phone_set" BOOL NOT NULL;
