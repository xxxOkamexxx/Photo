# ************************************************************
# Sequel Ace SQL dump
# バージョン 20033
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# ホスト: eu-cdbr-west-02.cleardb.net (MySQL 5.6.50-log)
# データベース: heroku_88278c4ed557efe
# 生成時間: 2022-06-24 12:32:20 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# テーブルのダンプ albums
# ------------------------------------------------------------

DROP TABLE IF EXISTS `albums`;

CREATE TABLE `albums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;

INSERT INTO `albums` (`id`, `title`, `user_id`)
VALUES
	(1,'Bananananana!',1),
	(11,'gelatooooo',1),
	(21,'Bello!',11);

/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;


# テーブルのダンプ albums_photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `albums_photos`;

CREATE TABLE `albums_photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `album_id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `album_id` (`album_id`),
  KEY `photo_id` (`photo_id`),
  CONSTRAINT `albums_photos_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`),
  CONSTRAINT `albums_photos_ibfk_2` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `albums_photos` WRITE;
/*!40000 ALTER TABLE `albums_photos` DISABLE KEYS */;

INSERT INTO `albums_photos` (`id`, `album_id`, `photo_id`)
VALUES
	(1,1,1),
	(11,1,11),
	(21,11,21),
	(31,21,31);

/*!40000 ALTER TABLE `albums_photos` ENABLE KEYS */;
UNLOCK TABLES;


# テーブルのダンプ photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;

INSERT INTO `photos` (`id`, `title`, `url`, `comment`, `user_id`)
VALUES
	(1,'Banana','https://images.unsplash.com/photo-1605666807892-8c11d020bede?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80','Banana',1),
	(11,'Banana','https://images.unsplash.com/photo-1604148482093-d55d6fc62400?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80','BANANAAAAAAAA!!!',1),
	(21,'GELATO!!!','https://images.unsplash.com/photo-1621096229451-38ce90f1035c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80','Gelato♪',1),
	(31,'Aaaaah!','https://images.unsplash.com/photo-1593871075120-982e042088d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80','Aaaaah!',11);

/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;


# テーブルのダンプ users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`)
VALUES
	(1,'bob@mail.se','$2b$10$mX8zxxPSmlIZwKoWmZD.nO66GAJ/kGuJSxhTw6aSZw96IcFOUc70q','Bob','Minion'),
	(11,'kevin@mail.se','$2b$10$ck3xowxluNtScx7.C7M31Ob9QM67BrwQlXzob3k7PXdWybjO/oRkO','Kevin','Minion');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
