USE MLCMS;

DELIMITER $$

DROP PROCEDURE IF EXISTS `add_field`;
CREATE PROCEDURE `add_field` ( 
	IN in_table_id INT, IN in_field_name VARCHAR(255), 
    IN in_field_alias VARCHAR(255), 
    IN in_nullable BOOL, 
    IN in_field_props JSON, 
    IN in_field_data_type VARCHAR(255),
    IN in_default_value TEXT 
)
BEGIN 
	IF in_field_props = "" OR in_field_props IS NULL THEN
		INSERT INTO `fields` ( `table_id`, `field_alias`, `nullable`, `field_props`, `field_data_type`, `default_value` ) VALUES
		( in_table_id, in_field_alias, in_nullable, '{ "DEFAULT": "NULL" }', in_field_data_type, in_default_value )
    ELSE
		INSERT INTO `fields` ( `table_id`, `field_alias`, `nullable`, `field_props`, `field_data_type`, `default_value` ) VALUES
		( in_table_id, in_field_alias, in_nullable, in_field_props, in_field_data_type, in_default_value )
    END IF	
END
/* TRIGGER IS GONNA BE CALLED SOON */
$$