-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: test1
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bangcong`
--

DROP TABLE IF EXISTS `bangcong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bangcong` (
  `id` varchar(45) NOT NULL,
  `id_nhanvien` varchar(45) DEFAULT NULL,
  `songaycong` varchar(45) DEFAULT NULL,
  `thangtinhcong` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `bangcong_ibfk_1` (`id_nhanvien`),
  CONSTRAINT `bangcong_ibfk_1` FOREIGN KEY (`id_nhanvien`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bangcong`
--

LOCK TABLES `bangcong` WRITE;
/*!40000 ALTER TABLE `bangcong` DISABLE KEYS */;
INSERT INTO `bangcong` VALUES ('1','id_nhanvien0','27',6),('2','id_nhanvien1','28',6);
/*!40000 ALTER TABLE `bangcong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chucvu`
--

DROP TABLE IF EXISTS `chucvu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chucvu` (
  `id` varchar(45) NOT NULL,
  `ten_chucvu` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chucvu`
--

LOCK TABLES `chucvu` WRITE;
/*!40000 ALTER TABLE `chucvu` DISABLE KEYS */;
INSERT INTO `chucvu` VALUES ('id_nvchinhthuc','nv chính thức'),('id_nvthuviec','nv thử việc'),('id_quanly','quản lý');
/*!40000 ALTER TABLE `chucvu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hopdong`
--

DROP TABLE IF EXISTS `hopdong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hopdong` (
  `id` varchar(45) NOT NULL,
  `tenhopdong` varchar(45) DEFAULT NULL,
  `loaihopdong` varchar(45) DEFAULT NULL,
  `thoigiancapnhat` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `tenhopdong_UNIQUE` (`tenhopdong`),
  UNIQUE KEY `loaihopdong_UNIQUE` (`loaihopdong`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hopdong`
--

LOCK TABLES `hopdong` WRITE;
/*!40000 ALTER TABLE `hopdong` DISABLE KEYS */;
INSERT INTO `hopdong` VALUES ('id_hdchinhthuc','hd chính thức','chính thức1','Sun May 31 2020 00:24:51 GMT+0700 (Indochina Time)'),('id_hdnghiavu','hd nghĩa vụ','nghĩa vụ','Tue Jun 02 2020 10:59:39 GMT+0700 (Indochina Time)'),('id_hdthoivu','hd thời vụ','thời vụ','Tue Jun 02 2020 11:05:38 GMT+0700 (Indochina Time)'),('id_hdthuviec','hợp đồng chính thức','chính thức','Tue Jun 02 2020 10:54:10 GMT+0700 (Indochina Time)');
/*!40000 ALTER TABLE `hopdong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `luongcb`
--

DROP TABLE IF EXISTS `luongcb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `luongcb` (
  `id` varchar(45) NOT NULL,
  `id_phongban` varchar(45) DEFAULT NULL,
  `id_chucvu` varchar(45) DEFAULT NULL,
  `luongcapbac` int DEFAULT NULL,
  `thoigiancapnhat` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `id_chucvu_fk` (`id_chucvu`),
  KEY `id_phongban_fk` (`id_phongban`),
  CONSTRAINT `id_chucvu_fk` FOREIGN KEY (`id_chucvu`) REFERENCES `chucvu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `id_phongban_fk` FOREIGN KEY (`id_phongban`) REFERENCES `phongban` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `luongcb`
--

LOCK TABLES `luongcb` WRITE;
/*!40000 ALTER TABLE `luongcb` DISABLE KEYS */;
INSERT INTO `luongcb` VALUES ('id_hanhchinh_nvchinhthuc','id_hanhchinh','id_nvchinhthuc',2000001,'Tue Jun 09 2020 16:08:38 GMT+0700 (Indochina Time)'),('id_hanhchinh_nvthuviec','id_hanhchinh','id_nvthuviec',90000,'Tue Jun 09 2020 16:12:34 GMT+0700 (Indochina Time)'),('id_hanhchinh_quanly','id_hanhchinh','id_quanly',900000,'Tue Jun 09 2020 16:13:32 GMT+0700 (Indochina Time)');
/*!40000 ALTER TABLE `luongcb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `luongnhanvien`
--

DROP TABLE IF EXISTS `luongnhanvien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `luongnhanvien` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_nhanvien` varchar(45) DEFAULT NULL,
  `ten_nhanvien` varchar(45) DEFAULT NULL,
  `songaycong` varchar(45) DEFAULT NULL,
  `thangtinhcong` varchar(45) DEFAULT NULL,
  `ten_chucvu` varchar(45) DEFAULT NULL,
  `ten_phongban` varchar(45) DEFAULT NULL,
  `luongcapbac` varchar(45) DEFAULT NULL,
  `tien_phucap` varchar(45) DEFAULT NULL,
  `ten_khenthuong` varchar(45) DEFAULT NULL,
  `tienthuong` varchar(45) DEFAULT NULL,
  `ten_loiphat` varchar(45) DEFAULT NULL,
  `tienphat` varchar(45) DEFAULT NULL,
  `tongluong` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `luongnhanvien_ibfk_1` (`id_nhanvien`),
  CONSTRAINT `luongnhanvien_ibfk_1` FOREIGN KEY (`id_nhanvien`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=168 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `luongnhanvien`
--

LOCK TABLES `luongnhanvien` WRITE;
/*!40000 ALTER TABLE `luongnhanvien` DISABLE KEYS */;
INSERT INTO `luongnhanvien` VALUES (164,'id_nhanvien0','cao minh chúng1','27','5','nv thử việc','hành chính','90000','100000','q','20000','a','20000','2530000'),(165,'id_nhanvien1','nguyễn thị c','28','5','quản lý','hành chính','900000','800000','','0','','0','26000000'),(166,'id_nhanvien0','cao minh chúng1','27','6','nv thử việc','hành chính','90000','100000','','0','','0','2530000'),(167,'id_nhanvien1','nguyễn thị c','28','6','quản lý','hành chính','900000','800000','','0','','0','26000000');
/*!40000 ALTER TABLE `luongnhanvien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhanvien`
--

DROP TABLE IF EXISTS `nhanvien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nhanvien` (
  `id` varchar(45) NOT NULL,
  `ten_nhanvien` varchar(45) DEFAULT NULL,
  `id_phongban` varchar(45) DEFAULT NULL,
  `id_chucvu` varchar(45) DEFAULT NULL,
  `id_hopdong` varchar(45) DEFAULT NULL,
  `soCMND` int DEFAULT NULL,
  `trangthai` int DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `ngaysinh` varchar(45) DEFAULT NULL,
  `diachi` varchar(45) DEFAULT NULL,
  `hocvan` varchar(45) DEFAULT NULL,
  `thoigiancapnhat` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `id_phongban` (`id_phongban`) /*!80000 INVISIBLE */,
  KEY `id_chucvu` (`id_chucvu`) /*!80000 INVISIBLE */,
  KEY `id_hopdong` (`id_hopdong`),
  CONSTRAINT `id_chucvu_fk1` FOREIGN KEY (`id_chucvu`) REFERENCES `chucvu` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `id_hopdong_fk` FOREIGN KEY (`id_hopdong`) REFERENCES `hopdong` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `id_phongban_fk1` FOREIGN KEY (`id_phongban`) REFERENCES `phongban` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhanvien`
--

LOCK TABLES `nhanvien` WRITE;
/*!40000 ALTER TABLE `nhanvien` DISABLE KEYS */;
INSERT INTO `nhanvien` VALUES ('id_nhanvien0','cao minh chúng1','id_hanhchinh','id_nvthuviec','id_hdchinhthuc',12345,1,'123@gmail.com','123/234','ha noi','dai hoc','Tue Jun 09 2020 15:42:50 GMT+0700 (Indochina Time)'),('id_nhanvien1','nguyễn thị c','id_hanhchinh','id_quanly','id_hdthoivu',12345,1,'123@gmail.com','123/234','ha noi','dai hoc','Tue Jun 09 2020 15:49:10 GMT+0700 (Indochina Time)');
/*!40000 ALTER TABLE `nhanvien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phongban`
--

DROP TABLE IF EXISTS `phongban`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phongban` (
  `id` varchar(45) NOT NULL,
  `ten_phongban` varchar(45) DEFAULT NULL,
  `thoigiancapnhat` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `ten_phongban_UNIQUE` (`ten_phongban`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phongban`
--

LOCK TABLES `phongban` WRITE;
/*!40000 ALTER TABLE `phongban` DISABLE KEYS */;
INSERT INTO `phongban` VALUES ('id_hanhchinh','hành chính','Tue Jun 02 2020 11:19:42 GMT+0700 (Indochina Time)'),('id_ketoans','kế toán','Tue Jun 02 2020 11:19:56 GMT+0700 (Indochina Time)'),('id_nhansu','nhân sự','Tue Jun 02 2020 11:19:16 GMT+0700 (Indochina Time)');
/*!40000 ALTER TABLE `phongban` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phucap`
--

DROP TABLE IF EXISTS `phucap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phucap` (
  `id` varchar(45) NOT NULL,
  `id_chucvu` varchar(45) DEFAULT NULL,
  `tien_phucap` int DEFAULT NULL,
  `thoigiancapnhat` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `id_chucvu_UNIQUE` (`id_chucvu`),
  KEY `id_chucvu` (`id_chucvu`),
  CONSTRAINT `id_chucvu_fk2` FOREIGN KEY (`id_chucvu`) REFERENCES `chucvu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phucap`
--

LOCK TABLES `phucap` WRITE;
/*!40000 ALTER TABLE `phucap` DISABLE KEYS */;
INSERT INTO `phucap` VALUES ('id_phucap0','id_quanly',800000,'Tue Jun 09 2020 16:15:29 GMT+0700 (Indochina Time)'),('id_phucap1','id_nvchinhthuc',500000,'Tue Jun 02 2020 12:52:53 GMT+0700 (Indochina Time)'),('id_phucap2','id_nvthuviec',100000,'Tue Jun 09 2020 16:17:12 GMT+0700 (Indochina Time)');
/*!40000 ALTER TABLE `phucap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thuongphat`
--

DROP TABLE IF EXISTS `thuongphat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thuongphat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_nhanvien` varchar(45) DEFAULT NULL,
  `ten_khenthuong` varchar(100) DEFAULT NULL,
  `tienthuong` int DEFAULT '0',
  `ten_loiphat` varchar(100) DEFAULT NULL,
  `tienphat` int DEFAULT '0',
  `thang` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `id_nhanvien_UNIQUE` (`id_nhanvien`),
  CONSTRAINT `thuongphat_ibfk_1` FOREIGN KEY (`id_nhanvien`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thuongphat`
--

LOCK TABLES `thuongphat` WRITE;
/*!40000 ALTER TABLE `thuongphat` DISABLE KEYS */;
INSERT INTO `thuongphat` VALUES (7,'id_nhanvien0','',0,'',0,7),(8,'id_nhanvien1','',0,'',0,7);
/*!40000 ALTER TABLE `thuongphat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tieusu`
--

DROP TABLE IF EXISTS `tieusu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tieusu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_nhanvien` varchar(45) DEFAULT NULL,
  `ten_nhanvien` varchar(45) DEFAULT NULL,
  `ten_phongban` varchar(45) DEFAULT NULL,
  `ten_chucvu` varchar(45) DEFAULT NULL,
  `tenhopdong` varchar(45) DEFAULT NULL,
  `thoigian` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `tieusu_ibfk_1` (`id_nhanvien`),
  CONSTRAINT `tieusu_ibfk_1` FOREIGN KEY (`id_nhanvien`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tieusu`
--

LOCK TABLES `tieusu` WRITE;
/*!40000 ALTER TABLE `tieusu` DISABLE KEYS */;
INSERT INTO `tieusu` VALUES (35,'id_nhanvien0','cao minh chúng1','hành chính','nv thử việc','hd chính thức','Tue Jun 09 2020 15:42:50 GMT+0700 (Indochina Time)'),(36,'id_nhanvien1','nguyễn thị c','hành chính','quản lý','hd thời vụ','Tue Jun 09 2020 15:49:10 GMT+0700 (Indochina Time)'),(37,'id_nhanvien0','cao minh chúng1','hành chính','nv thử việc','hd chính thức','Tue Jun 09 2020 15:51:00 GMT+0700 (Indochina Time)');
/*!40000 ALTER TABLE `tieusu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(45) NOT NULL,
  `id_nhanvien` varchar(45) DEFAULT NULL,
  `ten_nhanvien` varchar(45) DEFAULT NULL,
  `tendangnhap` varchar(45) DEFAULT NULL,
  `matkhau` varchar(45) DEFAULT NULL,
  `quyen` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `tendangnhap_UNIQUE` (`tendangnhap`),
  UNIQUE KEY `id_nhanvien_UNIQUE` (`id_nhanvien`),
  KEY `id_nhanvien` (`id_nhanvien`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_nhanvien`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('id_taikhoanadmin',NULL,NULL,'admin','admin','admin'),('id_taikhoanquanly_2','id_nhanvien0','cao minh chúng1','taikhoanquanly2','matkhau222','nhân viên quản lý'),('id_taikhoanquanly_3',NULL,NULL,'taikhoanquanly3','matkhauquanly1','nhanvien');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-09 17:57:14
