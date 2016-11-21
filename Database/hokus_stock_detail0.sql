CREATE DATABASE  IF NOT EXISTS `hokus` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `hokus`;
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
-- Table structure for table `stock_detail`
--

DROP TABLE IF EXISTS `stock_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock_detail` (
  `stock_id` varchar(10) NOT NULL,
  `stock_name` varchar(255) DEFAULT NULL,
  `stock_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `stock_bid` decimal(13,5) DEFAULT NULL,
  `stock_ask` decimal(13,5) DEFAULT NULL,
  `PreviousClose` decimal(13,5) DEFAULT NULL,
  `Open` decimal(13,5) DEFAULT NULL,
  `Currency` varchar(4) DEFAULT NULL,
  `LastTradeDate` datetime DEFAULT NULL,
  `YearHigh` decimal(13,5) DEFAULT NULL,
  `YearLow` decimal(13,5) DEFAULT NULL,
  `BookValue` decimal(13,5) DEFAULT NULL,
  `EarningsShare` decimal(13,5) DEFAULT NULL,
  `PEGRatio` decimal(13,5) DEFAULT NULL,
  `ChangeFromYearLow` varchar(20) DEFAULT NULL,
  `YearRange` varchar(20) DEFAULT NULL,
  `MarketCapitalization` varchar(20) DEFAULT NULL,
  `EBITDA` varchar(20) DEFAULT NULL,
  `PriceBook` decimal(13,5) DEFAULT NULL,
  `PriceSales` decimal(13,5) DEFAULT NULL,
  `LastTradePriceOnly` decimal(13,5) DEFAULT NULL,
  `ChangeFromTwoHundreddayMovingAverage` varchar(20) DEFAULT NULL,
  `ChangeFromFiftydayMovingAverage` varchar(20) DEFAULT NULL,
  `Volume` decimal(13,5) DEFAULT NULL,
  `AverageDailyVolume` decimal(13,5) DEFAULT NULL,
  `ShortRatio` decimal(13,5) DEFAULT NULL,
  `EPSEstimateNextYear` decimal(13,5) DEFAULT NULL,
  `EPSEstimateNextQuarter` decimal(13,5) DEFAULT NULL,
  `PriceEPSEstimateCurrentYear` varchar(20) DEFAULT NULL,
  `DaysRange` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`stock_id`,`stock_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_detail`
--

LOCK TABLES `stock_detail` WRITE;
/*!40000 ALTER TABLE `stock_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock_detail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-21 15:33:20
