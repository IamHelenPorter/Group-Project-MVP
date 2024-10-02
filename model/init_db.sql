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
('Sarah', 'Connor', 'sconnor', 'securepass456', 'sarah.connor@example.com', 'doctor', '2024-09-13 11:00:00', '2024-09-13 11:00:00', '1990-07-15', 'https://plus.unsplash.com/premium_photo-1664475450083-5c9eef17a191?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmVtYWxlJTIwZG9jdG9yfGVufDB8fDB8fHww'),
('Alice', 'Smith', 'asmith', 'mypassword789', 'alice.smith@example.com', 'admin', '2024-09-13 12:00:00', '2024-09-13 12:00:00', '1980-11-25', NULL),

('James', 'Bond', 'jbond', 'securepass007', 'james.bond@example.com', 'doctor', '2024-09-13 12:00:00', '2024-09-13 12:00:00', '1975-11-25', 'https://media.istockphoto.com/id/1346124900/photo/confident-successful-mature-doctor-at-hospital.jpg?s=612x612&w=0&k=20&c=S93n5iTDVG3_kJ9euNNUKVl9pgXTOdVQcI_oDGG-QlE='),
('Emily', 'Stone', 'estone', 'password123', 'emily.stone@example.com', 'doctor', '2024-09-14 09:00:00', '2024-09-14 09:00:00', '1985-06-10', 'https://media.istockphoto.com/id/638647058/photo/we-offer-our-patients-premium-healthcare-here.jpg?s=612x612&w=0&k=20&c=pek5ehwgsZNPemeEh4bObQ1U5DRPEs0WHleosG-daa8='),
('Michael', 'Johnson', 'mjohnson', 'strongpass456', 'michael.johnson@example.com', 'doctor', '2024-09-14 10:30:00', '2024-09-14 10:30:00', '1978-04-17', 'https://media.istockphoto.com/id/1390000431/photo/shot-of-a-mature-doctor-using-a-digital-tablet-in-a-modern-hospital.jpg?s=612x612&w=0&k=20&c=ofnikeDwvLhhEvLpSuQME5kWclGchqUKSHQFdQ4mcWo='),
('Laura', 'Williams', 'lwilliams', 'safePass789', 'laura.williams@example.com', 'doctor', '2024-09-15 11:00:00', '2024-09-15 11:00:00', '1982-03-21', 'https://t3.ftcdn.net/jpg/00/79/71/30/360_F_79713072_dWCAZt6wPNFG5PqooCxAGsl4Mza7UfVy.jpg'),
('David', 'Brown', 'dbrown', 'passdbrown123', 'david.brown@example.com', 'doctor', '2024-09-16 08:30:00', '2024-09-16 08:30:00', '1987-07-30', 'https://media.istockphoto.com/id/1212177444/photo/happy-male-doctor-of-indian-ethnicity.jpg?s=612x612&w=0&k=20&c=q5Hv1bcmMOiocprvNxpQgtqcbNcPltBnhZILdUE8BjQ='),



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

INSERT INTO `appointments` (`user_id`, `doctor_id`, `start_time`, `status`) 
VALUES 
(13, 1, '2024-11-28 06:30:00', 'booked'),
(13, 6, '2024-10-08 08:30:00', 'booked'),
(13, 4, '2024-12-06 09:00:00', 'booked'),
(13, 3, '2024-12-19 16:00:00', 'booked'),
(13, 5, '2024-11-14 08:00:00', 'booked'),
(14, 3, '2024-12-20 17:30:00', 'booked'),
(14, 2, '2024-12-27 00:00:00', 'booked'),
(14, 6, '2024-12-10 00:30:00', 'booked'),
(14, 6, '2024-11-12 18:00:00', 'booked'),
(14, 1, '2024-10-26 21:30:00', 'booked'),
(15, 6, '2024-10-18 14:00:00', 'booked'),
(15, 4, '2024-12-19 02:30:00', 'booked'),
(15, 1, '2024-10-10 02:30:00', 'booked'),
(15, 5, '2024-11-18 12:00:00', 'booked'),
(15, 2, '2024-12-19 12:00:00', 'booked'),
(17, 2, '2024-12-01 03:00:00', 'booked'),
(17, 4, '2024-12-29 02:00:00', 'booked'),
(17, 6, '2024-12-11 22:30:00', 'booked'),
(17, 2, '2024-10-18 11:00:00', 'booked'),
(17, 3, '2024-10-30 16:00:00', 'booked');


