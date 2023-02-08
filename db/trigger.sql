USE DIPE;

DELIMITER $$

DROP TRIGGER IF EXISTS AUTO_INSERT_BLANK_RECORD_AFTER_ADD_ACCOUNT $$
CREATE TRIGGER AUTO_INSERT_BLANK_RECORD_AFTER_ADD_ACCOUNT
AFTER INSERT ON `accounts`
FOR EACH ROW
BEGIN 
	INSERT INTO `account_detail`( `credential_string`, `fullname`, `phone`, `email`, `address` ) VALUES
    ( NEW.credential_string, "Unknown", "Unknown phone number", "Unknown email address", "Nowhere" );
END

$$

