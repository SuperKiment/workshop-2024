-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mar. 24 sep. 2024 à 06:40
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
-- Base de données : `dblogin8097`
--

-- --------------------------------------------------------

--
-- Structure de la table `Campus`
--

CREATE TABLE `Campus` (
  `idCampus` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Campus`
--

INSERT INTO `Campus` (`idCampus`, `name`, `city`) VALUES
(1, 'Campus A', 'Paris'),
(2, 'Campus B', 'Lyon');

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
(1, 'Problème de connexion'),
(2, 'Qualité des cours');

-- --------------------------------------------------------

--
-- Structure de la table `Comment`
--

CREATE TABLE `Comment` (
  `idComment` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `idVideo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Comment`
--

INSERT INTO `Comment` (`idComment`, `content`, `idVideo`) VALUES
(1, 'Très instructif !', 1),
(2, 'Bonne présentation.', 2);

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
(1, 'Le système ne fonctionne pas.', 1, 1, 1),
(2, 'Le cours était trop rapide.', 0, 2, 2);

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
(1, 'Licence'),
(2, 'Master');

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
(1, 'Introduction à la programmation', 1),
(2, 'Gestion de projet avancée', 2);

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `idUser` int(11) NOT NULL,
  `mail` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `idGrade` int(11) DEFAULT NULL,
  `idCampus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`idUser`, `mail`, `lastName`, `firstName`, `isAdmin`, `idGrade`, `idCampus`) VALUES
(1, 'john.doe@example.com', 'Doe', 'John', 0, 1, 1),
(2, 'jane.smith@example.com', 'Smith', 'Jane', 1, 2, 2);

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
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Video`
--

INSERT INTO `Video` (`idVideo`, `content`, `isGlobal`, `isAdmin`, `idCampus`, `idUser`) VALUES
(1, 'Vidéo sur la programmation', 1, 0, 1, 1),
(2, 'Vidéo sur la gestion de projet', 0, 1, 2, 2);

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
  ADD KEY `idVideo` (`idVideo`);

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
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Comment`
--
ALTER TABLE `Comment`
  ADD CONSTRAINT `Comment_ibfk_1` FOREIGN KEY (`idVideo`) REFERENCES `Video` (`idVideo`);

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
