DROP DATABASE IF EXISTS Trackerdb;
CREATE DATABASE Trackerdb;
USE Trackerdb;

DROP TABLE IF EXISTS Users;
CREATE TABLE Users ( 
    cus_id INT auto_increment,
    userFirstName varchar(255),
    userLastName varchar(255),
    dailysNum INT,
    userEmail varchar(255),
    userPassword varchar(255),
    PRIMARY KEY(cus_id)
);

DROP TABLE IF EXISTS Daily;
CREATE TABLE Daily (
    id INT auto_increment,
    cus_id INT,
    user Text(1000),
    base varchar(3),
    sub varchar(3),
    PRIMARY KEY (id),
    FOREIGN KEY(cus_id) REFERENCES Users(cus_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Threshold;
CREATE TABLE Threshold (
    id INT auto_increment,
    cus_id INT,
    user Text(1000),
    conditions varchar(255),
    base varchar(255),
    sub varchar(255),
    PRIMARY KEY (id),
    FOREIGN KEY(cus_id) REFERENCES Users(cus_id) ON DELETE CASCADE
);