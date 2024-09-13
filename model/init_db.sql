--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists goals;
DROP TABLE if exists rewards;
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE `goals`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `goal` VARCHAR(255) NOT NULL,
    `difflevel` INT NOT NULL,
    `dayofweek` VARCHAR(255) NOT NULL,
    `completed` BOOLEAN NOT NULL
);

CREATE TABLE `rewards`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `reward` VARCHAR(255) NOT NULL,
    `gemlevel` VARCHAR(255) NOT NULL
);






