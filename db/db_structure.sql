DROP DATABASE IF EXISTS DIPE;

CREATE DATABASE DIPE;
USE DIPE;

CREATE TABLE `accounts`(
	account_string 	VARCHAR(255) PRIMARY KEY NOT NULL,
    pwd_string 		VARCHAR(255) NOT NULL,
    account_status 	ENUM("1", "0") NOT NULL,
    credential_string VARCHAR(255) UNIQUE NOT NULL,
    account_role 	ENUM('user', 'admin') DEFAULT 'user'
);

CREATE TABLE `account_detail`(
	credential_string VARCHAR(255) NOT NULL, -- fk
    fullname 	VARCHAR(255),
    email 		VARCHAR(255),
    phone 		VARCHAR(255),
    address 	TEXT
);
ALTER TABLE `account_detail` ADD CONSTRAINT `fk_account_accountdetail` FOREIGN KEY (credential_string) REFERENCES accounts( credential_string ) ON UPDATE CASCADE;

CREATE TABLE `tables`(
	table_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    table_name VARCHAR(255) DEFAULT "Bảng mới",
    table_alias VARCHAR(255) NOT NULL UNIQUE ,
    create_on DATETIME DEFAULT NOW()
);

CREATE TABLE `fields`(
	field_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    table_id INT,
    field_name VARCHAR(255)  DEFAULT "Trường mới",
    field_alias VARCHAR(255) NOT NULL UNIQUE,
    nullable BOOL DEFAULT TRUE,
    field_props JSON,
    field_data_type VARCHAR(255),
    default_value TEXT,
    is_primary BOOL DEFAULT FALSE
);
ALTER TABLE `fields` ADD CONSTRAINT `fk_fields_table` FOREIGN KEY ( `table_id` ) REFERENCES `tables`(`table_id`) ON UPDATE CASCADE ON DELETE CASCADE;

-- CREATE TABLE `foreign_keys`(
-- 	key_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
--     field_id INT,
--     reference_on INT /* this fucking other field of other table */
-- );



