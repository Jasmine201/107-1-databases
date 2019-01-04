-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: project
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `book` (
  `BId` int(11) NOT NULL AUTO_INCREMENT,
  `BName` varchar(45) DEFAULT NULL,
  `BKeyword` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`BId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'哈利波特(1)：神秘的膽結石','科幻/奇幻'),(2,'哈利波特(2)：消失的市長',' 歐美科幻/奇幻'),(3,'哈利波特(3)：阿茲特克的逃犯','青少年'),(4,'哈利波特(4)：靠盃的考驗','文學小說'),(5,'哈利波特(5)：老鼠會的密令','青少年文學');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail`
--

DROP TABLE IF EXISTS `detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `detail` (
  `DStart` varchar(45) DEFAULT NULL,
  `DTime` varchar(45) DEFAULT NULL,
  `DEnd` varchar(45) DEFAULT NULL,
  `OId` int(11) DEFAULT NULL,
  `PId` int(11) DEFAULT NULL,
  KEY `ofk1_idx` (`OId`),
  KEY `pfk1_idx` (`PId`),
  CONSTRAINT `pfk1` FOREIGN KEY (`PId`) REFERENCES `place` (`pid`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail`
--

LOCK TABLES `detail` WRITE;
/*!40000 ALTER TABLE `detail` DISABLE KEYS */;
INSERT INTO `detail` VALUES ('2016/01/31','30','2016/03/02',1,1),('2018/11/23','60','2019/01/23',2,2),('2017/12/25','30','2019/01/25',3,3),('2015/11/05','60','2016/01/05',4,4),('2017/03/17','90','2017/06/17',5,5);
/*!40000 ALTER TABLE `detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `include`
--

DROP TABLE IF EXISTS `include`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `include` (
  `PId` int(11) NOT NULL,
  `OId` int(11) NOT NULL,
  `BId` int(11) NOT NULL,
  KEY `pfk2_idx` (`PId`),
  KEY `ofk2_idx` (`OId`),
  KEY `bfk2_idx` (`BId`),
  CONSTRAINT `bfk2` FOREIGN KEY (`BId`) REFERENCES `book` (`bid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ofk2` FOREIGN KEY (`OId`) REFERENCES `order` (`oid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pfk2` FOREIGN KEY (`PId`) REFERENCES `place` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `include`
--

LOCK TABLES `include` WRITE;
/*!40000 ALTER TABLE `include` DISABLE KEYS */;
INSERT INTO `include` VALUES (1,1,1),(2,2,2),(3,3,3),(4,4,4),(5,5,5);
/*!40000 ALTER TABLE `include` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `member` (
  `MId` int(11) NOT NULL AUTO_INCREMENT,
  `ID` varchar(45) DEFAULT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Phone` int(11) DEFAULT NULL,
  PRIMARY KEY (`MId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'F129926813','Nigger',26215656),(2,'A228759487','Emily',28814292),(3,'F229753727','Fin',26204352),(4,'P122835702','Jack',86317777),(5,'A228730678','Rosa',86314357);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `order` (
  `OId` int(11) NOT NULL AUTO_INCREMENT,
  `ODate` varchar(45) DEFAULT NULL,
  `OStatus` varchar(45) DEFAULT NULL,
  `MId` int(11) DEFAULT NULL,
  PRIMARY KEY (`OId`),
  KEY `mfk_idx` (`MId`),
  CONSTRAINT `mfk` FOREIGN KEY (`MId`) REFERENCES `member` (`mid`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,'2016/01/31','Return',1),(2,'2018/11/23','Borrowing',2),(3,'2017/12/25','Borrowing',3),(4,'2015/11/05','Return',4),(5,'2017/03/17','Return',5);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `place`
--

DROP TABLE IF EXISTS `place`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `place` (
  `PId` int(11) NOT NULL AUTO_INCREMENT,
  `PAddress` varchar(45) DEFAULT NULL,
  `PName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`PId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `place`
--

LOCK TABLES `place` WRITE;
/*!40000 ALTER TABLE `place` DISABLE KEYS */;
INSERT INTO `place` VALUES (1,'台北市北投區大業路10號','聯成圖書館'),(2,'台中市西屯區文華路100號','逢甲圖書館'),(3,'彰化縣大村鄉學府路168號','大葉圖書館'),(4,'桃園市中壢區中北路200號','中原圖書館'),(5,'桃園市中壢區遠東路135號','元智圖書館');
/*!40000 ALTER TABLE `place` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-04  6:50:54
