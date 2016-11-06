-- MySQL dump 10.13  Distrib 5.7.9, for osx10.9 (x86_64)
--
-- Host: localhost    Database: hokus
-- ------------------------------------------------------
-- Server version	5.7.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock` (
  `stock_id` varchar(10) NOT NULL,
  `stock_name` varchar(255) NOT NULL,
  `stock_exc` varchar(10) NOT NULL,
  `country` varchar(100) DEFAULT NULL,
  `sector_desc` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`stock_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
INSERT INTO `stock` VALUES ('44RS.L','Santander UK Group Holdings plc','LSE','UK',''),('DOR.L','DORIEMUS','LSE','UK',''),('ECV.L','Eco City Vehicles plc','LSE','UK','Auto Dealerships'),('HSBA.L','HSBC Holdings plc','LSE','UK','Money Center Banks'),('JDT.L','Jupiter Dividend & Growth Trust PLC','LSE','UK',''),('JSI.L','Jiasen International Holdings Limited','LSE','UK','Home Furnishings & Fixtures'),('KLR.L','Keller Group plc','LSE','UK','General Contractors'),('MHN.L','Menhaden Capital','LSE','UK',''),('RY4C.IR','RYANAIR HLDGS','ISE','UK',''),('SDP.L','Schroder Asia Pacific Ord','LSE','UK',''),('SSE.L','SSE plc','LSE','UK','Diversified Utilities'),('SWJ.L','John Swan & Sons plc','LSE','UK',''),('UANC.L','Urban&Civic; plc','LSE','UK','Real Estate Development'),('UBMN.L','UBM I14 NP','LSE','UK',''),('UTG.L','Unite Group plc','LSE','UK','Property Management'),('VTC.L','The Vitec Group plc','LSE','UK','Communication Equipment'),('WPC.L','Witan Pacific Ord','LSE','UK',''),('XPL.L','XPLORER','LSE','UK',''),('YHOO','Yahoo','LON','USA','Internet Information Providers'),('ZAZ.IR','ZAMANO','ISE','UK','');
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-06  9:27:45
