-- liste


-- insert

CREATE DEFINER=`root`@`localhost` PROCEDURE `psArbreDetail_Insert`(_user_update varchar(20), _ip_update varchar(20),
								_arbreDetailID varchar(50),_code varchar(50),_libelleFr varchar(2000),_libelleUs varchar(2000),
                                _arbreTypeID varchar(75),_arbreNiveauID varchar(75),_arbreDetailParentID varchar(50),_arbreID varchar(50),
                                _organisationID varchar(50), _numOrdre int (11),_pos_x int (11), _pos_y int (11), _extremiteLien varchar(50))
BEGIN

	SET @organisationID = '';
    SET @arbreTypeID = '';
	SELECT organisationID, arbreTypeID
			FROM arbre 
			WHERE arbreID = _arbreID
			INTO @organisationID, @arbreTypeID;

	INSERT INTO `grecodb`.`arbredetail`
				(`last_update`,`user_update`,`ip_update`,`arbreDetailID`,`code`,`libelleFr`,`libelleUs`,`arbreTypeID`,`arbreNiveauID`,`arbreDetailParentID`,`arbreID`,`organisationID`,`numOrdre`,`pos_x`,`pos_y`,`extremiteLien`)
	VALUES (CURRENT_TIMESTAMP, _user_update, _ip_update, _arbreDetailID, _code, _libelleFr, _libelleUs, @arbreTypeID, _arbreNiveauID, _arbreDetailParentID, _arbreID, @organisationID, _numOrdre, _pos_x, _pos_y, _extremiteLien);


END

-- update

CREATE DEFINER=`root`@`localhost` PROCEDURE `psArbre_Update`(_user_update varchar(20), _ip_update varchar(20),
								_arbreID varchar(50),_code varchar(50),_libelleFr varchar(2000),
								_libelleUs varchar(2000),_arbreTypeID varchar(75),
                                _arbreCorrespondantID varchar(50),_organisationID varchar(50))
BEGIN

UPDATE `grecodb`.`arbre`
SET
`last_update` =  CURRENT_TIMESTAMP,
`user_update` = _user_update,
`ip_update` = _ip_update,
`code` = _code,
`libelleFr` = _libelleFr,
`libelleUs` = _libelleUs,
`arbreTypeID` = _arbreTypeID,
`arbreCorrespondantID` = _arbreCorrespondantID,
`organisationID` = _organisationID
WHERE `arbreID` = _arbreID;

END

-- delete

CREATE DEFINER=`root`@`localhost` PROCEDURE `psArbre_Delete`(_arbreID varchar(50), _user_update varchar(50))
BEGIN

SET @arbreID = '';

	SELECT arbreID FROM arbre WHERE arbreID = _arbreID INTO @arbreID;

	DELETE FROM `grecodb`.`arbre` WHERE arbreID =_arbreID;

END