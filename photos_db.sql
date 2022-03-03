SELECT VERSION();

CREATE DATABASE photos;

USE Photos;

-- ---------------
-- CREATE TABLES
-- ---------------

-- DROP TABLES photos;
CREATE TABLE photos (
  id integer NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  url varchar(255) NOT NULL,
  comment varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
);


-- DROP TABLES albums;
CREATE TABLE albums (
  id integer NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  PRIMARY KEY (id)
);


-- DROP TABLES users;
CREATE TABLE users (
  id integer NOT NULL AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  PRIMARY KEY (id)
);


-- ---------------
-- INSERT DATA
-- ---------------

-- photos
INSERT INTO photos (title, url, comment)
VALUES
	('yogi','https://unsplash.com/photos/ZlFKIG6dApg','yoga cat'),
	('My home','https://unsplash.com/photos/WajTuzeanUk','My Dream Home!'),
	('Where is my keys?','https://unsplash.com/photos/upRfmqsar8Q','Why do I always lose my keys?'),
	('Quack','https://unsplash.com/photos/_CTpGHp8nGk','I am not drowning');


-- albums
INSERT INTO albums (title)
VALUES
	('cute cats'),
	('funny animals');

-- users
INSERT INTO users (email, password, first_name, last_name)
VALUES
	('johan@mail.se','asdf','Johan','Nordström'),
	('sean_banan@epost.com','chiquita','Sean','Banan');

