-- Table `Grade`
CREATE TABLE `Grade` (
  `idGrade` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (`idGrade`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table `Campus`
CREATE TABLE `Campus` (
  `idCampus` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) DEFAULT NULL,
  `city` VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (`idCampus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table `Users`
CREATE TABLE `Users` (
  `idUser` INT(11) NOT NULL AUTO_INCREMENT,
  `mail` VARCHAR(50) NOT NULL UNIQUE,
  `lastName` VARCHAR(50) DEFAULT NULL,
  `password` VARCHAR(255) DEFAULT NULL,
  `firstName` VARCHAR(50) DEFAULT NULL,
  `isAdmin` TINYINT(1) DEFAULT NULL,
  `idGrade` INT(11) DEFAULT NULL,
  `idCampus` INT(11) NOT NULL,
  PRIMARY KEY (`idUser`),
  KEY `idGrade` (`idGrade`),
  KEY `idCampus` (`idCampus`),
  CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`idGrade`) REFERENCES `Grade` (`idGrade`),
  CONSTRAINT `Users_ibfk_2` FOREIGN KEY (`idCampus`) REFERENCES `Campus` (`idCampus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `CategoryComplaint` (
  `idCategoryComplaint` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (`idCategoryComplaint`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `Video` (
  `idVideo` INT(11) NOT NULL AUTO_INCREMENT,
  `content` TEXT DEFAULT NULL,
  `isGlobal` TINYINT(1) NOT NULL,
  `isAdmin` TINYINT(1) DEFAULT NULL,
  `idCampus` INT(11) NOT NULL,
  `idUser` INT(11) NOT NULL,
  `attachement` VARCHAR(200) DEFAULT NULL,
  PRIMARY KEY (`idVideo`),
  KEY `idCampus` (`idCampus`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `Video_ibfk_1` FOREIGN KEY (`idCampus`) REFERENCES `Campus` (`idCampus`),
  CONSTRAINT `Video_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `Users` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `Comment` (
  `idComment` INT(11) NOT NULL AUTO_INCREMENT,
  `content` TEXT DEFAULT NULL,
  `idVideo` INT(11) NOT NULL,
  PRIMARY KEY (`idComment`),
  KEY `idVideo` (`idVideo`),
  CONSTRAINT `Comment_ibfk_1` FOREIGN KEY (`idVideo`) REFERENCES `Video` (`idVideo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `Complaint` (
  `idComplaint` INT(11) NOT NULL AUTO_INCREMENT,
  `content` TEXT DEFAULT NULL,
  `isGlobal` TINYINT(1) DEFAULT NULL,
  `idCategoryComplaint` INT(11) NOT NULL,
  `idUser` INT(11) NOT NULL,
  PRIMARY KEY (`idComplaint`),
  KEY `idCategoryComplaint` (`idCategoryComplaint`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `Complaint_ibfk_1` FOREIGN KEY (`idCategoryComplaint`) REFERENCES `CategoryComplaint` (`idCategoryComplaint`),
  CONSTRAINT `Complaint_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `Users` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `SatisfactionSurvey` (
  `idSatisfaction` INT(11) NOT NULL AUTO_INCREMENT,
  `courseName` VARCHAR(50) DEFAULT NULL,
  `idUser` INT(11) NOT NULL,
  PRIMARY KEY (`idSatisfaction`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `SatisfactionSurvey_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `Users` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;





CREATE TABLE `GradeSatisfaction` (
  `idSatisfaction` INT(11) NOT NULL AUTO_INCREMENT,
  `idGrade` INT(11) NOT NULL,
  PRIMARY KEY (`idSatisfaction`, `idGrade`),
  KEY `idGrade` (`idGrade`),
  CONSTRAINT `GradeSatisfaction_ibfk_1` FOREIGN KEY (`idSatisfaction`) REFERENCES `SatisfactionSurvey` (`idSatisfaction`),
  CONSTRAINT `GradeSatisfaction_ibfk_2` FOREIGN KEY (`idGrade`) REFERENCES `Grade` (`idGrade`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `Likes` (
  `idUser` INT(11) NOT NULL AUTO_INCREMENT,
  `idVideo` INT(11) NOT NULL,
  PRIMARY KEY (`idUser`, `idVideo`),
  KEY `idVideo` (`idVideo`),
  CONSTRAINT `Likes_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `Users` (`idUser`),
  CONSTRAINT `Likes_ibfk_2` FOREIGN KEY (`idVideo`) REFERENCES `Video` (`idVideo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO Grade (name) VALUES 
('Freshman'), 
('Sophomore'), 
('Junior'), 
('Senior');

INSERT INTO Campus (name, city) VALUES 
('North Campus', 'New York'), 
('South Campus', 'Los Angeles'), 
('East Campus', 'Miami'), 
('West Campus', 'San Francisco');

INSERT INTO Users (mail, lastName, firstName, isAdmin, idGrade, idCampus) VALUES
('john.doe@example.com', 'Doe', 'John', 0, 1, 1), 
('jane.smith@example.com', 'Smith', 'Jane', 0, 2, 2),
('admin@example.com', 'Admin', 'Super', 1, 1, 1);

INSERT INTO CategoryComplaint (title) VALUES 
('Infrastructure'), 
('Course Material'), 
('Teacher Performance'), 
('Administrative Issues');


INSERT INTO Video (content, isGlobal, isAdmin, idCampus, idUser, attachement) VALUES
('Campus Tour Video', 1, 0, 1, 1, 'tour.mp4'),
('Admin Welcome Speech', 1, 1, 2, 3, 'welcome.mp4');

INSERT INTO Comment (content, idVideo) VALUES
('Great video, very informative!', 1),
('This is helpful for new students.', 1);

INSERT INTO Complaint (content, isGlobal, idCategoryComplaint, idUser) VALUES
('The classroom is too cold.', 0, 1, 1),
('The course materials were outdated.', 0, 2, 2);

INSERT INTO SatisfactionSurvey (courseName, idUser) VALUES
('Introduction to Computer Science', 1),
('Advanced Physics', 2);

INSERT INTO GradeSatisfaction (idSatisfaction, idGrade) VALUES
(1, 1), 
(2, 2);

INSERT INTO Likes (idUser, idVideo) VALUES
(1, 1), 
(2, 2);
