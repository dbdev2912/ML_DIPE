USE DIPE;

DELIMITER $$

DROP PROCEDURE IF EXISTS `table_add` $$
CREATE PROCEDURE `table_add` ( IN in_table_name VARCHAR(255), IN in_table_alias VARCHAR(255) )
BEGIN
	DECLARE table_existed INT;
    SELECT COUNT(*) INTO table_existed FROM `tables` WHERE `table_alias` = in_table_alias;
    IF table_existed = 0 THEN
		INSERT INTO `tables`(`table_name`, `table_alias`) VALUES ( in_table_name, in_table_alias );
        
		/* TRIGGER IS GONNA BE CALLED SOON */
        
		SELECT TRUE AS `success`, CONCAT("SUCCESSFULLY CREATE TABLE ", in_table_name) AS `content`; 
	ELSE 
		SELECT FALSE AS `success`, CONCAT("TABLE WITH ALIAS ", in_table_alias, " ALREADY EXISTED") AS `content`; 
    END IF;
END
$$


DROP PROCEDURE IF EXISTS `table_modify` $$
CREATE PROCEDURE `table_modify`( IN in_table_id INT, IN in_table_name VARCHAR(255) )
BEGIN

	DECLARE table_existed INT;
    SELECT COUNT(*) INTO table_existed FROM `tables` WHERE `table_id` = in_table_id;
	IF table_existed > 0 THEN
    
		UPDATE `tables` SET `table_name` = in_table_name WHERE `table_id` = in_table_id;
        SELECT TRUE AS `success`, CONCAT("SUCCESSFULLY CHANGE TABLE NAME TO ", in_table_name) AS `content`; 
    ELSE 
		SELECT FALSE AS `success`, "THE TABLE DOES NOT EXIST" AS `content`; 
    END IF;
END
$$

/* Viết code nodejs để thêm bảng và trường vì Dynamic SQL không đc phép chạy trong trigger */

