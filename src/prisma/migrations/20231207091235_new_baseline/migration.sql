/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `matchDatetime` to the `Fixture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tournamentId` to the `Fixture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Fixture` ADD COLUMN `awayTeamScore` INTEGER NULL,
    ADD COLUMN `homeTeamScore` INTEGER NULL,
    ADD COLUMN `matchDatetime` DATETIME(3) NOT NULL,
    ADD COLUMN `tournamentId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Tournament` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tournament_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Team_name_key` ON `Team`(`name`);

-- AddForeignKey
ALTER TABLE `Fixture` ADD CONSTRAINT `Fixture_tournamentId_fkey` FOREIGN KEY (`tournamentId`) REFERENCES `Tournament`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
