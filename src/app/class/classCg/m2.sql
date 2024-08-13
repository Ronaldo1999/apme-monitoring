-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
USE grecodb; 
DROP PROCEDURE IF EXISTS psCgRapportPerformance_List ; 

DELIMITER $$	
CREATE PROCEDURE psCgRapportPerformance_List( _organisationID varchar(100),  _millesime varchar(3))
BEGIN
	SELECT   rapportID, code, version, periode, organisationID, millesime, titre, responsable, presentation,
	 objectif, strategie, contexte, performaceGlobale, difficultes, recommandations, dateGenere, last_update, user_update
	FROM cgrapportperformance
	WHERE
	organisationID = _organisationID
	AND millesime = _millesime;
END$$
DELIMITER ; 



-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
USE grecodb; 
DROP PROCEDURE IF EXISTS psCgRapportPerformance_Delete ; 

DELIMITER $$	
CREATE PROCEDURE psCgRapportPerformance_Delete( _rapportID VARCHAR(100)  )
BEGIN
	DELETE  
	FROM cgrapportperformance
	WHERE  rapportID = _rapportID  ;
END$$
DELIMITER ; 



-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
USE grecodb; 
DROP PROCEDURE IF EXISTS psCgRapportPerformance_Insert ; 

DELIMITER $$	
CREATE PROCEDURE psCgRapportPerformance_Insert( _rapportID VARCHAR(100)  , _code VARCHAR(45)  , _version INT  , _periode VARCHAR(50)  ,
 _organisationID VARCHAR(100)  , _millesime VARCHAR(3)  , _titre TEXT  , _responsable TEXT  ,
  _presentation TEXT  , _objectif TEXT  , _strategie TEXT  , _contexte TEXT  ,
   _performaceGlobale TEXT  , _difficultes TEXT  , _recommandations TEXT  ,
    _dateGenere VARCHAR(100)  , _last_update VARCHAR(100)  , _user_update VARCHAR(100))
BEGIN
	IF NOT EXISTS (SELECT rapportID FROM cgrapportperformance WHERE  rapportID = _rapportID  ) THEN  
		INSERT INTO cgrapportperformance(   rapportID, code, version, periode, organisationID, millesime, titre, responsable,
		 presentation, objectif, strategie, contexte, performaceGlobale, difficultes, recommandations, dateGenere, last_update, user_update)
		VALUES (  _rapportID, _code, _version, _periode, _organisationID, _millesime, _titre, _responsable,
		 _presentation, _objectif, _strategie, _contexte, _performaceGlobale, _difficultes, _recommandations, _dateGenere, CURRENT_TIMESTAMP(), _user_update);
	ELSE 
		UPDATE cgrapportperformance 
			SET 
				
				code = _code, 
				version = _version +1, 
				periode = _periode, 
				organisationID = _organisationID, 
				millesime = _millesime, 
				titre = _titre, 
				responsable = _responsable, 
				presentation = _presentation, 
				objectif = _objectif, 
				strategie = _strategie, 
				contexte = _contexte, 
				performaceGlobale = _performaceGlobale, 
				difficultes = _difficultes, 
				recommandations = _recommandations, 
				dateGenere = _dateGenere, 
				last_update = CURRENT_TIMESTAMP(), 
				user_update = _user_update
		WHERE  rapportID = _rapportID  ;
	END IF; 
END$$
DELIMITER ;







