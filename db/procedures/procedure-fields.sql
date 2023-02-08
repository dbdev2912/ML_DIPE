USE DIPE;

DELIMITER $$

DROP PROCEDURE IF EXISTS `add_field` $$
CREATE PROCEDURE `add_field` ( 
	IN in_table_id INT, 
    IN in_field_name VARCHAR(255), 
    IN in_field_alias VARCHAR(255), 
    IN in_nullable BOOL, 
    IN in_field_data_type VARCHAR(255),
    IN in_field_props JSON,     
    IN in_default_value TEXT,
    IN in_is_primary BOOL
)
BEGIN 
	DECLARE filtered_field_id INT;
    DECLARE filtered_table_name VARCHAR(255); 
    DECLARE table_existed INT;
    
    SELECT COUNT(*) INTO table_existed FROM `tables` WHERE `table_id` = in_table_id;
    
    IF table_existed > 0 THEN
    
		IF in_is_primary = TRUE THEN
			SELECT `table_name` INTO filtered_table_name FROM `tables` WHERE `table_id` = in_table_id;
			INSERT INTO `fields` ( `table_id`, `field_name`, `field_alias`, `nullable`, `field_props`, `field_data_type`, `is_primary` ) VALUES
				( in_table_id, in_field_name, in_field_alias, FALSE, '{ "primary": "true" }', in_field_data_type, in_is_primary );
				SELECT TRUE AS `success`, CONCAT("SUCCESSFULLY ADD FIELD ", in_field_name, "AS PRIMARY KEY OF TABLE ", filtered_table_name) AS `content`;
		ELSE
			IF in_field_props = "" OR in_field_props IS NULL THEN
				INSERT INTO `fields` ( `table_id`, `field_name`, `field_alias`, `nullable`, `field_props`, `field_data_type`, `is_primary` ) VALUES
				( in_table_id, in_field_name, in_field_alias, in_nullable, '{ "DEFAULT_PROPS": "NULL" }', in_field_data_type, in_is_primary );
			ELSE
				INSERT INTO `fields` ( `table_id`, `field_name`,`field_alias`, `nullable`, `field_props`, `field_data_type`, `is_primary` ) VALUES
				( in_table_id, in_field_name, in_field_alias, in_nullable, in_field_props, in_field_data_type, in_is_primary );
			END IF;
			SELECT field_id INTO filtered_field_id FROM `fields` WHERE field_alias = in_field_alias;
			INSERT INTO `default_value`(`field_id`, `default_value`) VALUES( filtered_field_id, in_default_value );        
			SELECT TRUE AS `success`, CONCAT("SUCCESSFULLY ADD AND INSERT DEFAULT VALUE OF ", in_default_value, " ON FIELD ", in_field_name) AS `content`;
		END IF;
	ELSE
		SELECT FALSE AS `success`, CONCAT("NO TABLE WITH ID ", in_table_id, " IS FOUND!") AS `content`;
	END IF;
END
/* TRIGGER IS GONNA BE CALLED SOON */

$$



DROP PROCEDURE IF EXISTS `add_field_silent` $$
CREATE PROCEDURE `add_field_silent` ( 
	IN in_table_id INT, 
    IN in_field_name VARCHAR(255), 
    IN in_field_alias VARCHAR(255), 
    IN in_nullable BOOL, 
    IN in_field_data_type VARCHAR(255),
    IN in_field_props JSON,     
    IN in_default_value TEXT,
    IN in_is_primary BOOL
)
BEGIN 
	DECLARE filtered_field_id INT;
    DECLARE filtered_table_name VARCHAR(255); 
    DECLARE table_existed INT;
    
    SELECT COUNT(*) INTO table_existed FROM `tables` WHERE `table_id` = in_table_id;
    
    IF table_existed > 0 THEN
    
		IF in_is_primary = TRUE THEN
			SELECT `table_name` INTO filtered_table_name FROM `tables` WHERE `table_id` = in_table_id;
			INSERT INTO `fields` ( `table_id`, `field_name`, `field_alias`, `nullable`, `field_props`, `field_data_type`, `is_primary` ) VALUES
				( in_table_id, in_field_name, in_field_alias, FALSE, '{ "primary": "true" }', in_field_data_type, in_is_primary );
				
		ELSE
			IF in_field_props = "" OR in_field_props IS NULL THEN
				INSERT INTO `fields` ( `table_id`, `field_name`, `field_alias`, `nullable`, `field_props`, `field_data_type`, `is_primary` ) VALUES
				( in_table_id, in_field_name, in_field_alias, in_nullable, '{ "DEFAULT_PROPS": "NULL" }', in_field_data_type, in_is_primary );
			ELSE
				INSERT INTO `fields` ( `table_id`, `field_name`,`field_alias`, `nullable`, `field_props`, `field_data_type`, `is_primary` ) VALUES
				( in_table_id, in_field_name, in_field_alias, in_nullable, in_field_props, in_field_data_type, in_is_primary );
			END IF;
			SELECT field_id INTO filtered_field_id FROM `fields` WHERE field_alias = in_field_alias;
			INSERT INTO `default_value`(`field_id`, `default_value`) VALUES( filtered_field_id, in_default_value );        
			
		END IF;
	END IF;
END
/* TRIGGER IS GONNA BE CALLED SOON */

$$



DROP PROCEDURE IF EXISTS `modify_field` $$

CREATE PROCEDURE `modify_field`(
	IN in_field_id VARCHAR(255),
    IN in_field_name VARCHAR(255),     
    IN in_nullable BOOL, 
    IN in_field_data_type VARCHAR(255),
    IN in_field_props JSON,     
    IN in_default_value TEXT,
    IN in_is_primary BOOL
)
BEGIN
	 /* DECLARATION HERE */

	DECLARE field_existed INT;
    SELECT COUNT(*) INTO field_existed FROM `fields` WHERE `field_id` = in_field_id;
    
    IF field_existed > 0 THEN 

		UPDATE `fields` SET `is_primary` = in_is_primary WHERE `field_id` = in_field_id;
		IF in_is_primary = FALSE THEN
			INSERT INTO `default_value`(`field_id`, `default_value`) VALUES( in_field_id, in_default_value ); 
			UPDATE `fields` SET 
				`field_name` = in_field_name,
				`nullable` = in_nullable,
				`field_props` = in_field_props,
				`field_data_type` = in_field_data_type,
				`is_primary` = in_is_primary
			WHERE `field_id` = in_field_id;  
		ELSE
			DELETE FROM `default_value` WHERE `field_id` = in_field_id;   
			UPDATE `fields` SET 
				`field_name` = in_field_name,
				`nullable` = FALSE,
				`field_props` = in_field_props,
				`field_data_type` = in_field_data_type,
				`is_primary` = in_is_primary
			WHERE `field_id` = in_field_id;  
		END IF;
        SELECT TRUE AS `success`, "SUCCESSFULLY UPDATE FIELD STATE" AS `content`;    
	
    ELSE
		SELECT FALSE AS `success`, CONCAT("NO FIELD WITH ID ", in_field_id, " IS FOUND!") AS `content`;    
	END IF;
END

$$



DROP PROCEDURE IF EXISTS `drop_field` $$

CREATE PROCEDURE `drop_field`(
	IN in_field_id VARCHAR(255)    
)
BEGIN
	 /* DECLARATION HERE */

	DECLARE field_existed INT;
    SELECT COUNT(*) INTO field_existed FROM `fields` WHERE `field_id` = in_field_id;
    
    IF field_existed > 0 THEN 

		DELETE FROM `fields` WHERE `field_id` = in_field_id;		
        SELECT TRUE AS `success`, "SUCCESSFULLY DROP FIELD" AS `content`;    
	
    ELSE
		SELECT FALSE AS `success`, CONCAT("NO FIELD WITH ID ", in_field_id, " IS FOUND!") AS `content`;    
	END IF;
END

$$





























