--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists appointments;
DROP TABLE if exists hospitals;
DROP TABLE if exists user;
DROP TABLE if exists doctor;
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE `user`(
    `user_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `role` ENUM('patient', 'doctor', 'admin') NOT NULL,
    `created_at`  DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `date_of_birth` DATE NOT NULL,
    `image` VARCHAR(255) NULL
);

CREATE TABLE `doctor`(
    `doctor_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `speciality` VARCHAR(255) NOT NULL,
    `hospital_id` INT NOT NULL,
    `qualifications` VARCHAR(255) NOT NULL
);

CREATE TABLE `hospitals`(
    `hospital_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `emergency` BOOLEAN NULL,
    `departments` VARCHAR(255) NOT NULL
);

CREATE TABLE `appointments`(
    `appointment_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NULL,
    `doctor_id` INT NOT NULL,
    `start_time` DATETIME NOT NULL,
    `status` ENUM(
        'booked',
        'cancelled',
        'completed'
    ) NOT NULL,
    `created_at`  DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


ALTER TABLE
    `doctor` ADD CONSTRAINT `doctor_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `user`(`user_id`);
ALTER TABLE
    `appointments` ADD CONSTRAINT `appointments_doctor_id_foreign` FOREIGN KEY(`doctor_id`) REFERENCES `doctor`(`doctor_id`);
ALTER TABLE
    `appointments` ADD CONSTRAINT `appointments_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `user`(`user_id`);
ALTER TABLE
    `doctor` ADD CONSTRAINT `doctor_hospital_id_foreign` FOREIGN KEY(`hospital_id`) REFERENCES `hospitals`(`hospital_id`);

INSERT INTO `user` (`first_name`, `last_name`, `username`, `password`, `email`, `role`, `created_at`, `updated_at`, `date_of_birth`, `image`) 
VALUES 
('John', 'Doe', 'johndoe', 'password123', 'john.doe@example.com', 'patient', '2024-09-13 10:00:00', '2024-09-13 10:00:00', '1985-05-12', NULL),
('Sarah', 'Connor', 'sconnor', 'securepass456', 'sarah.connor@example.com', 'doctor', '2024-09-13 11:00:00', '2024-09-13 11:00:00', '1990-07-15', 'sarah_profile.jpg'),
('Alice', 'Smith', 'asmith', 'mypassword789', 'alice.smith@example.com', 'admin', '2024-09-13 12:00:00', '2024-09-13 12:00:00', '1980-11-25', NULL),
('James', 'Bond', 'jbond', 'securepass007', 'james.bond@example.com', 'doctor', '2024-09-13 12:00:00', '2024-09-13 12:00:00', '1975-11-25', NULL),
('Emily', 'Stone', 'estone', 'password123', 'emily.stone@example.com', 'doctor', '2024-09-14 09:00:00', '2024-09-14 09:00:00', '1985-06-10', NULL),
('Michael', 'Johnson', 'mjohnson', 'strongpass456', 'michael.johnson@example.com', 'doctor', '2024-09-14 10:30:00', '2024-09-14 10:30:00', '1978-04-17', NULL),
('Laura', 'Williams', 'lwilliams', 'safePass789', 'laura.williams@example.com', 'doctor', '2024-09-15 11:00:00', '2024-09-15 11:00:00', '1982-03-21', 'laura_profile.jpg'),
('David', 'Brown', 'dbrown', 'passdbrown123', 'david.brown@example.com', 'doctor', '2024-09-16 08:30:00', '2024-09-16 08:30:00', '1987-07-30', 'david_profile.jpg');


INSERT INTO hospitals (name, address, emergency, departments)
VALUES ('Songdo Hospital', 'Sambuu Street 32, Ulaanbaatar, Mongolia', true, 'General Surgery, Urology, Cardiology');
INSERT INTO hospitals (name, address, emergency, departments)
VALUES ('Mongolia-Japan Teaching Hospital', 'Bayanzurkh District, Ulaanbaatar, Mongolia', true, 'Internal Medicine, Neurology, Orthopedics');
INSERT INTO hospitals (name, address, emergency, departments)
VALUES ('Grand Med Hospital', 'Chinggis Avenue 16, Ulaanbaatar, Mongolia', true, 'Radiology, Imaging, Orthopedics, Orthopedic Surgery');


INSERT INTO `doctor` (`user_id`, `speciality`, `hospital_id`, `qualifications`)
VALUES 
(2, 'Neurology', 2, 'MBBS, MD (Neurology)'),            -- Sarah Connor at Mongolia-Japan Teaching Hospital (hospital_id = 2)
(4, 'Orthopedics', 3, 'MBBS, MS (Orthopedic Surgery)'),  -- James Bond at Grand Med Hospital (hospital_id = 3)
(5, 'Cardiology', 1, 'MBBS, MD (Cardiology)'),           -- Emily Stone at Songdo Hospital (hospital_id = 1)
(6, 'Neurology', 2, 'MBBS, MD (Neurology)'),             -- Michael Johnson at Mongolia-Japan Teaching Hospital (hospital_id = 2)
(7, 'Pediatrics', 1, 'MBBS, MD (Pediatrics)'),           -- Laura Williams at Songdo Hospital (hospital_id = 1)
(8, 'Dermatology', 3, 'MBBS, MD (Dermatology)');         -- David Brown at Grand Med Hospital (hospital_id = 3)
