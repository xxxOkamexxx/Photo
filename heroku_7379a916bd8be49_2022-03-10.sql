# ************************************************************
# Sequel Ace SQL dump
# バージョン 20029
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# ホスト: eu-cdbr-west-02.cleardb.net (MySQL 5.6.50-log)
# データベース: heroku_7379a916bd8be49
# 生成時間: 2022-03-10 17:06:24 +0000
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;

INSERT INTO `albums` (`id`, `title`, `user_id`)
VALUES
	(11,'cute cats',51),
	(21,'PUT album-test-1',71);

/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;


# テーブルのダンプ albums_photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `albums_photos`;

CREATE TABLE `albums_photos` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `album_id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# テーブルのダンプ photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;

INSERT INTO `photos` (`id`, `title`, `url`, `comment`)
VALUES
	(11,'test','https://unsplash.com/photos/C9Guc2QhVdM','test add a photo'),
	(21,'yogi','https://unsplash.com/photos/ZlFKIG6dApg','yoga cat'),
	(31,'Where is my keys?','https://unsplash.com/photos/upRfmqsar8Q','Why do I always lose my keys?');

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
	(51,'johan@mail.se','$2b$10$Gt.ejMv3g/ETR3VEZoZzA.CPCeyzugY2zr9Ues02j4cg2Tm/tlMdC','Johan','Nordström'),
	(61,'sean_banan@epost.com','chiquita','Sean','Banan'),
	(71,'bob@mail.se','$2b$10$JZuvz5wLY2yW.0Cy/cATxuV0sS9Lw0t2Dr/WdiVrhNDBIv7CEy2zG','Bob','Minion'),
	(81,'johan@mail.com','$2b$10$aRVbvK/dsSgSeWcASBZgd.IfRFdcoTeHwWUy4egS7KRsyBXu9WjiS','Johan','Nordström'),
	(91,'kevin@mail.se','$2b$10$FqvA7pqKW6s2p4E52rR8T.nbbZyGfL98OW.bcisZeQ1OMv6Fw4Chq','Kevin','Minion'),
	(101,'stuart@mail.se','$2b$10$ALmEIZl4IxO57w2nsQMH9euje1Zwjwx5xsKH/gIIXqiOQGgetmigO','Stuart','Minion');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
