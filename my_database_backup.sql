-- MySQL dump 10.13  Distrib 9.4.0, for Linux (aarch64)
--
-- Host: localhost    Database: reservation_db
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_id` int NOT NULL,
  `user_id` int NOT NULL,
  `from_time` time NOT NULL,
  `to_time` time NOT NULL,
  `booking_date` date NOT NULL,
  `status` tinyint DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_bookings_room` (`room_id`),
  KEY `fk_bookings_user` (`user_id`),
  CONSTRAINT `fk_bookings_room` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_bookings_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,1,4,'10:00:00','11:00:00','2025-08-25',0,'2025-08-25 04:51:39','2025-08-25 04:55:23'),(2,2,4,'10:01:00','11:00:00','2025-08-25',0,'2025-08-25 04:55:02','2025-08-25 04:55:48'),(3,1,4,'11:00:00','12:00:00','2025-08-25',0,'2025-08-25 04:56:37','2025-08-25 04:56:45'),(4,1,4,'10:00:00','12:00:00','2025-08-25',0,'2025-08-25 05:02:38','2025-08-25 05:02:53'),(5,3,4,'10:00:00','11:00:00','2025-08-25',0,'2025-08-25 05:04:14','2025-08-25 05:04:25'),(6,2,4,'01:01:01','02:01:01','2025-08-25',0,'2025-08-25 05:06:58','2025-08-25 05:07:27'),(7,1,2,'10:00:00','12:00:00','2025-08-25',1,'2025-08-25 06:01:52','2025-08-25 06:01:52'),(8,1,2,'02:00:00','03:00:00','2025-08-25',1,'2025-08-25 06:06:23','2025-08-25 06:06:23'),(9,1,2,'01:00:00','02:00:00','2025-08-25',1,'2025-08-25 06:08:10','2025-08-25 06:08:10'),(10,2,11,'10:00:00','11:00:00','2025-08-25',1,'2025-08-25 06:53:09','2025-08-25 06:53:09'),(11,1,6,'09:00:00','10:00:00','2025-08-25',0,'2025-08-25 07:01:18','2025-08-25 07:01:29');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `room_type` enum('MEETING_HALL','ROOM') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'Ocean View Room','Spacious and well-lit meeting hall','MEETING_HALL','2025-08-24 17:55:10','2025-08-24 17:55:10'),(2,'Sunrise Room','Bright and airy room with morning sunlight','ROOM','2025-08-24 17:56:13','2025-08-24 17:56:13'),(3,'Harbor Meeting Hall','Ideal for business conferences and corporate events','MEETING_HALL','2025-08-24 17:56:18','2025-08-24 17:56:18'),(4,'Coral Room','Cozy private room with ocean-inspired decor','ROOM','2025-08-24 17:56:24','2025-08-24 17:56:24');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ismail','ismail@test.com','$2b$10$t1NouhaHmkJcFSWk24luC.j5LCleo0.BAbVpks71L16LLxBaDVwi.','2025-08-24 22:59:50','2025-08-24 22:59:50'),(2,'Ismail','ismail2@test.com','$2b$10$r6Q4RiWFgE3W/VAKAEmm0ekYo1TIF012jHKp7oUy23oocUUTN.81.','2025-08-24 23:11:03','2025-08-24 23:11:03'),(3,'Ismail','ismail3@test.com','$2b$10$hSpdWlYGEO9dCcZlNJ8/Xuum9fRYd3eQxAzkjQ/.a5zr4b/TF6a0y','2025-08-24 18:03:20','2025-08-24 18:03:20'),(4,'Musthafa','musthafa@test.com','$2b$10$LHSE3POTdf/No9eq11IFieKQPIRldbj6Fs07itx/yjGgnggrA3Aum','2025-08-24 19:03:47','2025-08-24 19:03:47'),(5,'Musthafa','musthafa@test1.com','$2b$10$2qCuoEakG.jQu8lJYeDXLOs0vDd2GRX4.K2feWJjltjYgNCeyHIu6','2025-08-25 05:29:13','2025-08-25 05:29:13'),(6,'Musthafa','musthafa@test3.com','$2b$10$ZKCmfZphXnvwv4Wl38Obf.rUkWkRw412iL8pIDplxrOG27Mqr.BQ.','2025-08-25 06:30:01','2025-08-25 06:30:01'),(7,'Musthafa','musthafa@test4.com','$2b$10$7j6DlpPVNiU7XjoGqkyoQOQj5CB1vxPosQXftJLKVom366oavzhYS','2025-08-25 06:37:42','2025-08-25 06:37:42'),(8,'Musthafa','musthafa@test5.com','$2b$10$RP3oQi71VAwJLvziTcmyROdqmQ97udvbA5csp.vgLicavCFU4iEiK','2025-08-25 06:42:30','2025-08-25 06:42:30'),(9,'Musthafa','musthafa@test6.com','$2b$10$MwOl6P3bMfyCASiCpiaABetG/3D8Ok8PZTQjcvKtEqMIChep/n.4O','2025-08-25 06:44:25','2025-08-25 06:44:25'),(10,'Musthafa','musthafa@test7.com','$2b$10$HGbrOA8JFumEvNX7khkPNOxMFVPCTbEsfNCxiYYaCpMOf3jGASSIC','2025-08-25 06:47:27','2025-08-25 06:47:27'),(11,'Musthafa','musthafa@test8.com','$2b$10$TMBZgVmm4XBgwj/M2JH/UukcVw.SS7U.FWULL8zj434L0NbCeMkJ.','2025-08-25 06:48:56','2025-08-25 06:48:56');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-25  7:09:20
