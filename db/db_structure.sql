DROP DATABASE IF EXISTS MLCMS;

CREATE DATABASE MLCMS;
USE MLCMS;

CREATE TABLE `accounts`(
	account_string VARCHAR(255) PRIMARY KEY NOT NULL,
    pwd_string VARCHAR(255) NOT NULL,
    account_status ENUM("1", "0") NOT NULL,
    credential_string VARCHAR(255) NOT NULL,
    account_role ENUM('user', 'admin') DEFAULT 'user'
);

CREATE TABLE `partner`(
	partner_name TEXT,
    address TEXT,
    hotline VARCHAR(255),
    email VARCHAR(255),
    fax VARCHAR(255),
    image_url VARCHAR(255)
);

CREATE TABLE `tables`(
	table_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    table_name VARCHAR(255) UNIQUE,
    table_alias VARCHAR(255) DEFAULT "Bảng mới",
    create_on DATETIME DEFAULT NOW()
);

CREATE TABLE `fields`(
	field_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    table_id INT,
    field_name VARCHAR(255) NOT NULL UNIQUE,
    field_alias VARCHAR(255) DEFAULT "Trường mới",
    nullable BOOL DEFAULT TRUE,
    field_props JSON,
    field_data_type VARCHAR(255),
    default_value TEXT
);

CREATE TABLE `_keys`(
	key_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    field_id INT,
    key_type ENUM('primary', 'foreign'),
    reference_on INT /* this fucking other field of other table */
);



