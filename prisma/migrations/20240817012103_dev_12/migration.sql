/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_picture` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `register_method` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterSequence
ALTER SEQUENCE "ConversationToUserMapping_id_seq" MAXVALUE 9223372036854775807;

-- AlterSequence
ALTER SEQUENCE "Course_id_seq" MAXVALUE 9223372036854775807;

-- AlterSequence
ALTER SEQUENCE "Lesson_id_seq" MAXVALUE 9223372036854775807;

-- AlterSequence
ALTER SEQUENCE "MultiChoiceQuestion_id_seq" MAXVALUE 9223372036854775807;

-- AlterSequence
ALTER SEQUENCE "UserFlashCardGroup_id_seq" MAXVALUE 9223372036854775807;

-- AlterSequence
ALTER SEQUENCE "WhiteboardEvent_id_seq" MAXVALUE 9223372036854775807;

-- AlterSequence
ALTER SEQUENCE "WhiteboardSlide_id_seq" MAXVALUE 9223372036854775807;

-- CreateEnum
CREATE TYPE "RegisterMethod" AS ENUM ('Google', 'Github', 'Email');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" STRING NOT NULL;
ALTER TABLE "User" ADD COLUMN     "profile_picture" STRING NOT NULL;
ALTER TABLE "User" ADD COLUMN     "register_method" "RegisterMethod" NOT NULL;
