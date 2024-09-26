-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : jeu. 26 sep. 2024 à 14:12
-- Version du serveur : 10.3.39-MariaDB-0+deb10u1
-- Version de PHP : 8.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dblogin8096`
--

-- --------------------------------------------------------

--
-- Structure de la table `Campus`
--

CREATE TABLE `Campus` (
  `idCampus` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Campus`
--

INSERT INTO `Campus` (`idCampus`, `name`, `city`, `img`) VALUES
(1, 'PARIS', 'PARIS', '/paris.jpg'),
(2, 'ANGER', 'ANGER', ''),
(3, 'ARRAS', 'ARRAS', '/arras.png'),
(4, 'AUXERRE', 'AUXERRE', ''),
(5, 'BORDEAUX', 'BORDEAUX', ''),
(6, 'CHARTRES', 'CHARTRES', ''),
(7, 'GRENOBLE', 'GRENOBLE', ''),
(8, 'LILLE', 'LILLE', '/lille.jpg'),
(9, 'LYON', 'LYON', ''),
(10, 'MONTPELLIER', 'MONTPELLIER', '/montpellier.jpg'),
(11, 'NANTES', 'NANTES', ''),
(12, 'REIMS', 'REIMS', ''),
(13, 'RENNES', 'RENNES', ''),
(14, 'SAINT-ETIENNE', 'SAINT-ETIENNE', ''),
(15, 'TOULOUSE', 'TOULOUSE', '');

-- --------------------------------------------------------

--
-- Structure de la table `CategoryComplaint`
--

CREATE TABLE `CategoryComplaint` (
  `idCategoryComplaint` int(11) NOT NULL,
  `title` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `CategoryComplaint`
--

INSERT INTO `CategoryComplaint` (`idCategoryComplaint`, `title`) VALUES
(1, 'Infrastructure'),
(2, 'Matériel de cours'),
(3, 'Problème pédagogique'),
(4, 'Problème administratif');

-- --------------------------------------------------------

--
-- Structure de la table `Comment`
--

CREATE TABLE `Comment` (
  `idComment` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `idVideo` int(11) NOT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Comment`
--

INSERT INTO `Comment` (`idComment`, `content`, `idVideo`, `idUser`) VALUES
(3, 'Ceci est un commentaire', 1, 2),
(8, 'Please', 1, 4),
(9, 'Ah', 1, 4);

-- --------------------------------------------------------

--
-- Structure de la table `Complaint`
--

CREATE TABLE `Complaint` (
  `idComplaint` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `isGlobal` tinyint(1) DEFAULT NULL,
  `idCategoryComplaint` int(11) NOT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Complaint`
--

INSERT INTO `Complaint` (`idComplaint`, `content`, `isGlobal`, `idCategoryComplaint`, `idUser`) VALUES
(1, 'The classroom is too cold.', 0, 1, 1),
(2, 'The course materials were outdated.', 0, 2, 2),
(3, 'ssss', 1, 2, 4),
(4, 'hello', 1, 3, 4);

-- --------------------------------------------------------

--
-- Structure de la table `Grade`
--

CREATE TABLE `Grade` (
  `idGrade` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Grade`
--

INSERT INTO `Grade` (`idGrade`, `name`) VALUES
(1, 'SN1'),
(2, 'SN2'),
(3, 'B3'),
(4, 'I1'),
(5, 'I2');

-- --------------------------------------------------------

--
-- Structure de la table `GradeSatisfaction`
--

CREATE TABLE `GradeSatisfaction` (
  `idSatisfaction` int(11) NOT NULL,
  `idGrade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `GradeSatisfaction`
--

INSERT INTO `GradeSatisfaction` (`idSatisfaction`, `idGrade`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Structure de la table `Likes`
--

CREATE TABLE `Likes` (
  `idUser` int(11) NOT NULL,
  `idVideo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Likes`
--

INSERT INTO `Likes` (`idUser`, `idVideo`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Structure de la table `Message`
--

CREATE TABLE `Message` (
  `idMessage` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `dateSended` datetime DEFAULT NULL,
  `idUserSender` int(11) NOT NULL,
  `idUserReceiver` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Message`
--

INSERT INTO `Message` (`idMessage`, `content`, `dateSended`, `idUserSender`, `idUserReceiver`) VALUES
(7, 'Salut ! Tu as vu la dernière vidéo du BDE ? ', '2024-09-26 16:07:55', 4, 1),
(8, 'Oui, ça a l\'air incroyable ce qu\'ils ont prévu !', '2024-09-26 16:10:02', 1, 4),
(9, 'Salut ! Tu as vu la dernière vidéo du BDE ? ', '2024-09-26 16:10:11', 10, 13),
(10, 'Oui, ça a l\'air incroyable ce qu\'ils ont prévu !', '2024-09-26 16:09:24', 13, 10);

-- --------------------------------------------------------

--
-- Structure de la table `SatisfactionSurvey`
--

CREATE TABLE `SatisfactionSurvey` (
  `idSatisfaction` int(11) NOT NULL,
  `courseName` varchar(50) DEFAULT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `SatisfactionSurvey`
--

INSERT INTO `SatisfactionSurvey` (`idSatisfaction`, `courseName`, `idUser`) VALUES
(1, 'Introduction to Computer Science', 1),
(2, 'Advanced Physics', 2);

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `idUser` int(11) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `idGrade` int(11) DEFAULT NULL,
  `idCampus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`idUser`, `mail`, `lastName`, `password`, `firstName`, `isAdmin`, `idGrade`, `idCampus`) VALUES
(1, 'john.doe@example.com', 'Doe', NULL, 'John', 0, 1, 1),
(2, 'jane.smith@example.com', 'Smith', NULL, 'Jane', 0, 2, 2),
(3, 'admin@example.com', 'Admin', NULL, 'Super', 1, 1, 1),
(4, 'poteaux.agathe@gmail.com', 'Poteaux', '$2a$10$3tDz5WKgwv9iafRmDVi48O.gj4BQc4oLzGXg4nMeXoDL4vXEWyrEy', 'Agathe', 1, 1, 1),
(8, 'agathe.poteaux@campus-cd.com', 'Poteaux', '$2a$10$LzM5nNSp707BFuuPCgT/3OWSByIrGBKdKEwP34RUIiSd4P8hO3soS', 'Agathe', 1, 1, 10),
(9, 'test@campus-cd.com', 'test', '$2a$10$SCdlzqRR6.JYRNHX632n0.E/s07VYccdPMVo5tcEYZLdiboAmFl9i', 'test', 1, 1, 13),
(10, 'agathe.poteaux@ecoles-epsi.net', 'Poteaux', '$2a$10$vE.rj.3vu5t24JarNNrctuac8rtScrpCDVvr5cPj7YFe.nrYXcnVG', 'Agathe', 0, 1, 8),
(13, 'clement.parisot@ecoles-epsi.net', 'PARISOT', '$2a$10$ZIfZUIwfoNtzoHMpPcWLEOZbf/pyJ/F/3mJj2tjI4Ff3wYJ4Q8xgm', 'Clément', 0, 1, 3);

-- --------------------------------------------------------

--
-- Structure de la table `Video`
--

CREATE TABLE `Video` (
  `idVideo` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `isGlobal` tinyint(1) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `idCampus` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `attachement` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Video`
--

INSERT INTO `Video` (`idVideo`, `content`, `isGlobal`, `isAdmin`, `idCampus`, `idUser`, `attachement`) VALUES
(1, 'Campus Tour Video', 1, 0, 1, 1, 'tour.mp4'),
(2, 'Admin Welcome Speech', 1, 1, 2, 3, 'welcome.mp4'),
(3, 'Une vidéo', 0, 0, 3, 13, 'video-1727338672724.mp4'),
(4, 'Une autre vidéo', 0, 0, 3, 13, 'video-1727338684286.mp4'),
(5, 'Une super vidéo', 1, 0, 3, 13, 'video-1727338701320.mp4'),
(6, 'Une vidéo instructive', 1, 0, 3, 13, 'video-1727338716603.mp4'),
(7, 'Une bonne vidéo', 1, 0, 3, 13, 'video-1727338731699.mp4'),
(8, '', 0, 0, 3, 13, 'video-1727344664387.mp4'),
(9, '', 0, 0, 3, 13, 'video-1727344680308.mp4'),
(10, '', 0, 0, 3, 13, 'video-1727344685663.mp4');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Campus`
--
ALTER TABLE `Campus`
  ADD PRIMARY KEY (`idCampus`);

--
-- Index pour la table `CategoryComplaint`
--
ALTER TABLE `CategoryComplaint`
  ADD PRIMARY KEY (`idCategoryComplaint`);

--
-- Index pour la table `Comment`
--
ALTER TABLE `Comment`
  ADD PRIMARY KEY (`idComment`),
  ADD KEY `idVideo` (`idVideo`),
  ADD KEY `Comment_ibfk_2` (`idUser`);

--
-- Index pour la table `Complaint`
--
ALTER TABLE `Complaint`
  ADD PRIMARY KEY (`idComplaint`),
  ADD KEY `idCategoryComplaint` (`idCategoryComplaint`),
  ADD KEY `idUser` (`idUser`);

--
-- Index pour la table `Grade`
--
ALTER TABLE `Grade`
  ADD PRIMARY KEY (`idGrade`);

--
-- Index pour la table `GradeSatisfaction`
--
ALTER TABLE `GradeSatisfaction`
  ADD PRIMARY KEY (`idSatisfaction`,`idGrade`),
  ADD KEY `idGrade` (`idGrade`);

--
-- Index pour la table `Likes`
--
ALTER TABLE `Likes`
  ADD PRIMARY KEY (`idUser`,`idVideo`),
  ADD KEY `idVideo` (`idVideo`);

--
-- Index pour la table `Message`
--
ALTER TABLE `Message`
  ADD PRIMARY KEY (`idMessage`),
  ADD KEY `UserSender` (`idUserSender`),
  ADD KEY `UserReceiver` (`idUserReceiver`);

--
-- Index pour la table `SatisfactionSurvey`
--
ALTER TABLE `SatisfactionSurvey`
  ADD PRIMARY KEY (`idSatisfaction`),
  ADD KEY `idUser` (`idUser`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `mail` (`mail`),
  ADD KEY `idGrade` (`idGrade`),
  ADD KEY `idCampus` (`idCampus`);

--
-- Index pour la table `Video`
--
ALTER TABLE `Video`
  ADD PRIMARY KEY (`idVideo`),
  ADD KEY `idCampus` (`idCampus`),
  ADD KEY `idUser` (`idUser`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Campus`
--
ALTER TABLE `Campus`
  MODIFY `idCampus` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `CategoryComplaint`
--
ALTER TABLE `CategoryComplaint`
  MODIFY `idCategoryComplaint` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `Comment`
--
ALTER TABLE `Comment`
  MODIFY `idComment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `Complaint`
--
ALTER TABLE `Complaint`
  MODIFY `idComplaint` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `Grade`
--
ALTER TABLE `Grade`
  MODIFY `idGrade` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `GradeSatisfaction`
--
ALTER TABLE `GradeSatisfaction`
  MODIFY `idSatisfaction` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `Likes`
--
ALTER TABLE `Likes`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `Message`
--
ALTER TABLE `Message`
  MODIFY `idMessage` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `SatisfactionSurvey`
--
ALTER TABLE `SatisfactionSurvey`
  MODIFY `idSatisfaction` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `Video`
--
ALTER TABLE `Video`
  MODIFY `idVideo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Comment`
--
ALTER TABLE `Comment`
  ADD CONSTRAINT `Comment_ibfk_1` FOREIGN KEY (`idVideo`) REFERENCES `Video` (`idVideo`),
  ADD CONSTRAINT `Comment_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `Users` (`idUser`);

--
-- Contraintes pour la table `Complaint`
--
ALTER TABLE `Complaint`
  ADD CONSTRAINT `Complaint_ibfk_1` FOREIGN KEY (`idCategoryComplaint`) REFERENCES `CategoryComplaint` (`idCategoryComplaint`),
  ADD CONSTRAINT `Complaint_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `Users` (`idUser`);

--
-- Contraintes pour la table `GradeSatisfaction`
--
ALTER TABLE `GradeSatisfaction`
  ADD CONSTRAINT `GradeSatisfaction_ibfk_1` FOREIGN KEY (`idSatisfaction`) REFERENCES `SatisfactionSurvey` (`idSatisfaction`),
  ADD CONSTRAINT `GradeSatisfaction_ibfk_2` FOREIGN KEY (`idGrade`) REFERENCES `Grade` (`idGrade`);

--
-- Contraintes pour la table `Likes`
--
ALTER TABLE `Likes`
  ADD CONSTRAINT `Likes_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `Users` (`idUser`),
  ADD CONSTRAINT `Likes_ibfk_2` FOREIGN KEY (`idVideo`) REFERENCES `Video` (`idVideo`);

--
-- Contraintes pour la table `Message`
--
ALTER TABLE `Message`
  ADD CONSTRAINT `UserReceiver` FOREIGN KEY (`idUserReceiver`) REFERENCES `Users` (`idUser`),
  ADD CONSTRAINT `UserSender` FOREIGN KEY (`idUserSender`) REFERENCES `Users` (`idUser`);

--
-- Contraintes pour la table `SatisfactionSurvey`
--
ALTER TABLE `SatisfactionSurvey`
  ADD CONSTRAINT `SatisfactionSurvey_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `Users` (`idUser`);

--
-- Contraintes pour la table `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`idGrade`) REFERENCES `Grade` (`idGrade`),
  ADD CONSTRAINT `Users_ibfk_2` FOREIGN KEY (`idCampus`) REFERENCES `Campus` (`idCampus`);

--
-- Contraintes pour la table `Video`
--
ALTER TABLE `Video`
  ADD CONSTRAINT `Video_ibfk_1` FOREIGN KEY (`idCampus`) REFERENCES `Campus` (`idCampus`),
  ADD CONSTRAINT `Video_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `Users` (`idUser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
