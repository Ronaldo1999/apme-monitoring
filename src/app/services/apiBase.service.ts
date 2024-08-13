
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { Comptabilite } from 'src/app/class/class/comptabilite/comptabilite';
import { CourrierTransfert } from 'src/app/class/class/courrier-transfert/courrier-transfert';
import { Courrier } from 'src/app/class/class/courrier/courrier';

import { Dossier } from 'src/app/class/class/dossier/dossier';
import { Exercice } from 'src/app/class/class/exercice/exercice';
import { Fonction } from 'src/app/class/class/fonction/fonction';
import { Initiateur } from 'src/app/class/class/initiateur/initiateur';
import { Localisation } from 'src/app/class/class/localisation/localisation';
import { Localite } from 'src/app/class/class/localite/localite';
import { Localiteniveaux } from 'src/app/class/class/localiteniveaux/localiteniveaux';
import { Modebudget } from 'src/app/class/class/modebudget/modebudget';
import { Organisation } from 'src/app/class/class/organisation/organisation';
import { Piecejointe } from 'src/app/class/class/pieceVisibilite/piecejointe';

import { Poste } from 'src/app/class/class/poste/poste';
import { Priorite } from 'src/app/class/class/priorite/priorite';
import { ResponseFile } from 'src/app/class/class/ReponseFile/response-file';
import { Role } from 'src/app/class/class/role/role';
import { Secteur } from 'src/app/class/class/secteur/secteur';
import { Sensibilite } from 'src/app/class/class/sensibilite/sensibilite';
import { Souscategorie } from 'src/app/class/class/souscategorie/souscategorie';
import { Structure } from 'src/app/class/class/structure/structure';
import { Type } from 'src/app/class/class/type/type';
import { Uniteorganique } from 'src/app/class/class/uniteorganique/uniteorganique';
import { User } from 'src/app/class/class/user/user';
import { UserGlobal } from 'src/app/class/class/userGlobal/user-global';
import { UserSensibilite } from 'src/app/class/class/user-sensibilite';

import { catchError, map, tap } from 'rxjs/operators';

import { Systeme } from 'src/app/class/class/systeme/systeme';
import { Modules } from 'src/app/class/class/module/modules';
import { Groupe } from 'src/app/class/class/groupe/groupe';
import { GroupeGlobal } from 'src/app/class/class/groupeGlobal/groupe-global';
import { Message } from 'src/app/class/class/messages/message';
import { UserMessage } from 'src/app/class/class/userMessage/user-message';
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { ActiviteObjectif } from 'src/app/class/classCg/activiteObjectif/activite-objectif';
import { Activite } from 'src/app/class/classCg/activite/activite';
import { OperationBudgetaire } from 'src/app/class/classCg/operationBudgetaire/operation-budgetaire';
import { ActiviteCopie } from 'src/app/class/classCg/copie/activite-copie';
import { ActiviteParametre } from 'src/app/class/classCg/activiteParametre/activite-parametre';
import { Activiterapportperiode } from 'src/app/class/classCg/activiterapportperiode/activiterapportperiode';
import { Activiterapport } from 'src/app/class/classCg/activiterapport/activiterapport';
import { CalendrierBudgetaire } from 'src/app/class/classCg/calendrierBudgetaire/calendrier-budgetaire';
import { ParametreOuverture } from 'src/app/class/classCg/parametreOuverture/parametre-ouverture';
import { CgOrganisation } from 'src/app/class/classCg/cgOrganisation/cg-organisation';
import { Mission } from 'src/app/class/classCg/mission/mission';
import { Indicateur } from 'src/app/class/classCg/indicateur/indicateur';
import { UniteMesure } from 'src/app/class/classCg/uniteMesure/unite-mesure';
import { Pivaut } from 'src/app/class/class/pivaut/pivaut';

import { Journal } from 'src/app/class/class/journal/journal';
import { Postecomptable } from 'src/app/class/class/postecomptable/postecomptable';
import { Postecomptablenature } from 'src/app/class/class/postecomptablenature/postecomptablenature';
import { FindParam } from 'src/app/class/class/findparam/find-param';

import { Circuit } from 'src/app/class/class/circuit/circuit';
import { Notificateur } from 'src/app/class/class/notification/notification';

import { PrepaBudget } from 'src/app/class/classCg/prepaBudget/prepa-budget';
import { ActiviteGlobal } from 'src/app/class/classCg/activiteGlobal/activite-global';
import { DialogueAction } from 'src/app/class/classCg/DialogueAction/dialogue-action';
import { DialogueGestion } from 'src/app/class/classCg/dialogueGestion/dialogue-gestion';
import { DialogueSession } from 'src/app/class/classCg/dialogueSession/dialogue-session';
import { DialogueTheme } from 'src/app/class/classCg/dialogueTheme/dialogue-theme';
import { CharteContent } from 'src/app/class/classCg/charteContent/charte-content';
import { ConfigService } from './config.service';
import { IndicateurCle } from 'src/app/class/classCg/indicateurCle/indicateur-cle';
import { UpdateState } from '../class/update-state';
import { PlanTravail } from '../class/monitoringClass/plantravail.model';
import { ActiviteARealiser, MoActiviteObjectif } from '../class/monitoringClass/activitearealiser.model';
import { MoOperation } from '../class/monitoringClass/operation.model';
import { MoPointFocale } from '../class/monitoringClass/pointfocale';
import { MoUniteOeuvre } from '../class/monitoringClass/unite-oeuvre.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  urlFichierUpload = ''
  urlFichierDownload = ''

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// CONTROLE DE GESTION URLs/////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  urlActiviteUserList = ''
  urlActiviteUserInsert = ''
  urlActiviteUserNotifier = ''


  urlcgstatdossier = ''
  urlcgstatstructure = ''
  urlcgstatimputation = ''
  urlcgstatrejet = ''


  ///// lettre Mission
  urlLettreMissionList = ''
  urlLettreMissionInsert = ''
  urlLettreMissionDelete = ''

  ///// charte de gestion 
  urlCharteGestionList = ''
  urlCharteGestionInsert = ''
  urlCharteGestionDelete = ''

  ///// Dialoge de gestion 
  urlDialogueGestionList = ''
  urlDialogueGestionInsert = ''
  urlDialogueGestionDelete = ''

  urlDialogueActionList = ''
  urlDialogueActionInsert = ''
  urlDialogueActionDelete = ''

  urlDialogueSessionList = ''
  urlDialogueSessionInsert = ''
  urlDialogueSessionDelete = ''

  urlDialogueThemeList = ''
  urlDialogueThemeInsert = ''
  urlDialogueThemeDelete = ''



  urlOrganisationList2: string = ''
  urlSoureFinancementList: string = ''
  urlCompteList: string = ''
  urlCompteInsert: string = ''
  urlCompteDelete: string = ''

  // prepaBudget
  urlPrepaBudgetlist: string = ''
  urlPrepaBudgetInsert!: string


  _jsonURL = '../../assets/file.json';
  _jsonURL2 = '../../assets/objectif.json';
  urlProgrammeList = ''
  urlProgrammeInsert = ''
  urlProgrammeUpdate = ''
  urlProgrammeDelete = ''


  //global

  urlActiviteGlobalFind !: string
  urlActiviteGlobalInsert !: string
  urlActiviteGlobalUpdate !: string

  urlDcrList = ''
  //prepaactivite
  urlPrepaActiviteList !: string
  urlPrepaActiviteInsert !: string
  urlPrepaActiviteDelete !: string


  // activite
  urlActiviteList = ''
  urlActiviteStrategieList = ''
  urlActiviteByNiveau = ''
  urlActiviteChildsList = ''
  urlActiviteAndChilds = ''
  urlActiviteAllChildsList = ''
  urlCgActiviteList = ''

  urlCgActiviteByNiveau = ''
  urlCgActiviteDelete = ''
  urlCgActiviteInsert = ''

  urlActiviteInsert = ''

  urlActiviteUpdate = ''
  urlActiviteDelete = ''

  urlActiviteObjectifList = ''
  urlActiviteObjectifInsert = ''
  urlActiviteObjectifUpdate = ''
  urlActiviteObjectifDelete = ''

  // operation-budgetaire
  urlOperationsList = ''
  urlOperationInsert = ''
  urlCgOperationsList = ''
  urlCgOperationInsert = ''
  urlCgOperationUpdate = ''
  urlOperationUpdate = ''
  urlOperationDelete = ''

  // utiles phases & activites
  urlparentUpdate = ''
  urlCopierPhase = ''
  urlCopierActivite = ''

  urlActiviteParam = ''
  urlActiviteControlePoids = ''



  //activite Rapport
  urlActiviterapportInsert = ''
  urlActiviterapportperiodeInsert: string = ''
  urlActiviterapportperiodeList: string = ''
  urlActiviterapportlistList: string = ''
  urlActiviteExtraire: string = ''
  urlReportActiviterapport: string = ''
  urlPtaReport: string = ''
  urlBudgetByTacheReport: string = ''
  urlPtaPerformanceReport: string = ''


  // budget

  //calendrierBudgetaire
  urlCalendrierBudgetaireList = ''
  urllistOrganisationByPeriodeContextualise = ''
  urlCalendrierBudgetaireControle = ''
  urlCalendrierBudgetaireListByOrgAndMillesime = ''
  urlCalendrierBudgetaireInsert = ''
  urlCalendrierBudgetaireUpdate = ''
  urlCalendrierBudgetaireDelete = ''


  //calendrierBudgetaireOrg
  urlCalendrierBudgetaireOrgList = ''
  urlCalendrierBudgetaireOrgEmailList = ''
  urlCalendrierBudgetaireListOrgByOrgAndMillesime = ''
  urlCalendrierBudgetaireOrgInsert = ''
  urlCalendrierBudgetaireOrgUpdate = ''
  urlCalendrierBudgetaireOrgDelete = ''
  urllistControleContextualisation = ''
  urlCalendrierBudgetaireCloture: string = ''
  urlCalendrierBudgetaireNotification = ''

  //ParametreOuverture
  urlParametreOuvertureInsert: string = ''

  //listecgOrganisation
  urlCgOrganisationList: string = ''

  //login
  urllogin = ''

  //calendrierBudgetaireOrgfindByPeriode
  urlcalendrierBudgetaireOrgfindByPeriode = ''


  // Tableau de bord 
  urlCgNiveauExecutionPTA = ''

  //missions/ objectifs / facteursCles

  urlMissionList = ''
  urlMissionObjFactList = ''
  urlMissionInsert = ''
  urlMissionUpdate = ''
  urlMissionDelete = ''

  urlMissionCopie = ''
  urlMissionDeplacer = ''
  // indicateur cles

  urlKpiInsert = ''
  urlKpiList = ''
  urlKpiDetailList = ''
  urlKpiDetailInsert = ''
  urlKpiListBsc = ''

  // indicateur

  urlIndicateurInsert = ''
  urlIndicateurAnnualList = ''
  urlIndicateurList = ''
  urlSousIndicateurList = ''
  urlIndicateurListValider = ''
  urlIndicateurListByBsc = ''
  urlIndicateurListByDCR = ''
  urlIndicateurUpdate = ''
  urlIndicateurValider = ''
  urlIndicateurTransmission = ''
  urlIndicateurDelete = ''
  urlIndicateurUpdateValeur = ''
  urlIndicateurUpdateValeurPerMonth = ''
  urlIndicateurReaffecterDCR = ''
  urlIndicateurPoids = ''
  urlIndicateurJournal = ''
  urlIndicateurSourceUpload = ''

  //unites de uniteMesure

  urlUniteMesureList = ''
  urlUniteMesureInsert = ''
  urlUniteMesureUpdate = ''
  urlUniteMesureDelete = ''


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  /////////////////////////////////////////////////////// Risques URLs /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// Risques de gestion URLs /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// Risques de gestion URLs /////////////////////////////////////////////////////////////

  urlRiskList: string = ''
  urlRiskListByOrganisation: string = ''
  urlRiskExpositionList: string = ''
  urlRiskJournal: string = ''
  urlRiskInsert: string = ''
  urlRiskUpdate: string = ''
  urlRiskDelete: string = ''
  urlRiskReport: string = ''



  urlRiskActionList: string = ''
  urlRiskActionJournal: string = ''
  urlRiskActionListByRisque: string = ''
  urlRiskActionListByOrganisation: string = ''
  urlRiskActionInsert: string = ''
  urlRiskActionUpdate: string = ''
  urlRiskActionDelete: string = ''
  urlRiskActionReport: string = ''
  urlRiskActionReportWord: string = ''


  urlRiskFamilleList: string = ''
  urlRiskFamilleInsert: string = ''
  urlRiskFamilleUpdate: string = ''
  urlRiskFamilleDelete: string = ''

  urlRiskResponsableList: string = ''
  urlRiskResponsableInsert: string = ''
  urlRiskResponsableUpdate: string = ''
  urlRiskResponsableDelete: string = ''

  urlRiskControlePoidsList: string = ''
  urlRiskMoyennePoids: string = ''
  urlRiskSetAll: string = ''




  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





  urlPostecomptableList: string = ''
  urlPostecomptableInsert: string = ''
  urlPostecomptableUpdate: string = ''
  urlPostecomptableDelete: string = ''


  urlPostecomptablenatureList: string = ''
  urlPostecomptablenatureInsert: string = ''
  urlPostecomptablenatureUpdate: string = ''
  urlPostecomptablenatureDelete: string = ''

  urlRegistreEntrantList: string = ''
  urlRegistreSortantList: string = ''
  urlRegistreEntrantReport: string = ''
  urlRegistreSortantReport: string = ''

  urlJournalList: string = ''
  urlJournalListByUser: string = ''
  urlJournalListByCourrier: string = ''

  urlRelanceList: string = ''
  urlRelanceInsert: string = ''
  urlRelanceChangeDuree: string = ''
  urlRelanceDelete: string = ''

  urlStructureListByMultiOrg: string = ''
  urlStructureList: string = ''
  urlStructureListCg: string = ''
  urlStructureListCo: string = ''
  urlStructureListPhare: string = ''
  urlStructureListByUniteOrg: string = ''
  urlStructureListByIndicateur: string = ''
  urlStructureListByCourrier: string = ''
  urlStructureInsert: string = ''
  urlStructureUpdate: string = ''
  urlStructureDelete: string = ''

  urlOrganisationList: string = ''
  urlOrganisationListByUser: string = ''
  urlOrganisationInsert: string = ''
  urlOrganisationUpdate: string = ''
  urlOrganisationDelete: string = ''
  urlOrganisationListBySecteur: string = ''

  urlPorteTraitementList: string = ''
  urlCrPorteTraitementList: string = ''
  urlCrPorteTraitementInsert: string = ''
  urlCrPorteTraitementUpdate: string = ''
  urlCrPorteTraitementDelete: string = ''
  urlCrPorteTraitementListByOrganisation: string = ''
  urlPosteTraitementListByMultiStructure: string = ''
  urlPosteTraitementListByMultiOrganisation: string = ''
  urlCrPorteTraitementListByUser: string = ''
  urlCrPorteTraitementListByOrganisationAndUser: string = ''

  urlCrTypeList: string = ''
  urlCrTypeInsert: string = ''
  urlCrTypeUpdate: string = ''
  urlCrTypeDelete: string = ''

  urlCrPrioriteList: string = ''
  urlCrPrioriteInsert: string = ''
  urlCrPrioriteUpdate: string = ''
  urlCrPrioriteDelete: string = ''

  urlCrPieceJointeList: string = ''
  urlCrPieceJointeInsert: string = ''
  urlCrPieceJointeUpdate: string = ''
  urlCrPieceJointeDelete: string = ''

  urlLocalisationList: string = ''
  urlLocalisationInsert: string = ''
  urlLocalisationUpdate: string = ''
  urlLocalisationDelete: string = ''

  urlSecteurList: string = ''
  urlSecteurInsert: string = ''
  urlSecteurUpdate: string = ''
  urlSecteurDelete: string = ''

  urlSousCategorieList: string = ''
  urlSousCategorieInsert: string = ''
  urlSousCategorieUpdate: string = ''
  urlSousCategorieDelete: string = ''

  urlModeDeBudgetList: string = ''
  urlModeDeBudgetInsert: string = ''
  urlModeDeBudgetUpdate: string = ''
  urlModeDeBudgetDelete: string = ''

  urlComptabiliteList: string = ''
  urlComptabiliteInsert: string = ''
  urlComptabiliteUpdate: string = ''
  urlComptabiliteDelete: string = ''

  urlUniteOrganiqueList: string = ''
  urlUniteOrganiqueListByStr: string = ''
  urlUniteOrganiqueInsert: string = ''
  urlUniteOrganiqueUpdate: string = ''
  urlUniteOrganiqueDelete: string = ''

  urlSensibiliteList: string = ''
  urlSensibiliteInsert: string = ''
  urlSensibiliteUpdate: string = ''
  urlSensibiliteDelete: string = ''

  urlLocaliteList: string = ''
  urlLocaliteInsert: string = ''
  urlLocaliteUpdate: string = ''
  urlLocaliteDelete: string = ''

  urlFonctionList: string = ''
  urlFonctionInsert: string = ''
  urlFonctionUpdate: string = ''
  urlFonctionDelete: string = ''

  urlDossierList: string = ''
  urlDossierListTree: string = ''
  urlDossierCourrierList: string = ''
  urlDossierInsert: string = ''
  urlDossierUpdate: string = ''
  urlDossierDelete: string = ''


  //utilisateurs
  urlUserList: string = ''
  urlUserListByPoste: string = ''
  urlUserListByMultiPoste: string = ''
  urlUserListByConnected: string = ''
  urlUserListDescendance: string = ''
  urlUserInsert: string = ''
  urlUserUpdate: string = ''
  urlUserDelete: string = ''
  urlUserGlobalInsert: string = ''
  urlUserGlobalFind: string = ''
  urlUserGlobalUpdate: string = ''
  urlUserCodifier: string = ''



  urlLocaliteNiveauxList: string = ''
  urlLocaliteNiveauxInsert: string = ''
  urlLocaliteNiveauxUpdate: string = ''
  urlLocaliteNiveauxDelete: string = ''

  urlCourrierInsert: string;

  urlCourrierListCirculation: string
  urlCourrierListRelance: string
  urlCourrierCopie: string = ''
  urlCourrierCotes: string = ''
  urlCourrierUpdate: string;
  urlCourrierDelete: string;
  urlCourrierFind: string;
  urlCourrierInitiateurInsert: string = '';
  urlCourrierPostetraitementInsert: string = '';
  urlCourrierUserInsert: string = '';
  urlCircuitInsert: string = '';
  urlCourrierfinalInsert: string = ''
  urlCourrierfinalList: string = ''
  urlCourrierfinalListFile: string = ''
  urlCourrierfinalDelete: string = ''
  urlCourrierfinalUpdate: string = ''
  urlCourrierfinalTransmettre: string = ''
  urlCourrierList: string = ''
  urlCourrierListByParam: string = ''
  urlCourrierListCree: string = ''
  urlCourrierListReception: string = ''
  urlCourrierListRecu: string = ''
  urlCourrierListATransmettre: string = ''
  urlCourrierReception: string = ''
  urlCourrierDetail: string = ''
  urlCourrierAnnulerValidation: string = ''
  urlCourrierAnnulerTransmission: string = ''
  urlCourrierAnnulerReception: string = ''
  urlCourrierTransmis = ''
  urlCourrierValider = ''
  urlCourrierCloturer = ''
  urlCourrierListClos = ''
  urlCourrierArchiver = ''
  urlCourrierAnnulerArchivage = ''


  urlCourrierBordereau: string = ''
  urlListBordereau: string = ''
  urlListBordereauByPoste: string = ''
  urlReportBordereau: string = ''
  urlReportCircuit: string = ''
  urlReportCourrierRelance: string = ''
  urlReportCourrierFlux: string = ''
  urlReportCourrierInfo: string = ''


  urlJournalReport: string = ''


  //Exercice
  urlExerciceList: string = ''
  urlExerciceInsert: string = ''
  urlExerciceUpdate: string = ''
  urlExerciceDelete: string = ''

  //Initiateur
  urlInitiateurListAll: string = ''
  urlInitiateurList: string = ''
  urlInitiateurInsert: string = ''
  urlInitiateurUpdate: string = ''
  urlInitiateurDelete: string = ''

  //User_Sensibilite
  urlusersens: string = ''


  urlCourrierSortantList: string = ''
  urlCourrierEntrantList: string = ''



  //url pour gestioin des systems 
  urlSystemList: string = ''
  urlSystemListByLogin: string = ''
  urlSystemListByHabilitation: string = ''
  urlSystemInsert: string = ''
  urlSystemUpdate: string = ''
  urlSystemDelete: string = ''


  //url pour gestionn des modules
  urlModulesListByLogin: string = ''
  urlModulesListByHabilitation: string = ''
  urlModuleInsert: string = ''
  urlModuleUpdate: string = ''
  urlModuleDelete: string = ''

  //url pour gestion des groupes utilisateurs
  urlGroupList: string = ''
  urlGroupInsert: string = ''
  urlGroupDelete: string = ''
  urlGroupUpdate: string = ''
  urlGroupUpdater: string = ''
  urlGroupAffecterUser: string = ''
  urlGroupAffecterRole: string = ''


  //url pour ajouter supp modifier un role
  urlRolesList: string = ''
  urlRolesListByModule: string = ''
  urlRolesDelete: string = ''
  urlRolesByGroupe: string = ''
  urlRolesByUser: string = ''
  urlRolesByUserData: string = ''
  urlRolesInsert: string = ''
  urlRolesUpdate: string = ''


  urlUserDeconnexion: string = ''
  urlUserConnexion: string = ''
  urlUserListUpdate: string = ''
  urlUserAffecterStructure: string = ''
  urlUserAffecterPTraitement: string = ''
  urlUserGlobalByUserConnectedUpdate: string = ''

  urlMessageList: string = ''
  urlMessageNonLuList: string = ''
  urlNbrMessages: string = ''
  urlMessageMarqueLu: string = ''
  urlMessageînsert: string = ''
  urlMessageUpdate: string = ''
  urlMessageDelete: string = ''


  //files 
  urlUpdateFile: string = ''


  //Pivaut
  urlPivautList: string = ''

  //Usernotification
  urlSendMail: string = ''



  //CgReport
  urlCgReport: string = ''
  urlCgCharteGlobaleReport: string = ''
  urlCgCharteReport: string = ''
  urlCgDialogueGestionReport: string = ''
  urlCgSystemPerfReport: string = ''
  urlCgRegleGestionReport: string = ''
  urlCgLettreMissionReport: string = ''
  urlCgContextualiseReport: string = ''
  urlMissionReport = ''
  urlMissionListReport = ''
  urlIndicateurReport = ''
  urlIndicateursReport = ''
  urlindicateurSuiviReport = ''
  ////// visa urls /////

  urlCourrierVisaCreate = '';
  urlCourrierViserCourierCreate = '';
  urlCourrierViserListParafeur = '';
  urlCourrierVisaList = '';
  urlCircuitListByPost = '';
  urlCourrierVisaDelete = '';

  urlCircuitList: string = ''
  urlCircuitUpdate: string = ''


  urlTechnicienList: string = ''


  urlUserListe = '';
  urlGroupeListe = '';
  urlLocaliteByLevel = '';
  urlChangePassword = '';
  urlUpdateStates = '';
  urlUpdateState = '';
  urlFindCompte = '';
  urlMoListActivite = '';
  urlMoListTache = '';
  urlListMoActiviteARealiser = '';
  urlListMoActiviteARealiserAll = '';
  urlListMoARAlla = '';
  urlListMoOperationAll = '';
  urlListMoOperationComptes = '';
  urlListMoMemoire = '';
  urlPaInsert = '';
  urlInsertMoActiviteARealiser = '';
  urlInserMoOperation = '';
  urlMoPlanTravail = '';
  urlMoPlanTravailAll = '';
  urlMoPlanTravailDelete = '';
  urlMoActiviteARDelete = '';
  urlPfInsert = '';
  urlListMoPFAll = '';
  urlListMoPFByUser = '';
  urlListMoPFAllDetail = '';
  urlListStructureByPf = '';
  urlListAgent = '';
  urlCompteOperationList = '';
  urlUoInsert = '';
  urlListUo = '';
  urlDeleteUo = '';

  urlFichierSaveFile = 'rhfile/file/rhSaveFile';
  urlFichierList = 'rhfile/file/list';
  urlFichierListAll = 'rhfile/file/listAll';
  urlFichierDelete = 'rhfile/file/delete';
  urlFichierDo = 'rhfile/file/delete';
  urlMoPlanStructure = '';
  urlListMoObjectif = '';
  urlListMoIndicateur = '';
  urlListActiviteTache = '';

  public getJSON(): Observable<any> {
    return this.http.get("assets/serveur.json")
  }

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService, private appConfigService: ConfigService) {
    this.getLocalIP();
    const urlserveur = this.appConfigService.getConfig().serverIP;

    this.urlTechnicienList = urlserveur + 'ticket/technicienList'
    this.urlcgstatdossier = urlserveur + 'cgStatistique/bcadossier'
    this.urlcgstatstructure = urlserveur + 'cgStatistique/bcastructure'
    this.urlcgstatimputation = urlserveur + 'cgStatistique/bcaimputation'
    this.urlcgstatrejet = urlserveur + 'cgStatistique/bcarejet'
    this.urlDcrList = urlserveur + 'cgDomaineCle/list'
    this.urlFichierUpload = urlserveur + 'fairu/upload'
    this.urlFichierDownload = urlserveur + 'fairu/download'



    this.urlActiviteUserList = urlserveur + 'user/listByActivite/'
    this.urlActiviteUserInsert = urlserveur + 'activite/usersInsert'
    this.urlActiviteUserNotifier = urlserveur + 'activite/notifier'
    this.urlCircuitList = urlserveur + 'courrier/circuitList/';
    this.urlCircuitUpdate = urlserveur + 'courrier/circuitUpdate/';
    this.urlIndicateurReport = urlserveur + 'cgreport/indicateurList'
    this.urlIndicateursReport = urlserveur + 'cgreport/indicateur'
    this.urlindicateurSuiviReport = urlserveur + 'cgreport/indicateurSuivi'

    /////////////////////////////////////////////////////// CONTROLE DE GESTION Urls init/////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////// CONTROLE DE GESTION Urls init/////////////////////////////////////////////////////////////
    this.urlOrganisationList2 = urlserveur + 'organisation/list/'
    this.urlStructureList = urlserveur + 'structure/list/'
    this.urlStructureListCg = urlserveur + 'structure/listCg/'
    this.urlStructureListCo = urlserveur + 'structure/listCo/'
    this.urlStructureListPhare = urlserveur + 'structure/listPhare/'
    this.urlStructureListByCourrier = urlserveur + 'structure/listByCourrier/'
    this.urlSoureFinancementList = urlserveur + 'sourceFin/list'
    this.urlCompteList = urlserveur + 'compte/list/'
    this.urlCompteInsert = urlserveur + 'compte/list/'
    this.urlCompteDelete = urlserveur + 'compte/list/'



    this.urlPrepaBudgetlist = urlserveur + 'prepaBudget/list/'
    this.urlPrepaBudgetInsert = urlserveur + 'prepaBudget/insert'

    this.urlProgrammeList = urlserveur + 'program/list/'
    this.urlProgrammeInsert = urlserveur + 'program/add/'
    this.urlProgrammeUpdate = urlserveur + 'program/update/'
    this.urlProgrammeDelete = urlserveur + 'program/delete/'


    this.urlLettreMissionList = urlserveur + 'charteGestion/contentList'
    this.urlLettreMissionInsert = urlserveur + 'charteGestion/contentInsert'
    this.urlLettreMissionDelete = urlserveur + 'charteGestion/contentDelete/'

    this.urlCharteGestionList = urlserveur + 'charteGestion/contentList'
    this.urlCharteGestionInsert = urlserveur + 'charteGestion/contentInsert'
    this.urlCharteGestionDelete = urlserveur + 'charteGestion/contentDelete/'

    this.urlDialogueGestionList = urlserveur + 'dialogue/gestionList'
    this.urlDialogueGestionInsert = urlserveur + 'dialogue/gestionInsert'
    this.urlDialogueGestionDelete = urlserveur + 'dialogue/gestionDelete/'

    this.urlDialogueActionList = urlserveur + 'dialogue/actionList'
    this.urlDialogueActionInsert = urlserveur + 'dialogue/actionInsert'
    this.urlDialogueActionDelete = urlserveur + 'dialogue/actionDelete/'

    this.urlDialogueSessionList = urlserveur + 'dialogue/sessionList'
    this.urlDialogueSessionInsert = urlserveur + 'dialogue/sessionInsert'
    this.urlDialogueSessionDelete = urlserveur + 'dialogue/sessionDelete/'

    this.urlDialogueThemeList = urlserveur + 'dialogue/themeList'
    this.urlDialogueThemeInsert = urlserveur + 'dialogue/themeInsert'
    this.urlDialogueThemeDelete = urlserveur + 'dialogue/themeDelete/'

    ////////// activite ////////////
    this.urlPrepaActiviteList = urlserveur + 'activite/prepaList'
    this.urlPrepaActiviteInsert = urlserveur + 'activite/prepaInsert'
    this.urlPrepaActiviteDelete = urlserveur + 'activite/prepaDelete/'

    ////////// activiteGlobal ////////////
    this.urlActiviteGlobalFind = urlserveur + 'activite/activiteGlobalFind/'
    this.urlActiviteGlobalInsert = urlserveur + 'activite/activiteGlobalInsert'
    this.urlActiviteGlobalUpdate = urlserveur + 'activite/activiteGlobalUpdate'


    this.urlActiviteList = urlserveur + 'activite/list/'
    this.urlActiviteStrategieList = urlserveur + 'activite/strategieList'
    this.urlActiviteByNiveau = urlserveur + 'activite/listByNiveau/'
    this.urlActiviteChildsList = urlserveur + 'activite/activiteChilds/'
    this.urlActiviteAndChilds = urlserveur + 'activite/listNiveauAndChilds/'
    this.urlActiviteAllChildsList = urlserveur + 'activite/activiteAllChilds/'
    this.urlActiviteInsert = urlserveur + 'activite/insert/'
    this.urlCgActiviteByNiveau = urlserveur + 'activite/CGlistByNiveau'
    this.urlCgActiviteList = urlserveur + 'activite/CGlist'
    this.urlCgActiviteInsert = urlserveur + 'activite/CGinsert'
    this.urlActiviteUpdate = urlserveur + 'activite/update/'
    this.urlActiviteDelete = urlserveur + 'activite/delete/'
    this.urlCgActiviteDelete = urlserveur + 'activite/CGdelete/'

    this.urlActiviteObjectifList = urlserveur + 'activiteObjectif/list/'
    this.urlActiviteObjectifInsert = urlserveur + 'activiteObjectif/insert'
    this.urlActiviteObjectifUpdate = urlserveur + 'activiteObjectif/update/'
    this.urlActiviteObjectifDelete = urlserveur + 'activiteObjectif/delete/'

    ////////// operation-budgetaire ////////////
    this.urlOperationsList = urlserveur + 'operation/list/'
    this.urlOperationInsert = urlserveur + 'operation/insert/'
    this.urlOperationUpdate = urlserveur + 'operation/update/'
    this.urlCgOperationsList = urlserveur + 'cgoperation/list/'
    this.urlCgOperationInsert = urlserveur + 'cgoperation/insert'
    this.urlCgOperationUpdate = urlserveur + 'cgoperation/update'
    this.urlOperationDelete = urlserveur + 'cgoperation/delete/'


    //////////// Utiles ///////

    this.urlCopierPhase = urlserveur + 'cgoperation/copie/'
    this.urlCopierActivite = urlserveur + 'cgoperation/copie/'
    this.urlparentUpdate = urlserveur + 'cgoperation/parent/'

    this.urlActiviteParam = urlserveur + 'activite/parametrer/'
    this.urlActiviteControlePoids = urlserveur + 'activite/controlePoids/'


    this.urlActiviterapportInsert = urlserveur + 'activiteRapport/insert'

    this.urlActiviterapportperiodeList = urlserveur + 'activiteRapportPeriode/list/'
    this.urlActiviterapportperiodeInsert = urlserveur + 'activiteRapportPeriode/insert'

    this.urlActiviterapportlistList = urlserveur + 'activiteRapportList/list/'
    this.urlActiviteExtraire = urlserveur + 'activiteRapport/extraire'
    this.urlReportActiviterapport = urlserveur + 'activiteRapportReport/report/'




    ////////// calendrierBudgetaire ////////////
    this.urlCalendrierBudgetaireList = urlserveur + 'calendrierBudgetaire/list/'
    this.urllistOrganisationByPeriodeContextualise = urlserveur + 'calendrierBudgetaire/listOrganisationByPeriodeContextualisee/'
    this.urlCalendrierBudgetaireControle = urlserveur + 'calendrierBudgetaire/controler/'
    this.urlCalendrierBudgetaireListByOrgAndMillesime = urlserveur + 'calendrierBudgetaire/listByOrgAndExercice/'
    this.urlCalendrierBudgetaireInsert = urlserveur + 'calendrierBudgetaire/insert'
    this.urlCalendrierBudgetaireUpdate = urlserveur + 'calendrierBudgetaire/update/'
    this.urlCalendrierBudgetaireDelete = urlserveur + 'calendrierBudgetaire/delete/'
    this.urlCalendrierBudgetaireCloture = urlserveur + 'calendrierBudgetaire/clotureAll'


    ////////// calendrierBudgetaireOrg ////////////
    this.urlCalendrierBudgetaireOrgList = urlserveur + 'calendrierBudgetaireOrg/list/'
    this.urlCalendrierBudgetaireOrgEmailList = urlserveur + 'calendrierBudgetaireOrg/notifier/'
    this.urllistControleContextualisation = urlserveur + 'calendrierBudgetaire/listControleContextualisation/'
    this.urlCalendrierBudgetaireListOrgByOrgAndMillesime = urlserveur + 'calendrierBudgetaireOrg/listByOrgAndExercice/'
    this.urlCalendrierBudgetaireOrgInsert = urlserveur + 'calendrierBudgetaireOrg/insert'
    this.urlCalendrierBudgetaireOrgUpdate = urlserveur + 'calendrierBudgetaireOrg/update/'
    this.urlCalendrierBudgetaireOrgDelete = urlserveur + 'calendrierBudgetaireOrg/delete/'
    this.urlCalendrierBudgetaireNotification = urlserveur + 'calendrierBudgetaireOrg/notification/'

    //////////calendrierBudgetaireOrgfindByPeriode ////////////
    this.urlcalendrierBudgetaireOrgfindByPeriode = urlserveur + 'calendrierBudgetaireOrg/findByPeriode/'

    //ParametreOuverture
    this.urlParametreOuvertureInsert = urlserveur + 'calendrierBudgetaire/ouverture'

    //Pivaut
    this.urlPivautList = urlserveur + 'secteur/pivaut'


    //listecgOrganisation
    this.urlCgOrganisationList = urlserveur + 'calendrierBudgetaire/listCgOrganisation/'

    // tableau de bord
    this.urlCgNiveauExecutionPTA = urlserveur + 'cgTableau/niveauExecutionPTA/'


    //missions/ objectifs / facteursCles
    this.urlMissionList = urlserveur + 'mission/list/'
    this.urlMissionObjFactList = urlserveur + 'mission/listObjFacteurs'
    this.urlMissionInsert = urlserveur + 'mission/insert'
    this.urlMissionCopie = urlserveur + 'mission/copie'
    this.urlMissionDeplacer = urlserveur + 'mission/deplacer'
    this.urlMissionUpdate = urlserveur + 'mission/update'
    this.urlMissionDelete = urlserveur + 'mission/delete/'

    //indicateur cles
    this.urlKpiInsert = urlserveur + 'indicateur/kpiInsert'
    this.urlKpiList = urlserveur + 'indicateur/kpiList'
    this.urlKpiListBsc = urlserveur + 'indicateur/kpiListBsc'
    this.urlKpiDetailList = urlserveur + 'indicateur/kpiDetailList'
    this.urlKpiDetailInsert = urlserveur + 'indicateur/kpiDetailInsert'

    //indicateur
    this.urlIndicateurInsert = urlserveur + 'indicateur/insert'
    this.urlIndicateurList = urlserveur + 'indicateur/list'
    this.urlSousIndicateurList = urlserveur + 'indicateur/sousIndicateurList'
    this.urlIndicateurAnnualList = urlserveur + 'indicateur/listAnnuel'
    this.urlIndicateurListValider = urlserveur + 'indicateur/listValider'
    this.urlIndicateurListByBsc = urlserveur + 'indicateur/listByBsc'
    this.urlIndicateurListByDCR = urlserveur + 'indicateur/listByDCR'
    this.urlIndicateurUpdate = urlserveur + 'indicateur/update'
    this.urlIndicateurValider = urlserveur + 'indicateur/valider'
    this.urlIndicateurTransmission = urlserveur + 'indicateur/transmission'
    this.urlIndicateurDelete = urlserveur + 'indicateur/delete/'
    this.urlIndicateurUpdateValeur = urlserveur + 'indicateur/updateValeur/'
    this.urlIndicateurUpdateValeurPerMonth = urlserveur + 'indicateur/updatePerMonth/'
    this.urlIndicateurReaffecterDCR = urlserveur + 'indicateur/reaffecterDCR/'
    this.urlIndicateurPoids = urlserveur + 'indicateur/reaffecterPoids/'
    this.urlIndicateurJournal = urlserveur + 'indicateur/journal'
    this.urlIndicateurSourceUpload = urlserveur + 'indicateur/source'

    //unite de mesure
    this.urlUniteMesureList = urlserveur + 'uniteMesure/list'
    this.urlUniteMesureInsert = urlserveur + 'uniteMesure/insert'
    this.urlUniteMesureUpdate = urlserveur + 'uniteMesure/update'
    this.urlUniteMesureDelete = urlserveur + 'uniteMesure/delete/'


    this.urlCgReport = urlserveur + 'cgreport/periode'
    this.urlPtaReport = urlserveur + 'cgreport/pta'
    this.urlBudgetByTacheReport = urlserveur + 'cgreport/budgetByTache'
    this.urlPtaPerformanceReport = urlserveur + 'cgreport/ptaPerformance'
    this.urlCgCharteReport = urlserveur + 'cgreport/charteReport'
    this.urlCgCharteGlobaleReport = urlserveur + 'cgreport/charteGlobalReport'
    this.urlCgDialogueGestionReport = urlserveur + 'cgreport/dialogueGestionReport'
    this.urlCgSystemPerfReport = urlserveur + 'cgreport/systemePerfReport'
    this.urlCgRegleGestionReport = urlserveur + 'cgreport/regleGestionReport'
    this.urlCgLettreMissionReport = urlserveur + 'cgreport/lettreMissionReport'

    this.urlMissionReport = urlserveur + 'cgreport/mission'
    this.urlMissionListReport = urlserveur + 'cgreport/missionList/'
    this.urlCgContextualiseReport = urlserveur + 'cgreport/periodeContextualisee/'

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







    /////////////////////////////////////////////////////// Risques Urls init/////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////// Risques Urls init/////////////////////////////////////////////////////////////


    this.urlRiskList = urlserveur + 'risk/list'
    this.urlRiskExpositionList = urlserveur + 'risk/expositionlist/'
    this.urlRiskListByOrganisation = urlserveur + 'risk/list/'
    this.urlRiskJournal = urlserveur + 'risk/journal/'
    this.urlRiskInsert = urlserveur + 'risk/insert'
    this.urlRiskUpdate = urlserveur + 'risk/update'
    this.urlRiskDelete = urlserveur + 'risk/delete/'
    this.urlRiskReport = urlserveur + 'riskReport/riskreport/'


    this.urlRiskActionList = urlserveur + 'riskaction/list'
    this.urlRiskActionJournal = urlserveur + 'riskaction/journal/'
    this.urlRiskActionListByRisque = urlserveur + 'riskaction/list/'
    this.urlRiskActionListByOrganisation = urlserveur + 'riskaction/list/'
    this.urlRiskActionInsert = urlserveur + 'riskaction/insert'
    this.urlRiskActionUpdate = urlserveur + 'riskaction/update'
    this.urlRiskActionDelete = urlserveur + 'riskaction/delete/'
    this.urlRiskActionReport = urlserveur + 'riskReport/riskactionreport/'
    this.urlRiskActionReportWord = urlserveur + 'riskReport/riskactionword/'

    this.urlRiskFamilleList = urlserveur + 'riskFamille/list'
    this.urlRiskFamilleInsert = urlserveur + 'riskFamille/insert'
    this.urlRiskFamilleUpdate = urlserveur + 'riskFamille/update'
    this.urlRiskFamilleDelete = urlserveur + 'riskFamille/delete/'

    this.urlRiskResponsableList = urlserveur + 'riskResponsable/list/'
    this.urlRiskResponsableInsert = urlserveur + 'riskResponsable/insert'
    this.urlRiskResponsableUpdate = urlserveur + 'riskResponsable/update'
    this.urlRiskResponsableDelete = urlserveur + 'riskResponsable/delete/'



    this.urlRiskControlePoidsList = urlserveur + 'riskcontrole/list/'
    this.urlRiskMoyennePoids = urlserveur + 'risk/moyenne/'
    this.urlRiskSetAll = urlserveur + 'risk/setall/'

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    this.urlPostecomptableList = urlserveur + 'postecomptable/list'
    this.urlPostecomptableInsert = urlserveur + 'postecomptable/insert'
    this.urlPostecomptableUpdate = urlserveur + 'postecomptable/update'
    this.urlPostecomptableDelete = urlserveur + 'postecomptable/delete/'
    this.urlPostecomptablenatureList = urlserveur + 'postecomptable/listNature'
    this.urlPostecomptablenatureInsert = urlserveur + 'postecomptable/insertNature'
    this.urlPostecomptablenatureUpdate = urlserveur + 'postecomptable/updateNature'
    this.urlPostecomptablenatureDelete = urlserveur + 'postecomptable/deleteNature/'





    this.urlRegistreEntrantList = urlserveur + 'registre/entrantList'
    this.urlRegistreSortantList = urlserveur + 'registre/sortantList'
    this.urlRegistreEntrantReport = urlserveur + 'registre/reportEntrant'
    this.urlRegistreSortantReport = urlserveur + 'registre/reportSortant'

    this.urlJournalListByUser = urlserveur + 'journal/list/'
    this.urlJournalListByCourrier = urlserveur + 'journal/listByCourrier/'

    this.urlRelanceList = urlserveur + 'relance/list'
    this.urlRelanceInsert = urlserveur + 'relance/insert'
    this.urlRelanceChangeDuree = urlserveur + 'relance/changeDureeRelance'
    this.urlRelanceDelete = urlserveur + 'relance/delete/'

    this.urlStructureList = urlserveur + 'structure/list/'
    this.urlStructureListByUniteOrg = urlserveur + 'structure/listByUniteOrg'
    this.urlStructureListByIndicateur = urlserveur + 'structure/listByIndicateur'
    this.urlStructureInsert = urlserveur + 'structure/insert'
    this.urlStructureUpdate = urlserveur + 'structure/update'
    this.urlStructureDelete = urlserveur + 'structure/delete/'
    this.urlStructureListByMultiOrg = urlserveur + 'structure/listStructureByMultiOrganisation/'

    this.urlOrganisationList = urlserveur + 'organisation/list/'
    this.urlOrganisationListByUser = urlserveur + 'organisation/listByUser/'
    this.urlOrganisationInsert = urlserveur + 'organisation/insert'
    this.urlOrganisationUpdate = urlserveur + 'organisation/update'
    this.urlOrganisationDelete = urlserveur + 'organisation/delete/'
    this.urlOrganisationListBySecteur = urlserveur + 'organisation/listBySecteur/'

    this.urlPorteTraitementList = urlserveur + 'crportetraitement/list'
    this.urlCrPorteTraitementList = urlserveur + 'crportetraitement/list/'
    this.urlCrPorteTraitementListByUser = urlserveur + 'crportetraitement/listByUser'
    this.urlCrPorteTraitementInsert = urlserveur + 'crportetraitement/insert'
    this.urlCrPorteTraitementUpdate = urlserveur + 'crportetraitement/update'
    this.urlCrPorteTraitementDelete = urlserveur + 'crportetraitement/delete/'
    this.urlCrPorteTraitementListByOrganisation = urlserveur + 'crportetraitement/listByOrganisation/'
    this.urlPosteTraitementListByMultiStructure = urlserveur + 'crportetraitement/listByMultiStructure/'
    this.urlPosteTraitementListByMultiOrganisation = urlserveur + 'crportetraitement/listByMultiOrganisation/'
    this.urlCrPorteTraitementListByOrganisationAndUser = urlserveur + 'crportetraitement/listByOrganisationAndUser/'

    this.urlCrTypeList = urlserveur + 'crtype/list'
    this.urlCrTypeInsert = urlserveur + 'crtype/insert'
    this.urlCrTypeUpdate = urlserveur + 'crtype/update'
    this.urlCrTypeDelete = urlserveur + 'crtype/delete/'

    this.urlCrPrioriteList = urlserveur + 'crpriorite/list'
    this.urlCrPrioriteInsert = urlserveur + 'crpriorite/insert'
    this.urlCrPrioriteUpdate = urlserveur + 'crpriorite/update'
    this.urlCrPrioriteDelete = urlserveur + 'crpriorite/delete/'

    this.urlCrPieceJointeList = urlserveur + 'crpiecejointe/list'
    this.urlCrPieceJointeInsert = urlserveur + 'crpiecejointe/insert'
    this.urlCrPieceJointeUpdate = urlserveur + 'crpiecejointe/update'
    this.urlCrPieceJointeDelete = urlserveur + 'crpiecejointe/delete/'

    this.urlLocalisationList = urlserveur + 'localisation/list'
    this.urlLocalisationInsert = urlserveur + 'localisation/insert'
    this.urlLocalisationUpdate = urlserveur + 'localisation/update'
    this.urlLocalisationDelete = urlserveur + 'localisation/delete/'

    this.urlSecteurList = urlserveur + 'secteur/list'
    this.urlSecteurInsert = urlserveur + 'secteur/insert'
    this.urlSecteurUpdate = urlserveur + 'secteur/update'
    this.urlSecteurDelete = urlserveur + 'secteur/delete/'

    this.urlSousCategorieList = urlserveur + 'categorie/list'
    this.urlSousCategorieInsert = urlserveur + 'categorie/insert'
    this.urlSousCategorieUpdate = urlserveur + 'categorie/update'
    this.urlSousCategorieDelete = urlserveur + 'categorie/delete/'

    this.urlModeDeBudgetList = urlserveur + 'modebudget/list'
    this.urlModeDeBudgetInsert = urlserveur + 'modebudget/insert'
    this.urlModeDeBudgetUpdate = urlserveur + 'modebudget/update'
    this.urlModeDeBudgetDelete = urlserveur + 'modebudget/delete/'

    this.urlComptabiliteList = urlserveur + 'postecomptable/list'
    this.urlComptabiliteInsert = urlserveur + 'comptabilite/insert'
    this.urlComptabiliteUpdate = urlserveur + 'comptabilite/update'
    this.urlComptabiliteDelete = urlserveur + 'comptabilite/delete/'

    this.urlUniteOrganiqueList = urlserveur + 'uniteorganique/list/'
    this.urlUniteOrganiqueListByStr = urlserveur + 'uniteorganique/listByStructure/'
    this.urlUniteOrganiqueInsert = urlserveur + 'uniteorganique/insert'
    this.urlUniteOrganiqueUpdate = urlserveur + 'uniteorganique/update'
    this.urlUniteOrganiqueDelete = urlserveur + 'uniteorganique/delete/'


    this.urlSensibiliteList = urlserveur + 'sensibilite/list'
    this.urlSensibiliteInsert = urlserveur + 'sensibilite/insert'
    this.urlSensibiliteUpdate = urlserveur + 'sensibilite/update'
    this.urlSensibiliteDelete = urlserveur + 'sensibilite/delete/'


    this.urlFonctionList = urlserveur + 'fonction/list'
    this.urlFonctionInsert = urlserveur + 'fonction/insert'
    this.urlFonctionUpdate = urlserveur + 'fonction/update'
    this.urlFonctionDelete = urlserveur + 'fonction/delete/'


    this.urlLocaliteList = urlserveur + 'localite/list'
    this.urlLocaliteInsert = urlserveur + 'localite/insert'
    this.urlLocaliteUpdate = urlserveur + 'localite/update'
    this.urlLocaliteDelete = urlserveur + 'localite/delete/'


    this.urlDossierList = urlserveur + 'crBoiteRangement/list'
    this.urlDossierListTree = urlserveur + 'crBoiteRangement/listDossier/'
    this.urlDossierCourrierList = urlserveur + 'crBoiteRangement/listCourrier'
    this.urlDossierInsert = urlserveur + 'crBoiteRangement/insert'
    this.urlDossierUpdate = urlserveur + 'crBoiteRangement/update'
    this.urlDossierDelete = urlserveur + 'crBoiteRangement/delete/'

    this.urlUserList = urlserveur + 'user/list/'
    this.urlUserListByPoste = urlserveur + 'user/listByPoste/'
    this.urlUserListByMultiPoste = urlserveur + 'user/listByMultiPoste'
    this.urlUserListByConnected = urlserveur + 'user/listByConnected'
    this.urlUserListDescendance = urlserveur + 'user/listDescendance/'
    this.urlUserInsert = urlserveur + 'user/insert'
    this.urlUserUpdate = urlserveur + 'user/update'
    this.urlUserDelete = urlserveur + 'user/delete/'
    this.urlUserGlobalInsert = urlserveur + 'user/insertGlobal'
    this.urlUserGlobalFind = urlserveur + 'user/findUserGlobal/'
    this.urlUserGlobalUpdate = urlserveur + 'user/updateUserGlobal'
    this.urlUserCodifier = urlserveur + 'user/codifier/'

    this.urlUserListUpdate = urlserveur + 'user/affecterUsers'
    this.urlUserAffecterStructure = urlserveur + 'user/affecterOrganisationStructure'
    this.urlUserAffecterPTraitement = urlserveur + 'user/affecterPostetraitement'
    this.urlUserGlobalByUserConnectedUpdate = urlserveur + 'user/updateUserGlobalByUserConnected'


    this.urlLocaliteNiveauxList = urlserveur + 'localiteniveau/list'
    this.urlLocaliteNiveauxInsert = urlserveur + 'localiteniveau/insert'
    this.urlLocaliteNiveauxUpdate = urlserveur + 'localiteniveau/update'
    this.urlLocaliteNiveauxDelete = urlserveur + 'localiteniveau/delete/'

    this.urlCourrierFind = urlserveur + 'courrier/find/'
    this.urlCourrierList = urlserveur + 'courrier/list'
    this.urlCourrierCopie = urlserveur + 'courrier/listCopie'
    this.urlCourrierCotes = urlserveur + 'courrier/listCotation'
    this.urlCourrierListByParam = urlserveur + 'courrier/listByParam'
    this.urlCourrierListCirculation = urlserveur + 'courrier/listCourrierCirculation'
    this.urlCourrierListRelance = urlserveur + 'courrier/listCourrierRelance/'
    this.urlCourrierInsert = urlserveur + 'courrier/insert'
    this.urlCourrierUpdate = urlserveur + 'courrier/update'
    this.urlCourrierDelete = urlserveur + 'courrier/delete/'
    this.urlCourrierInitiateurInsert = urlserveur + 'courrier/insertCourrierUser/';
    this.urlCourrierPostetraitementInsert = urlserveur + 'courrier/insertPostetraitement/';
    this.urlCourrierUserInsert = urlserveur + 'courrier/insertCourrierUser/';

    this.urlCircuitInsert = urlserveur + 'courrier/insertCircuit/';
    this.urlCourrierfinalInsert = urlserveur + 'courrier/insertCourrierfinal';
    this.urlCourrierfinalList = urlserveur + 'courrier/listByCourrier/';
    this.urlCourrierfinalListFile = urlserveur + 'file/filesByCourrier/';
    this.urlCourrierfinalUpdate = urlserveur + 'courrier/updateCourrierfinal';
    this.urlCourrierfinalTransmettre = urlserveur + 'courrier/transmission/'
    this.urlCourrierListCree = urlserveur + 'courrier/listCree'
    this.urlCourrierListReception = urlserveur + 'courrier/listReception'
    this.urlCourrierListRecu = urlserveur + 'courrier/listRecu'
    this.urlCourrierListATransmettre = urlserveur + 'courrier/listATransmettre/'
    this.urlCourrierBordereau = urlserveur + 'courrier/insertBordereau'
    this.urlCourrierReception = urlserveur + 'courrier/receptionCourrier/'
    this.urlCourrierDetail = urlserveur + 'courrier/detailCourrier/'
    this.urlCourrierAnnulerValidation = urlserveur + 'courrier/annulerValidation'
    this.urlCourrierAnnulerTransmission = urlserveur + 'courrier/annulerTransmission/'
    this.urlCourrierAnnulerReception = urlserveur + 'courrier/annulerReception'
    this.urlCourrierValider = urlserveur + 'courrier/valider'
    this.urlCourrierTransmis = urlserveur + 'courrier/listTransmis/'
    this.urlCourrierCloturer = urlserveur + 'courrier/cloturerCourrier/'
    this.urlCourrierListClos = urlserveur + 'courrier/listClos'
    this.urlCourrierArchiver = urlserveur + 'courrier/archiverCourrier/'
    this.urlCourrierAnnulerArchivage = urlserveur + 'courrier/annulerArchivage/'

    this.urlListBordereau = urlserveur + 'courrier/reportBordereau/list'
    this.urlListBordereauByPoste = urlserveur + 'courrier/bordereauList/'
    this.urlReportBordereau = urlserveur + 'courrier/reportBordereau/'
    this.urlReportCircuit = urlserveur + 'courrier/reportCircuit/'
    this.urlReportCourrierRelance = urlserveur + 'courrier/reportCourrierRelance/'
    this.urlReportCourrierFlux = urlserveur + 'courrier/reportCourrierFlux/'
    this.urlReportCourrierInfo = urlserveur + 'courrier/reportCourrier/'


    this.urlJournalReport = urlserveur + 'journal/report/'

    // this.urlCourrierfinalDelete=urlserveur + 'courrier/delete/'; /reportCircuit/{courrierID}/{format}  /printCourrierRelance/{titre}/{structure} /piecevisibilite/{courrierID}

    this.urlExerciceList = urlserveur + 'exercice/list'
    this.urlExerciceInsert = urlserveur + 'exercice/insert'
    this.urlExerciceUpdate = urlserveur + 'exercice/update'
    this.urlExerciceDelete = urlserveur + 'exercice/delete/'

    this.urlInitiateurListAll = urlserveur + 'initiateur/listAll'
    this.urlInitiateurList = urlserveur + 'initiateur/list/'
    //this.urlInitiateurFind=urlserveur+'initiateur/find/'
    this.urlInitiateurInsert = urlserveur + 'initiateur/insert'
    this.urlInitiateurUpdate = urlserveur + 'initiateur/update'
    this.urlInitiateurDelete = urlserveur + 'initiateur/delete/'

    this.urlusersens = urlserveur + 'crusersens/insert'


    this.urlJournalList = urlserveur + 'courrier/journal/'
    this.urlCourrierEntrantList = urlserveur + 'courrier/listCourrierEntrant/'
    this.urlCourrierSortantList = urlserveur + 'courrier/listCourrierSortant/'




    this.urlSystemList = urlserveur + 'systeme/list'
    this.urlSystemListByLogin = urlserveur + 'systeme/listByLogin/'
    this.urlSystemListByHabilitation = urlserveur + 'systeme/listByHabilitation/'
    this.urlSystemInsert = urlserveur + 'systeme/insert'
    this.urlSystemUpdate = urlserveur + 'systeme/update'
    this.urlSystemDelete = urlserveur + 'systeme/delete/'


    this.urlModulesListByLogin = urlserveur + 'module/listByLogin/'
    this.urlModulesListByHabilitation = urlserveur + 'module/listByHabilitation/'
    this.urlModuleInsert = urlserveur + 'module/insert'
    this.urlModuleUpdate = urlserveur + 'module/update'
    this.urlModuleDelete = urlserveur + 'module/delete/'


    this.urlGroupList = urlserveur + 'groupe/list'
    this.urlGroupInsert = urlserveur + 'groupe/insert'
    this.urlGroupDelete = urlserveur + 'groupe/delete/'
    this.urlGroupUpdate = urlserveur + 'groupe/update'
    this.urlGroupAffecterUser = urlserveur + 'groupe/affecterUser'
    this.urlGroupAffecterRole = urlserveur + 'groupe/affecterRole'


    this.urlRolesList = urlserveur + 'role/list'
    this.urlRolesListByModule = urlserveur + 'role/listRoleByModule/'
    this.urlRolesDelete = urlserveur + 'role/delete/'
    this.urlRolesByGroupe = urlserveur + 'role/listRoleByGroupe/'
    this.urlRolesByUser = urlserveur + 'role/listRoleByUser/'
    this.urlRolesByUserData = urlserveur + 'role/listRoleByUserData'
    this.urlRolesInsert = urlserveur + 'role/insert'
    this.urlRolesUpdate = urlserveur + 'role/update'

    this.urlUserDeconnexion = urlserveur + 'user/deconnexion/'
    this.urlUserConnexion = urlserveur + 'user/connexion/'

    this.urlMessageList = urlserveur + 'messagerie/listByLogin/'
    this.urlMessageNonLuList = urlserveur + 'messagerie/listByLogin/'
    this.urlNbrMessages = urlserveur + 'messagerie/nbMessageNonLu/'
    this.urlMessageMarqueLu = urlserveur + 'messagerie/marqueLu/'
    this.urlMessageînsert = urlserveur + 'messagerie/insert'
    this.urlMessageUpdate = urlserveur + 'messagerie/update'
    this.urlMessageDelete = urlserveur + 'messagerie/delete/'

    /// Visa intit url value ///

    this.urlCourrierVisaCreate = urlserveur + 'visacourrier/insert'
    this.urlCourrierViserCourierCreate = urlserveur + 'courrier/viserCourrier'
    this.urlCourrierViserListParafeur = urlserveur + 'courrier/listParafeur'
    this.urlCourrierVisaList = urlserveur + 'visacourrier/list'
    this.urlCircuitListByPost = urlserveur + 'courrier/circuitListByPoste'
    this.urlCourrierVisaDelete = urlserveur + 'visacourrier/delete'

    /// end Visa intit url value ///


    this.urlUserListe = urlserveur + 'pfnl/vendeur/listUtilisateur';
    this.urlGroupeListe = urlserveur + 'pfnl/vendeur/listGroupes';
    this.urlLocaliteByLevel = urlserveur + 'pfnl/permis/localiteByLevel';
    this.urlChangePassword = urlserveur + 'pfnl/permis/changePassword';
    this.urlFichierUpload = urlserveur + 'pfnl/permis/upload';
    this.urlFichierDownload = urlserveur + 'pfnl/file/downloadDoc';

    this.urlGroupUpdater = urlserveur + 'groupe/updater';

    this.urlUpdateStates = urlserveur + 'pfnl/updatestate/activers';
    this.urlUpdateState = urlserveur + 'pfnl/updatestate/activer';

    this.urlFindCompte = urlserveur + 'facture/comptes/list';
    this.urlMoListActivite = urlserveur + 'moplantravail/listActivite';
    this.urlMoListTache = urlserveur + 'moplantravail/listTache';
    this.urlPaInsert = urlserveur + 'moplantravail/insert';
    this.urlMoPlanTravail = urlserveur + 'moplantravail/list';
    this.urlMoPlanTravailAll = urlserveur + 'moplantravail/listAll';
    this.urlMoPlanTravailDelete = urlserveur + 'moplantravail/delete';
    this.urlMoActiviteARDelete = urlserveur + 'moactivitearealiser/delete';
    this.urlListMoActiviteARealiser = urlserveur + 'moactivitearealiser/list';
    this.urlListMoActiviteARealiserAll = urlserveur + 'moactivitearealiser/listAll';
    this.urlListMoARAlla = urlserveur + 'moactivitearealiser/listAlla';
    this.urlListMoObjectif = urlserveur + 'moactivitearealiser/listObjectif';
    this.urlListMoIndicateur = urlserveur + 'moactivitearealiser/listIndicateur';
    this.urlListMoOperationAll = urlserveur + 'mooperation/list';
    this.urlListMoOperationComptes = urlserveur + 'mooperation/listdetails';
    this.urlListMoMemoire = urlserveur + 'mooperation/listMemoire';
    this.urlInsertMoActiviteARealiser = urlserveur + 'moactivitearealiser/insert';
    this.urlInserMoOperation = urlserveur + 'mooperation/insert';
    this.urlPfInsert = urlserveur + 'mopointfocale/insert';
    this.urlListMoPFAll = urlserveur + 'mopointfocale/list';
    this.urlListMoPFByUser = urlserveur + 'mopointfocale/listByUser';
    this.urlListMoPFAllDetail = urlserveur + 'mopointfocale/listdetail';
    this.urlListStructureByPf = urlserveur + 'moplantravail/listStructureByPf';
    this.urlListAgent = urlserveur + 'bulletinpesonnel/list';
    this.urlCompteOperationList = urlserveur + 'mooperation/listCompteOperation';
    this.urlUoInsert = urlserveur + 'mouniteoeuvre/insert';
    this.urlListUo = urlserveur + 'mouniteoeuvre/list';
    this.urlDeleteUo = urlserveur + 'mouniteoeuvre/delete';

    this.urlFichierSaveFile = urlserveur + 'mofiledb/saveFile';
    this.urlFichierList = urlserveur + 'mofiledb/list';
    this.urlFichierListAll = urlserveur + 'mofiledb/listAll';
    this.urlFichierDelete = urlserveur + 'mofiledb/delete';
    this.urlFichierDo = urlserveur + 'mofiledb/download';
    this.urlMoPlanStructure = urlserveur + 'moplantravail/listPl';
    this.urlListActiviteTache = urlserveur + 'moplantravail/listActiviteTache';

  }








  registreEntrantReport(f: FindParam) {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.post<any>(this.urlRegistreEntrantReport, f, httpOptions)
  }

  registreSortantReport(f: FindParam) {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.post<any>(this.urlRegistreSortantReport, f, httpOptions)
  }



  // relanceList() {
  //   return this.http.get<Relance[]>(this.urlRelanceList)
  // }
  // relanceInsert(relance: Relance): Observable<any> {
  //   return this.http.post(this.urlRelanceInsert, relance)
  // }

  // relanceDelete(typeCourrier: string): Observable<any> {
  //   return this.http.delete(this.urlRelanceDelete + typeCourrier)
  // }

  // relanceChangeDuree(relance: Relance): Observable<any> {
  //   return this.http.post(this.urlRelanceChangeDuree, relance)
  // }



  journalListByUser(login: string) {
    return this.http.get<Journal[]>(this.urlJournalListByUser + login)
  }


  journalListByCourrier(courrierID: string) {
    return this.http.get<Journal[]>(this.urlJournalListByCourrier + courrierID)
  }


  userLogin(login: string): Observable<any> {

    return this.http.get(this.urlUserConnexion + login)
    // .pipe(catchError(this.gestionErreur<any>('erreurLogin',[])))

  }

  userLoginByConnected(): Observable<any> {
    return this.http.get(this.urlUserListByConnected)
  }
  userLogout(login: string): Observable<any> {
    return this.http.get(this.urlUserDeconnexion + login);
  }


  userListUpdate(listeUsers: Set<User>): Observable<any> {
    return this.http.put(this.urlUserListUpdate, Array.from(listeUsers));
  }

  userAffecterOrgStruct(user: UserGlobal): Observable<any> {
    return this.http.post(this.urlUserAffecterStructure, user)
  }

  userAffecterPoste(user: UserGlobal): Observable<any> {
    return this.http.post(this.urlUserAffecterPTraitement, user)
  }

  userGlobalUpdateByUserConnected(user: UserGlobal, language: string): Observable<any> {
    return this.http.put(this.urlUserGlobalByUserConnectedUpdate, user);
  }





  //////////////////////////// Messages /////////////////////////////////
  messageList(login: string, type: string): Observable<any> { return this.http.get(this.urlMessageList + login + '/' + type) }

  nbrMessagesNonLu(login: string): Observable<any> { return this.http.get(this.urlNbrMessages + login) }

  messagemarqueLu(messagesID: string[], login: string): Observable<any> { return this.http.post(this.urlMessageMarqueLu + login, messagesID) }

  messageInsert(message: UserMessage): Observable<any> { return this.http.post(this.urlMessageînsert, message) }

  messageUpdate(message: Message): Observable<any> { return this.http.put(this.urlMessageUpdate, message); }

  messageDelete(messageID: string): Observable<any> { return this.http.delete(this.urlMessageDelete + messageID); }







  //////////////////////////// registre /////////////////////////////////
  journalList(language: string, courrierID: string): Observable<any> { return this.http.get(this.urlJournalList + courrierID); }

  courrierSortantList(language: string, userID: string, type: number): Observable<any> { return this.http.get(this.urlCourrierEntrantList + userID + '/' + type); }





  /////////////////////////// SYSTEMES //////////////////////////////////
  systemList(): Observable<any> { return this.http.get(this.urlSystemList) }

  systemListByLogin(login: string): Observable<any> { return this.http.get(this.urlSystemList + login) }

  systemListByHabilitation(): Observable<any> { return this.http.get(this.urlSystemList) }

  systemInsert(systeme: Systeme): Observable<any> { return this.http.post(this.urlSystemInsert, systeme); }

  systemUpdate(systeme: Systeme): Observable<any> { return this.http.put(this.urlSystemUpdate, systeme); }

  systemDelete(systemeID: string): Observable<any> { return this.http.delete(this.urlSystemDelete + systemeID); }



  //////////////////////////// MODULES //////////////////////////////////
  moduleListByLogin(login: any): Observable<any> { return this.http.get(this.urlModulesListByLogin + login); }

  moduleListByHabilitation(login: string, systemeID: string): Observable<any> { return this.http.get(this.urlModulesListByHabilitation + systemeID + '/' + login); }

  moduleInsert(module: Modules): Observable<any> { return this.http.post(this.urlModuleInsert, module); }

  moduleUpdate(module: Modules): Observable<any> { return this.http.put(this.urlModuleUpdate, module); }

  moduleDelete(moduleID: string): Observable<any> { return this.http.delete(this.urlModuleDelete + moduleID); }



  //////////////////////////// GROUPES //////////////////////////////////
  groupeList(f: FindParam): Observable<any> {
    return this.http.post(this.urlGroupList, f);
  }

  groupeInsert(groupe: GroupeGlobal): Observable<any> {
    return this.http.post(this.urlGroupInsert, groupe);
  }

  groupeUpdate(groupe: GroupeGlobal): Observable<any> {
    return this.http.put(this.urlGroupUpdate, groupe)
  }
  groupeUpdater(groupe: Groupe): Observable<any> {
    return this.http.post(this.urlGroupUpdater, groupe);
  }

  groupeAffecterUser(groupe: GroupeGlobal): Observable<any> {
    return this.http.post(this.urlGroupAffecterUser, groupe)
  }

  groupeAffecterRole(groupe: GroupeGlobal): Observable<any> {
    return this.http.post(this.urlGroupAffecterRole, groupe)
  }

  groupeDelete(groupeID: string): Observable<any> {
    return this.http.delete(this.urlGroupDelete + groupeID);
  }



  //////////////////////////// ROLES //////////////////////////////////  
  roleList(): Observable<any> {
    return this.http.get(this.urlRolesList);
  }
  listRoleByModule(moduleID: string): Observable<any> {
    return this.http.get(this.urlRolesListByModule + moduleID);
  }
  roleDelete(roleID: string): Observable<any> {
    return this.http.delete(this.urlRolesDelete + roleID);
  }
  roleListByGroupe(groupeID: string): Observable<any> {
    return this.http.get(this.urlRolesByGroupe + groupeID);
  }
  roleListByUser(userID: string): Observable<any> {
    return this.http.get(this.urlRolesByUser + userID);
  }
  roleListByUserData(f: FindParam): Observable<any> {
    return this.http.post(this.urlRolesByUserData, f);
  }
  roleInsert(role: Role): Observable<any> {
    return this.http.post(this.urlRolesInsert, role);
  }

  roleUpdate(role: Role): Observable<any> {
    return this.http.put(this.urlRolesUpdate, role);
  }



  //////////////// visa ////////////////////

  // createVisa(visa: CourrierVisa): Observable<any> {
  //   return this.http.post(this.urlCourrierVisaCreate, visa);
  // }


  viser(circuit: Circuit, login: string): Observable<any> {
    console.log(this.urlCourrierViserCourierCreate + "/" + login);
    return this.http.post(this.urlCourrierViserCourierCreate + "/" + login, circuit);
  }

  listCourrierParafeur(posteID: string, userID: string): Observable<any> {
    return this.http.get(this.urlCourrierViserListParafeur + "/" + posteID + "/" + userID);
  }

  getCircuitByCourrier(courrierID: string, postetraitementID: string) {
    console.log(courrierID);
    console.log(this.http.get(this.urlCircuitListByPost + "/" + courrierID + "/" + postetraitementID));
    return this.http.get(this.urlCircuitListByPost + "/" + courrierID + "/" + postetraitementID);
  }

  listVisa(courrierID: string): Observable<any> {
    return this.http.get(this.urlCourrierVisaList + "/" + courrierID);
  }


  listAllVisa(): Observable<any> {
    return this.http.get(this.urlCourrierVisaList);
  }





  //////////////////////////// RECHERCHER //////////////////////////////
  /**GET: recherche de courrier par mot clé */
  searchCourrier(term: string): Observable<Courrier[]> {
    if (!term.trim()) {
      // s'il n'y a pas le terme, renvoie un tableau de courrier vide.
      return of([]);
    }
    return this.http.get<Courrier[]>(`${this.urlCourrierFind}/?objet=${term}`).pipe(
      tap(x => x.length ?
        console.log(`found heroes matching "${term}"`) :
        console.log(`no heroes matching "${term}"`)),
      catchError(this.gestionErreur<Courrier[]>('Recherche Courrier', []))
    );
  }
  /**manipulation des erreurs */
  private gestionErreur<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }








  ///////////////////////////////////// structures ///////////////////////////////////////////

  structureList(language: string, organisationID: string): Observable<any> {
    return this.http.get(this.urlStructureList + organisationID);
  }

  structureListCg(language: string, organisationID: string): Observable<any> {
    return this.http.get(this.urlStructureListCg + organisationID);
  }

  structureListCo(language: string, organisationID: string): Observable<any> {
    return this.http.get(this.urlStructureListCo + organisationID);
  }

  structureListPhares(language: string, organisationID: string): Observable<any> {
    return this.http.get(this.urlStructureListPhare + organisationID);
  }

  structureListByIndicateur(object: Structure, language: string): Observable<any> {
    return this.http.post(this.urlStructureListByIndicateur, object);
  }

  structureListByUniteOrg(object: Structure, language: string): Observable<any> {
    return this.http.post(this.urlStructureListByUniteOrg, object);
  }

  structureListByCourrier(courrierID: string): Observable<any> {
    return this.http.get(this.urlStructureListByCourrier + courrierID);
  }
  /** liste structures en fonction de plusieurs organisations */
  structureListByMultiOrganisation(language: string, organisations: Organisation[], login: string): Observable<any> {
    return this.http.post(this.urlStructureListByMultiOrg + login, organisations);
  }

  structureInsert(object: Structure, language: string): Observable<any> {
    return this.http.post(this.urlStructureInsert, object);
  }

  structureUpdate(object: Structure, language: string): Observable<any> {
    return this.http.put(this.urlStructureUpdate, object);
  }

  structureDelete(id: string, language: string): Observable<any> {
    return this.http.delete(this.urlStructureDelete + id);
  }

  ///////////////////////////////////// Organisations ///////////////////////////////////////////

  organisationList(language: string, actif: boolean): Observable<any> {
    return this.http.get(this.urlOrganisationList + actif);
  }
  organisationListByUser(language: string, login: string): Observable<any> {
    return this.http.get(this.urlOrganisationListByUser + login);
  }

  organisationListBySecteur(language: string, secteurID: string): Observable<any> {
    return this.http.get(this.urlOrganisationListBySecteur + secteurID);
  }

  organisationInsert(object: Organisation, language: string): Observable<any> {
    console.log(object);

    return this.http.post(this.urlOrganisationInsert, object);
  }

  organisationUpdate(object: Organisation, language: string): Observable<any> {
    return this.http.put(this.urlOrganisationUpdate, object);
  }

  organisationDelete(id: string, language: string): Observable<any> {
    return this.http.delete(this.urlOrganisationDelete + id);
  }

  posteTraitementList(organisationID: string, structureID: string | null, userID: string): Observable<any> {
    return this.http.post(this.urlPorteTraitementList, { organisationID: organisationID, structureID: structureID, userID: userID });
  }

  /** liste postes traitement  en fonction de plusieurs structures */
  PosteTraitementListByMultiStructure(language: string, structures: Structure[], login: string): Observable<any> {
    return this.http.post(this.urlPosteTraitementListByMultiStructure + login, structures);
  }
  /** liste postes traitement  en fonction de plusieurs organisations */
  PosteTraitementListByMultiOrganisation(organisations: Organisation[], login: string): Observable<any> {
    return this.http.post(this.urlPosteTraitementListByMultiOrganisation + login, organisations);
  }
  crPosteTraitementList(structureID: string, language: string): Observable<any> {
    return this.http.get(this.urlCrPorteTraitementList + structureID);
  }
  crPosteTraitementListByUser(param: FindParam): Observable<any> {
    return this.http.post(this.urlCrPorteTraitementListByUser, param);
  }
  crPosteTraitementInsert(object: Poste, language: string): Observable<any> {
    return this.http.post(this.urlCrPorteTraitementInsert, object);
  }
  crPosteTraitementUpdate(object: Poste, language: string): Observable<any> {
    return this.http.put(this.urlCrPorteTraitementUpdate, object);
  }
  crPosteTraitementDelete(posteTraitementID: string, language: string): Observable<any> {
    return this.http.delete(this.urlCrPorteTraitementDelete + posteTraitementID);
  }
  crPosteTraitementListByOrganisation(organisationID: string, language: string): Observable<any> {
    return this.http.get(this.urlCrPorteTraitementListByOrganisation + organisationID);
  }
  crPosteTraitementListByOrganisationAndUser(organisationID: string, login: string, language: string): Observable<any> {
    return this.http.get(this.urlCrPorteTraitementListByOrganisationAndUser + organisationID + '/' + login);
  }




  crTypeList(language: string): Observable<any> {
    return this.http.get(this.urlCrTypeList);
  }
  crTypeInsert(object: Type, language: string): Observable<any> {
    return this.http.post(this.urlCrTypeInsert, object);
  }

  crTypeUpdate(object: Type, language: string): Observable<any> {
    return this.http.put(this.urlCrTypeUpdate, object);
  }

  crTypeDelete(id: string, language: string): Observable<any> {
    return this.http.delete(this.urlCrTypeDelete + id);
  }


  crPrioriteList(language: string): Observable<any> {
    return this.http.get(this.urlCrPrioriteList);
  }
  crPrioriteInsert(object: Priorite, language: string): Observable<any> {
    return this.http.post(this.urlCrPrioriteInsert, object);
  }

  crPrioriteUpdate(object: Priorite, language: string): Observable<any> {
    return this.http.put(this.urlCrPrioriteUpdate, object);
  }

  crPrioriteDelete(id: string, language: string): Observable<any> {
    return this.http.delete(this.urlCrPrioriteDelete + id);
  }


  crPieceJointeList(language: string): Observable<any> {
    return this.http.get(this.urlCrPieceJointeList);
  }
  crPieceJointeInsert(object: Piecejointe, language: string): Observable<any> {
    return this.http.post(this.urlCrPieceJointeInsert, object);
  }

  crPieceJointeUpdate(object: Piecejointe, language: string): Observable<any> {
    return this.http.put(this.urlCrPieceJointeUpdate, object);
  }

  crPieceJointeDelete(id: string, language: string): Observable<any> {
    return this.http.delete(this.urlCrPieceJointeDelete);
  }


  localisationList(language: string): Observable<any> {
    return this.http.get(this.urlLocalisationList);
  }
  localisationInsert(object: Localisation, language: string): Observable<any> {
    return this.http.post(this.urlLocalisationInsert, object);
  }

  localisationUpdate(object: Localisation, language: string): Observable<any> {
    return this.http.put(this.urlLocalisationUpdate, object);
  }

  localisationDelete(id: string, language: string): Observable<any> {
    return this.http.delete(this.urlLocalisationDelete + id);
  }



  secteurList(language: string): Observable<any> {
    return this.http.get(this.urlSecteurList);
  }
  secteurInsert(object: Secteur, language: string): Observable<any> {
    return this.http.post(this.urlSecteurInsert, object);
  }

  secteurUpdate(object: Secteur, language: string): Observable<any> {
    return this.http.put(this.urlSecteurUpdate, object);
  }

  secteurDelete(id: string, language: string): Observable<any> {
    return this.http.delete(this.urlSecteurDelete + id);
  }



  sousCategorieList(language: string): Observable<any> {
    return this.http.get(this.urlSousCategorieList);
  }
  sousCategorieInsert(object: Souscategorie, language: string): Observable<any> {
    return this.http.post(this.urlSousCategorieInsert, object);
  }

  sousCategorieUpdate(object: Souscategorie, language: string): Observable<any> {
    return this.http.put(this.urlSousCategorieUpdate, object);
  }

  sousCategorieDelete(id: string, language: string): Observable<any> {
    return this.http.delete(this.urlSousCategorieDelete + id);
  }




  dossierListBy(param: FindParam, archive: number): Observable<any> {
    return this.http.post(this.urlDossierList + '/' + archive, param);
  }

  dossierListTree(f: FindParam, archive: number): Observable<any> {
    console.log(this.urlDossierListTree + archive);

    return this.http.post(this.urlDossierListTree + archive, f);
  }

  dossierCourrierList(id: string): Observable<any> {
    console.log(id);

    return this.http.get(this.urlDossierCourrierList + '/' + id);
  }
  dossierInsert(object: Dossier, language: string): Observable<any> {
    return this.http.post(this.urlDossierInsert, object);
  }


  dossierDelete(id: string, language: string): Observable<any> {
    return this.http.delete(this.urlDossierDelete + id);
  }



  // CrClassement
  public listCrClassement(structureID: string): Observable<any> {
    return this.http.get(this.urlDossierList + '/' + structureID);
  }
  public createCrClassement(crClassement: Dossier): Observable<any> {
    return this.http.post(this.urlDossierInsert, crClassement);
  }
  public deleteCrClassement(id: string, user: any): Observable<any> {
    return this.http.delete(this.urlDossierDelete + '/' + id + '/' + user);
  }


  modeBudgetList(language: string): Observable<any> {
    return this.http.get(this.urlModeDeBudgetList);
  }
  modeBudgetInsert(object: Modebudget, language: string): Observable<any> {
    return this.http.post(this.urlModeDeBudgetInsert, object);
  }

  modeBudgetUpdate(object: Modebudget, language: string): Observable<any> {
    return this.http.put(this.urlModeDeBudgetUpdate, object);
  }

  modeBudgetDelete(id: string, language: string): Observable<any> {
    return this.http.delete(this.urlModeDeBudgetDelete + id);
  }


  comptabiliteList(language: string): Observable<any> {
    return this.http.get(this.urlComptabiliteList);
  }
  comptabiliteInsert(object: Comptabilite, language: string): Observable<any> {
    return this.http.post(this.urlComptabiliteInsert, object);
  }

  comptabiliteUpdate(object: Comptabilite, language: string): Observable<any> {
    return this.http.put(this.urlComptabiliteUpdate, object);
  }

  comptabiliteDelete(id: string, language: string): Observable<any> {
    return this.http.delete(this.urlComptabiliteDelete + id);
  }


  postecomptableList(): Observable<any> {
    return this.http.get(this.urlPostecomptableList);
  }
  postecomptableInsert(postecomptable: Postecomptable): Observable<any> {
    return this.http.post(this.urlPostecomptableInsert, postecomptable);
  }
  postecomptableUpdate(postecomptable: Postecomptable): Observable<any> {
    return this.http.put(this.urlPostecomptableUpdate, postecomptable);
  }

  postecomptableDelete(id: string): Observable<any> {
    return this.http.delete(this.urlPostecomptableDelete + id);
  }

  postecomptablenatureList(): Observable<any> {
    return this.http.get(this.urlPostecomptablenatureList);
  }
  postecomptablenatureInsert(postecomptablenature: Postecomptablenature): Observable<any> {
    return this.http.post(this.urlPostecomptablenatureInsert, postecomptablenature);
  }
  postecomptablenatureUpdate(postecomptablenature: Postecomptablenature): Observable<any> {
    return this.http.put(this.urlPostecomptablenatureUpdate, postecomptablenature);
  }

  postecomptablenatureDelete(id: string): Observable<any> {
    return this.http.delete(this.urlPostecomptablenatureDelete + id);
  }

  uniteOrganiqueList(language: string, organisationID: string): Observable<any> {
    return this.http.get(this.urlUniteOrganiqueList + organisationID);
  }

  uniteOrganiqueListByStructure(language: string, organisationID: string): Observable<any> {
    return this.http.get(this.urlUniteOrganiqueListByStr + organisationID);
  }
  uniteOrganiqueInsert(object: Uniteorganique, language: string): Observable<any> {
    return this.http.post(this.urlUniteOrganiqueInsert, object);
  }

  uniteOrganiqueUpdate(object: Uniteorganique, language: string): Observable<any> {
    return this.http.put(this.urlUniteOrganiqueUpdate, object);
  }

  uniteOrganiqueDelete(id: string, language: string): Observable<any> {
    return this.http.delete(this.urlUniteOrganiqueDelete + id);
  }


  sensibiliteListByUser(user: string, language: string): Observable<any> {
    return this.http.get(this.urlSensibiliteList + '/' + user);
  }
  sensibiliteList(language: string): Observable<any> {
    return this.http.get(this.urlSensibiliteList);
  }

  sensibiliteInsert(object: Sensibilite, language: string): Observable<any> {
    return this.http.post(this.urlSensibiliteInsert, object);
  }

  sensibiliteUpdate(object: Sensibilite, language: string): Observable<any> {
    return this.http.put(this.urlSensibiliteUpdate, object);
  }

  sensibiliteDelete(id: string, language: string): Observable<any> {
    console.log(this.urlSensibiliteDelete + id)
    return this.http.delete(this.urlSensibiliteDelete + id);
  }


  localiteList(language: string): Observable<any> {
    return this.http.get(this.urlLocaliteList);
  }
  localiteInsert(object: Localite, language: string): Observable<any> {
    return this.http.post(this.urlLocaliteInsert, object);
  }

  localiteUpdate(object: Localite, language: string): Observable<any> {
    return this.http.put(this.urlLocaliteUpdate, object);
  }

  localiteDelete(id: string, language: string): Observable<any> {
    return this.http.delete(this.urlLocaliteDelete + id);
  }


  fonctionList(language: string): Observable<any> {
    return this.http.get(this.urlFonctionList);
  }
  fonctionInsert(object: Fonction, language: string): Observable<any> {
    return this.http.post(this.urlFonctionInsert, object);
  }

  fonctionUpdate(object: Fonction, language: string): Observable<any> {
    return this.http.put(this.urlFonctionUpdate, object);
  }

  fonctionDelete(id: string, language: string): Observable<any> {
    return this.http.delete(this.urlFonctionDelete + id);
  }


  userList(organisationID: string, language: string): Observable<any> {
    return this.http.get(this.urlUserList + organisationID);
  }


  userListByPoste(posteTraitementID: string): Observable<any> {
    return this.http.get(this.urlUserListByPoste + posteTraitementID);
  }


  userListByMultiPoste(posteTraitementID: string[], login: string): Observable<any> {
    return this.http.post(this.urlUserListByMultiPoste, posteTraitementID);
  }

  /** reseau de l'user connecté */
  userListByLogin(organisationID: string, login: string): Observable<any> {
    return this.http.get(this.urlUserListDescendance + organisationID + '/' + login);
  }

  userGlobalFind(id: string, language: string): Observable<any> {
    return this.http.get(this.urlUserGlobalFind + id);
  }

  userInsert(object: User, language: string): Observable<any> {
    return this.http.post(this.urlUserInsert, object);
  }

  userGlobalInsert(object: UserGlobal, language: string): Observable<any> {
    return this.http.post(this.urlUserGlobalInsert, object);
  }

  userUpdate(object: User, language: string): Observable<any> {
    return this.http.put(this.urlUserUpdate, object);
  }

  userGlobalUpdate(user: UserGlobal, language: string): Observable<any> {
    return this.http.put(this.urlUserGlobalUpdate, user);
  }

  userDelete(id: string, language: string): Observable<any> {
    return this.http.delete(this.urlUserDelete + id);
  }

  userCodifier(loginParent: string, codeUser: string, loginFils: string): Observable<any> {
    return this.http.get(this.urlUserCodifier + loginParent + '/' + codeUser + '/' + loginFils);
  }




  localiteNiveauxList(language: string): Observable<any> {
    return this.http.get(this.urlLocaliteNiveauxList);
  }
  localiteNiveauxInsert(object: Localiteniveaux, language: string): Observable<any> {
    return this.http.post(this.urlLocaliteNiveauxInsert, object);
  }

  localiteNiveauxUpdate(object: Localiteniveaux, language: string): Observable<any> {
    return this.http.put(this.urlLocaliteNiveauxUpdate, object);
  }

  localiteNiveauxDelete(id: number, language: string): Observable<any> {
    return this.http.delete(this.urlLocaliteNiveauxDelete + id);
  }


  courrierList(language: string, postetraitementID: string, login: string, etat: number | null): Observable<any> {
    return this.http.post(this.urlCourrierList, { posteTraitementID: postetraitementID, userID: login, etat: null });
  }


  courrierListByParam(param: FindParam): Observable<any> {
    return this.http.post(this.urlCourrierListByParam, param);
  }


  courrierCopie(param: FindParam): Observable<any> {
    return this.http.post(this.urlCourrierCopie, param);
  }

  courrierCotation(param: FindParam): Observable<any> {
    return this.http.post(this.urlCourrierCotes, param);
  }

  courrierListCree(language: string, postetraitementID: string, login: string): Observable<any> {
    return this.http.get(this.urlCourrierListCree + '/' + postetraitementID + '/' + login + '/' + this.tokenStorageService.getToken(), httpOptions);
  }

  courrierListReception(language: string, postetraitementID: any): Observable<any> {
    return this.http.get(this.urlCourrierListReception + '/' + postetraitementID);
  }

  courrierListRecu(language: string, postetraitementID: any, login: string): Observable<any> {
    return this.http.get(this.urlCourrierListRecu + '/' + postetraitementID + '/' + login);
  }
  courrierListATransmettre(language: string, postetraitementID: string): Observable<any> {
    return this.http.get(this.urlCourrierListATransmettre + postetraitementID);
  }
  courrierListCirculation(language: string, userID: string): Observable<any> {
    return this.http.get(this.urlCourrierListCirculation + '/' + userID);
  }
  courrierListRelance(language: string, userID: string, postetraitementID: any): Observable<any> {
    return this.http.get(this.urlCourrierListRelance + userID + '/' + postetraitementID);
  }
  courrierInsert(object: Courrier, language: string): Observable<any> {
    return this.http.post(this.urlCourrierInsert, object);
  }
  courrierUpdate(object: Courrier, language: string): Observable<any> {
    return this.http.put(this.urlCourrierUpdate, object);
  }
  courrierDelete(id: string, language: string, user: string): Observable<any> {
    return this.http.delete(this.urlCourrierDelete + id + '/' + user);
  }
  getFilesByCourrier(courrierID: string, type: number): Observable<any> {
    return this.http.get(`${this.urlCourrierfinalListFile}` + courrierID + '/' + type);
  }
  courrierBordereau(language: string, bordereau: CourrierTransfert[]) {
    return this.http.post<CourrierTransfert>(this.urlCourrierBordereau, bordereau);
  }
  courrierRecevoir(language: string, courrierIDs: Courrier[], login: string) {
    return this.http.post(this.urlCourrierReception + login, courrierIDs);
  }

  courrierAnnulerValidation(language: string, courriers: Courrier[]): Observable<any> {
    return this.http.post(this.urlCourrierAnnulerValidation, courriers);
  }
  courrierAnnulerTransmission(login: string, courrierIDs: string[]): Observable<any> {
    return this.http.post(this.urlCourrierAnnulerTransmission + login, courrierIDs);
  }
  courrierAnnulerReception(language: string, courrierIDs: string[]): Observable<any> {
    console.log(this.urlCourrierAnnulerReception);
    console.log(courrierIDs);

    return this.http.post(this.urlCourrierAnnulerReception, courrierIDs);
  }
  courrierListTransmis(lang: string, postetraitementID: string, login: string) {
    return this.http.get<Courrier[]>(this.urlCourrierTransmis + login + '/' + postetraitementID);
  }

  courrierValider(lang: string, courrierIDs: string[]): Observable<any> {
    return this.http.post(this.urlCourrierValider, courrierIDs);
  }

  courrierCloturer(login: string, courrier: Courrier[]): Observable<any> {
    return this.http.post(this.urlCourrierCloturer + login, courrier);
  }

  courrierAnnulerCloture(login: string, courrier: Courrier[]): Observable<any> {
    return this.http.post(this.urlCourrierCloturer + login, courrier);
  }

  courrierListClos(p: FindParam): Observable<any> {
    return this.http.post(this.urlCourrierListClos, p);
  }

  courrierArchiver(login: string, courrier: Courrier[], classeurID: string): Observable<any> {
    return this.http.post(this.urlCourrierArchiver + login + '/' + classeurID, courrier);
  }

  courrierAnnulerArchivage(login: string, courrier: Courrier[]): Observable<any> {
    return this.http.post(this.urlCourrierAnnulerArchivage + login, courrier);
  }


  //Exercice
  public listExercice(): Observable<any> {
    return this.http.get<Exercice[]>(this.urlExerciceList);
  }
  public insertExercice(periodesalaire: Exercice): Observable<any> {
    return this.http.post<any>(this.urlExerciceInsert, periodesalaire);
  }
  public updateExercice(periodesalaire: Exercice): Observable<any> {
    return this.http.put<any>(this.urlExerciceUpdate, periodesalaire);
  }
  public deleteExercice(millesime: string): Observable<any> {
    return this.http.delete<any>(this.urlExerciceDelete + millesime);
  }

  public insertCourrierInitiateur(courrierID: string, initiateurs: Initiateur[]): Observable<any> {
    return this.http.post<any>(this.urlCourrierInitiateurInsert + courrierID, initiateurs);
  }
  public insertCourrierPostetraitementInsert(courrierID: string, postetraitements: Poste[]): Observable<any> {
    return this.http.post<any>(this.urlCourrierPostetraitementInsert + courrierID, postetraitements);
  }
  public insertCourrierUserInsert(courrierID: string, users: User[]): Observable<any> {
    return this.http.post<any>(this.urlCourrierUserInsert + courrierID, users);
  }
  public insertCircuitInsert(courrierID: string, structures: Structure[]): Observable<any> {
    return this.http.post<any>(this.urlCircuitInsert + courrierID, structures);
  }


  public circuitUpdate(courrierID: string, circuit: Circuit[]): Observable<any> {
    return this.http.post<any>(this.urlCircuitUpdate + courrierID, circuit);
  }

  public circuitList(courrierID: string): Observable<any> {
    return this.http.get<any>(this.urlCircuitList + courrierID);
  }


  // public insertCourrierfinalInsert(courrierfinal: Courrierfinal): Observable<any> {
  //   return this.http.post<any>(this.urlCourrierfinalInsert, courrierfinal);
  // }
  // public updateCourrierfinal(courrierfinal: Courrierfinal): Observable<any> {
  //   return this.http.put<any>(this.urlCourrierfinalUpdate, courrierfinal);
  // }
  // public listCourrierfinal(courrierID: string) {
  //   return this.http.get<Courrierfinal>(this.urlCourrierfinalList + courrierID);
  // }

  public listBordereau(): Observable<any> {
    return this.http.get(this.urlListBordereau);
  }


  public listBordereauByPoste(posteTraitementID: string): Observable<any> {
    return this.http.get(this.urlListBordereauByPoste + posteTraitementID);
  }
  public printBordereau(bordereauID: string, format: string): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get<any>(this.urlReportBordereau + bordereauID + '/' + format, httpOptions);
  }

  public printCircuit(courrierID: string, format: string): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get<any>(this.urlReportCircuit + courrierID + '/' + format, httpOptions);
  }

  public printCourrierFlux(userID: string, type: string): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get<any>(this.urlReportCourrierFlux + userID + '/' + type, httpOptions);
  }

  public printCourrierRelance(courrierID: string, login: string): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get<any>(this.urlReportCourrierRelance + courrierID + '/' + login, httpOptions);
  }

  public printCourrierInfo(userID: string, courrierID: string, type: string): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get<any>(this.urlReportCourrierInfo + userID + '/' + courrierID + '/' + type, httpOptions);
  }



  public printJournalReport(courrierID: string): any {
    console.log(courrierID)
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get<any>(this.urlJournalReport + courrierID, httpOptions);
  }




  //Initiateur
  public listAllInitiateur(): Observable<any> {
    return this.http.get<Initiateur[]>(this.urlInitiateurListAll);
  }

  public listInitiateur(initiateurID: string): Observable<any> {
    return this.http.get<Initiateur[]>(this.urlInitiateurList + initiateurID);
  }
  public insertInitiateur(initiateur: Initiateur): Observable<any> {
    return this.http.post<any>(this.urlInitiateurInsert, initiateur);
  }
  public updateInitiateur(initiateur: Initiateur): Observable<any> {
    return this.http.put<any>(this.urlInitiateurUpdate, initiateur);
  }
  public deleteInitiateur(initiateurID: string, courrierID: string): Observable<any> {
    return this.http.delete<any>(this.urlInitiateurDelete + initiateurID + '/' + courrierID);
  }



  public insertUserSensibilite(usersens: UserSensibilite): Observable<any> {
    return this.http.post<any>(this.urlusersens, usersens);
  }


  public getBase64(file: Blob): Observable<string> {
    return new Observable<string>(sub => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        sub.next(reader.result?.toString());
        sub.complete();
      };
      reader.onerror = error => {
        sub.error(error);
      }
    })
  }


  arrayToTree(fonction: any, data: any[], tree: TreeNode[]) {
    data.push(fonction)
    var arrayToTree = require('array-to-tree');
    let i = 0
    for (let item of data) {
      let file: TreeNode = {
        key: "",
        data: null,
        label: "",
        expandedIcon: "pi pi-folder-open",
        collapsedIcon: "pi pi-folder",
        parent: undefined
      }
      file.key = item.code
      file.data = item
      file.label = item.libelleFr
      file.expandedIcon = "pi pi-folder-open"
      file.collapsedIcon = "pi pi-folder"
      file.parent = item.parent_code
      tree.splice(i, 1, file)
      i++
    }
    return arrayToTree(tree, {
      parentProperty: 'parent',
      customID: 'key'
    })
  }





  arrayToTreeAfterUpdate(fonction: any, data: any[], tree: TreeNode[], index: number) {
    data.splice(index, 1, fonction)
    var arrayToTree = require('array-to-tree');
    let i = 0
    for (let item of data) {

      let file: TreeNode = {
        key: "",
        data: null,
        label: "",
        expandedIcon: "pi pi-folder-open",
        collapsedIcon: "pi pi-folder",
        parent: undefined
      }
      file.key = item.code
      file.data = item
      file.label = item.libelleFr
      file.expandedIcon = "pi pi-folder-open"
      file.collapsedIcon = "pi pi-folder"
      file.parent = item.parent_code
      tree.splice(i, 1, file)
      i++
    }
    return arrayToTree(tree, {
      parentProperty: 'parent',
      customID: 'key'
    })
  }




  arrayToTreeAfterDelete(data: any[], tree: TreeNode[]) {
    var arrayToTree = require('array-to-tree');
    let i = 0
    for (let item of data) {

      let file: TreeNode = {
        key: "",
        data: null,
        label: "",
        expandedIcon: "pi pi-folder-open",
        collapsedIcon: "pi pi-folder",
        parent: undefined
      }
      file.key = item.code
      file.data = item
      file.label = item.libelleFr
      file.expandedIcon = "pi pi-folder-open"
      file.collapsedIcon = "pi pi-folder"
      file.parent = item.parent_code
      tree.splice(i, 1, file)
      i++
    }
    return arrayToTree(tree, {
      parentProperty: 'parent',
      customID: 'key'
    })
  }


  // public transmettreCourrierfinal(login: string, courrierbordereau: Courrierbordereau) {
  //   return this.http.post<CourrierTransfert>(this.urlCourrierfinalTransmettre + login, courrierbordereau);
  // }

  // courrierDetail(language: string, courrierID: string, login: string) {
  //   return this.http.get<Courrierdetail>(this.urlCourrierDetail + login + '/' + courrierID);
  // }

  // registreEntrantList(f: any) {
  //   return this.http.post<Registre[]>(this.urlRegistreEntrantList, f)
  // }

  // registreSortantList(f: any) {
  //   return this.http.post<Registre[]>(this.urlRegistreSortantList, f)
  // }



  /////////////////////////////////////////////////////// CONTROLE DE GESTION SERVICES /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// CONTROLE DE GESTION SERVICES /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// CONTROLE DE GESTION SERVICES /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// CONTROLE DE GESTION SERVICES /////////////////////////////////////////////////////////////



  cgorganisationList(language: string, actif: boolean): Observable<any> {
    return this.http.get(this.urlOrganisationList + actif);
  }

  organisationList2(language: string, actif: boolean): Observable<any> {
    return this.http.get(this.urlOrganisationList2 + actif);
  }


  sourceFinancementList(login: string): Observable<any> {
    return this.http.get(this.urlSoureFinancementList)
  }

  compteList(organisationID: string, millesime: string, login: string): Observable<any> {
    return this.http.get(this.urlCompteList + organisationID + '/' + millesime)
  }

  compteInsert(organisationID: string, millesime: string, login: string): Observable<any> {
    return this.http.get(this.urlCompteList + organisationID + '/' + millesime)
  }

  compteDelete(organisationID: string, millesime: string, login: string): Observable<any> {
    return this.http.get(this.urlCompteList + organisationID + '/' + millesime)
  }

  //////////// Exercice ////////////

  exerciceList(): Observable<any> {
    return this.http.get<Exercice[]>(this.urlExerciceList);
  }
  exerciceInsert(periodesalaire: Exercice): Observable<any> {
    return this.http.post<any>(this.urlExerciceInsert, periodesalaire);
  }
  exerciceUpdate(periodesalaire: Exercice): Observable<any> {
    return this.http.put<any>(this.urlExerciceUpdate, periodesalaire);
  }
  exerciceDelete(millesime: string): Observable<any> {
    return this.http.delete<any>(this.urlExerciceDelete + millesime);
  }


  ////////// prepaBudget //////////////

  prepaBudgetList(findparam: FindParam, online: boolean): Observable<any> {
    return this.http.post(this.urlPrepaBudgetlist + online, findparam)
  }

  prepaBudgetInsert(budget: PrepaBudget): Observable<any> {
    return this.http.post(this.urlPrepaBudgetInsert, budget)
  }



  ////////// ////////// ACTIVITE //////////// //////////// 

  /** liste des activites/ programmes/ taches / action */
  activiteList(organisationID: string, millesime: string, login: string): Observable<any> {
    return this.http.get(this.urlActiviteList + organisationID + '/' + millesime)
  }

  /** liste des activites/ programmes/ taches / action */
  activiteStrategieList(f: FindParam): Observable<any> { return this.http.post(this.urlActiviteStrategieList, f) }

  activiteByNiveau(organisationID: string, niveau: number, millesime: string): Observable<any> {
    return this.http.get(this.urlActiviteByNiveau + organisationID + '/' + niveau + '/' + millesime)
  }

  activiteChildsList(activiteID: string): Observable<any> { return this.http.get(this.urlActiviteChildsList + activiteID) }

  activiteAllChildsList(activiteID: string): Observable<any> { return this.http.get(this.urlActiviteAllChildsList + activiteID) }

  activiteNiveauAndChilds(fparam: FindParam): Observable<any> { return this.http.post(this.urlActiviteAndChilds, fparam) }

  /**insertion d une activite/ programme/ tache / action */
  activiteInsert(activite: Activite): Observable<any> {
    console.log(activite);
    return this.http.post(this.urlActiviteInsert, activite)
  }

  /**update de l activite*/
  activiteUpdate(activite: Activite): Observable<any> {
    console.log(activite);

    return this.http.put(this.urlActiviteUpdate, activite)
  }

  ////// cgActivite


  ////// cgActivite

  cgactiviteList(fparam: FindParam): Observable<any> {
    return this.http.post(this.urlCgActiviteList, fparam)
  }

  cgactiviteListByNiveau(fparam: FindParam): Observable<any> {
    return this.http.post(this.urlCgActiviteByNiveau, fparam)
  }

  cgactiviteInsert(activite: Activite): Observable<any> {
    return this.http.post(this.urlCgActiviteInsert, activite)
  }

  cgactiviteDelete(activiteID: string): Observable<any> {
    return this.http.delete(this.urlCgActiviteDelete + activiteID)
  }


  dcrList(fparam: FindParam): Observable<any> {
    return this.http.post(this.urlDcrList, fparam)
  }

  /////// PREPA ACTIVITE  ////////

  /** insertion d une prepaActivite */
  prepaActiviteList(fparam: FindParam): Observable<any> {
    return this.http.post(this.urlPrepaActiviteList, fparam)
  }

  /** modification d une prepaActivite*/
  prepaActiviteInsert(activite: ActiviteGlobal, login: string): Observable<any> {
    return this.http.post(this.urlPrepaActiviteInsert, activite)
  }

  /** suppression d une prepaActivite */
  prepaActiviteDelete(activite: Activite, login: string): Observable<any> {
    return this.http.delete(this.urlPrepaActiviteDelete + activite)
  }


  /**delete de l activite*/
  activiteDelete(activiteID: string): Observable<any> {
    return this.http.delete(this.urlActiviteDelete + activiteID)
  }


  //activiteObjectif//

  activiteObjectifList(activiteID: string, type: number): Observable<any> {
    return this.http.get(this.urlActiviteObjectifList + activiteID + '/' + type)
  }

  activiteObjectifInsert(objectif: ActiviteObjectif): Observable<any> {
    return this.http.post(this.urlActiviteObjectifInsert, objectif)
  }

  activiteObjectifUpdate(objectif: ActiviteObjectif, objectifID: string): Observable<any> {
    return this.http.put(this.urlActiviteObjectifUpdate + objectifID, objectif)
  }

  activiteObjectifDelete(objectifID: string): Observable<any> {
    return this.http.delete(this.urlActiviteObjectifDelete + objectifID)
  }

  activiteRapportInsert(item: Activiterapport): Observable<any> {
    return this.http.post(this.urlActiviterapportInsert, item)
  }


  activiteRapportList(organisationID: string, millesime: string, periodeEvaluation: string, onlyRoot: boolean, activiteID: string): Observable<any> {
    return this.http.get(this.urlActiviterapportlistList + organisationID + '/' + millesime + '/' + periodeEvaluation + '/' + onlyRoot + '/' + activiteID)
  }
  activiteExtraire(activiteIDs: string[]): Observable<any> {
    return this.http.post(this.urlActiviteExtraire, activiteIDs)
  }
  public printActiviterapportReport(periodeEvaluation: string, activiteID: string): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get<any>(this.urlReportActiviterapport + periodeEvaluation + '/' + activiteID, httpOptions);
  }


  activiteRapportPeriodeInsert(item: Activiterapportperiode): Observable<any> {
    return this.http.post(this.urlActiviterapportperiodeInsert, item)
  }
  activiteRapportPeriodeList(organisationID: string, millesime: string): Observable<any> {
    return this.http.get(this.urlActiviterapportperiodeList + organisationID + '/' + millesime)
  }


  /** liste des uilisateurs par programmes/ taches / action */
  activiteUserList(activiteID: string, login: string): Observable<any> {
    return this.http.get(this.urlActiviteUserList + activiteID)
  }

  /** insert des uilisateurs par programmes/ taches / action */
  activiteUserInsert(list: User[]): Observable<any> {
    return this.http.post(this.urlActiviteUserInsert, list)
  }

  activiteUserNotif(not: Notificateur): Observable<any> {
    return this.http.post(this.urlActiviteUserNotifier, not)
  }


  /** insertion d une prepaActivite */
  activiteGlobalFind(activiteID: string): Observable<any> {
    return this.http.get(this.urlActiviteGlobalFind + activiteID)
  }

  /** modification d une prepaActivite*/
  activiteGlobalInsert(activite: ActiviteGlobal): Observable<any> {
    return this.http.post(this.urlActiviteGlobalInsert, activite)
  }

  /** modification d une prepaActivite*/
  activiteGlobalUpdate(activite: ActiviteGlobal): Observable<any> {
    return this.http.put(this.urlActiviteGlobalUpdate, activite)
  }


  ////////// operationBudgetaire ////////////

  prepaOperationList(activiteParentID: string, budgetID: string, titre: number): Observable<any> {
    return this.http.get(this.urlOperationsList + activiteParentID + '/' + budgetID + '/' + titre)
  }

  operationList(activiteParentID: string): Observable<any> {
    return this.http.get(this.urlOperationsList + activiteParentID)
  }

  operationInsert(operation: OperationBudgetaire, budgetId: string, budgetExploite: string, titre: number): Observable<any> {
    return this.http.post(this.urlOperationInsert + budgetId + '/' + budgetExploite + '/' + titre, operation)
  }

  operationUpdate(operation: OperationBudgetaire, login: string): Observable<any> {
    return this.http.put(this.urlOperationUpdate, operation)
  }

  operationDelete(operationID: string, login: string): Observable<any> {
    return this.http.delete(this.urlOperationDelete + operationID + '/' + login)
  }



  cgOperationList(activiteParentID: string): Observable<any> {
    return this.http.get(this.urlCgOperationsList + activiteParentID)
  }
  cgoperationInsert(operation: Activite): Observable<any> {
    return this.http.post(this.urlCgOperationInsert, operation)
  }
  /**mis a jour d'une operation
   * @param {Activite} operation operation à modifier
   * @return {any []} liste des taux des acivites parents
   */
  cgoperationUpdate(operation: Activite): Observable<any> {
    return this.http.put(this.urlCgOperationUpdate, operation)
  }

  parentUpdate(childNodeID: string): Observable<any> {
    return this.http.get(this.urlparentUpdate + childNodeID)
  }

  copierPhase(mode: number, activiteCopie: ActiviteCopie): Observable<any> {
    return this.http.post(this.urlCopierPhase + mode, activiteCopie)
  }

  activiteParametre(ap: ActiviteParametre, mode: number): Observable<any> {
    console.log(this.urlActiviteParam + mode, ap);

    return this.http.post(this.urlActiviteParam + mode, ap)
  }

  controlePoids(organisationID: string, millesime: string): Observable<any> {
    return this.http.get(this.urlActiviteControlePoids + organisationID + '/' + millesime)
  }





  /** niveau d execution du PTA
   * @param {string} programmeID id du programme concerné
   * @returns {NiveauExecution} liste des actions et leurs niveaux d'execution
   */
  niveauExecutionPTA(programmeID: string): Observable<any> {
    return this.http.get(this.urlCgNiveauExecutionPTA + programmeID)
  }


  // missionList(organisationID: string ,structureID: string ,activiteID: string , niveau: number): Observable<any> {
  //   console.log((this.urlMissionList + organisationID + '/' + niveau));
  //   return this.http.get(this.urlMissionList + organisationID + '/' +structureID + '/' +activiteID + '/' + niveau)
  // }

  missionList(fparam: FindParam, niveau: number): Observable<any> {
    return this.http.post(this.urlMissionList + niveau, fparam)
  }

  missionObjFacteurList(fparam: FindParam): Observable<any> {
    return this.http.post(this.urlMissionObjFactList, fparam)
  }

  missionInsert(mission: Mission): Observable<any> {
    console.log(mission);
    return this.http.post(this.urlMissionInsert, mission)
  }

  missionUpdate(mission: Mission): Observable<any> {
    return this.http.put(this.urlMissionUpdate, mission)
  }

  missionDelete(missionID: string, login: string): Observable<any> {
    return this.http.delete(this.urlMissionDelete + missionID + '/' + login)
  }



  //***************************************


  missionCopie(missions: Mission[], activiteID: string): Observable<any> {
    return this.http.post(this.urlMissionCopie + '/' + activiteID, missions)
  }

  missionDeplacer(missions: Mission[], activiteID: string): Observable<any> {
    return this.http.post(this.urlMissionDeplacer + '/' + activiteID, missions)
  }

  //***************************************

  kpiInsert(ind: Indicateur): Observable<any> {
    return this.http.post(this.urlKpiInsert, ind)
  }


  kpiList(fparam: any): Observable<any> {
    return this.http.post(this.urlKpiList, fparam)
  }

  kpiListBsc(fparam: any): Observable<any> {
    return this.http.post(this.urlKpiListBsc, fparam)
  }

  kpiDetailList(id: string): Observable<any> {
    return this.http.get(this.urlKpiDetailList + '/' + id)
  }

  kpiDetailInsert(d: IndicateurCle): Observable<any> {
    return this.http.post(this.urlKpiDetailInsert, d)
  }



  ///////////////////////
  indicateurList(tab: any): Observable<any> {
    return this.http.post(this.urlIndicateurList, tab)
  }

  sousIndicateurList(tab: any): Observable<any> {
    return this.http.post(this.urlSousIndicateurList, tab)
  }




  indicateurAnnualList(tab: any): Observable<any> {
    return this.http.post(this.urlIndicateurAnnualList, tab)
  }

  indicateurListValider(tab: any): Observable<any> {
    return this.http.post(this.urlIndicateurListValider, tab)
  }

  indicateurListByBsc(bscID: string, dcrID: number): Observable<any> {
    return this.http.get(this.urlIndicateurListByBsc + '/' + bscID + '/' + dcrID)
  }

  indicateurListByDCR(fparam: FindParam): Observable<any> {
    return this.http.post(this.urlIndicateurListByDCR, fparam)
  }

  indicateurInsert(ind: Indicateur): Observable<any> {
    console.log(ind);
    return this.http.post(this.urlIndicateurInsert, ind)
  }

  indicateurUpdate(ind: Indicateur): Observable<any> {
    return this.http.put(this.urlIndicateurUpdate, ind)
  }

  indicateurValider(ind: Indicateur): Observable<any> {
    return this.http.put(this.urlIndicateurValider, ind)
  }

  indicateurValidationMultiple(liste: Indicateur[]): Observable<any> {
    return this.http.post(this.urlIndicateurValider, liste)
  }

  indicateurTransmission(ind: Indicateur): Observable<any> {
    return this.http.put(this.urlIndicateurTransmission, ind)
  }

  indicateurTransmissionMulti(liste: Indicateur[]): Observable<any> {
    return this.http.post(this.urlIndicateurTransmission, liste)
  }

  indicateurDelete(indicateurID: string, login: string): Observable<any> {
    return this.http.delete(this.urlIndicateurDelete + indicateurID + '/' + login)
  }


  indicateurUpdateValeur(i: Indicateur, millesime: string): Observable<any> {
    return this.http.put(this.urlIndicateurUpdateValeur + millesime, i)
  }

  indicateurUpdateValeurMulti(liste: Indicateur[], mois: number, millesime: string, userID: string): Observable<any> { return this.http.post(this.urlIndicateurUpdateValeurPerMonth + millesime + '/' + mois + '/' + userID, liste) }


  indicateurReaffecterDCR(liste: Indicateur[], dcr: string, userID: string): Observable<any> { return this.http.post(this.urlIndicateurReaffecterDCR + dcr + '/' + userID, liste) }

  indicateurPoids(liste: Indicateur[], userID: string): Observable<any> { return this.http.post(this.urlIndicateurPoids + userID, liste) }

  indicateurJournal(fparam: FindParam): Observable<any> { return this.http.post(this.urlIndicateurJournal, fparam) }

  fichierUpload(fichier: any) {
    const formData = new FormData();
    formData.append('file', fichier, fichier.name);
    return this.http.post(this.urlFichierUpload, formData, { responseType: 'text' })
  }



  //unite de mesure 


  uniteMesureList(): Observable<any> {
    return this.http.get(this.urlUniteMesureList)
  }

  uniteMesureInsert(uMes: UniteMesure): Observable<any> {
    return this.http.post(this.urlUniteMesureInsert, uMes)
  }

  uniteMesureUpdate(uMes: UniteMesure): Observable<any> {
    return this.http.put(this.urlUniteMesureUpdate, uMes)
  }

  uniteMesureDelete(uniteID: string, login: string): Observable<any> {
    return this.http.delete(this.urlUniteMesureDelete + uniteID + '/' + login)
  }



  /// dialogue de gestion
  dialogueGestionList(fparam: FindParam): Observable<any> {
    return this.http.post(this.urlDialogueGestionList, fparam)
  }

  dialogueGestionInsert(item: DialogueGestion): Observable<any> {
    return this.http.post(this.urlDialogueGestionInsert, item)
  }

  dialogueGestionDelete(id: string, login: string): Observable<any> {
    return this.http.delete(this.urlDialogueGestionDelete + id)
  }

  dialogueActionList(fparam: FindParam): Observable<any> {
    return this.http.post(this.urlDialogueActionList, fparam)
  }

  dialogueActionInsert(item: DialogueAction): Observable<any> {
    return this.http.post(this.urlDialogueActionInsert, item)
  }

  dialogueActionDelete(id: string, login: string): Observable<any> {
    return this.http.delete(this.urlDialogueActionDelete + id)
  }

  dialogueSessionList(): Observable<any> {
    return this.http.get(this.urlDialogueSessionList)
  }

  dialogueSessionInsert(item: DialogueSession): Observable<any> {
    return this.http.post(this.urlDialogueSessionInsert, item)
  }

  dialogueSessionDelete(id: string, login: string): Observable<any> {
    return this.http.delete(this.urlDialogueSessionDelete + id)
  }

  dialogueThemeList(): Observable<any> {
    return this.http.get(this.urlDialogueThemeList)
  }

  dialogueThemeInsert(item: DialogueTheme): Observable<any> {
    return this.http.post(this.urlDialogueThemeInsert, item)
  }

  dialogueThemeDelete(id: string, login: string): Observable<any> {
    return this.http.delete(this.urlDialogueThemeDelete + id)
  }



  /// charte de gestion
  charteGestionList(fparam: FindParam): Observable<any> {
    return this.http.post(this.urlCharteGestionList, fparam)
  }

  charteGestionInsert(item: CharteContent[]): Observable<any> {
    return this.http.post(this.urlCharteGestionInsert, item)
  }

  charteGestionDelete(id: string, login: string): Observable<any> {
    return this.http.delete(this.urlCharteGestionDelete + id)
  }



  /// lettre de mission
  lettreMissionList(fparam: FindParam): Observable<any> {
    return this.http.post(this.urlLettreMissionList, fparam)
  }

  lettreMissionInsert(item: CharteContent[]): Observable<any> {
    return this.http.post(this.urlLettreMissionInsert, item)
  }

  lettreMissionDelete(id: string, login: string): Observable<any> {
    return this.http.delete(this.urlLettreMissionDelete + id)
  }






  //Usernotification
  sendMail(login: string): Observable<any> {
    return this.http.get(this.urlSendMail + login);
  }

  //Pivaut

  pivautList(): Observable<any> {
    return this.http.get<Pivaut>(this.urlPivautList);
  }



  //////////// CalendrierBudgetaire ////////////
  calendrierBudgetaireList(secteurID: string): Observable<any> {
    return this.http.get<CalendrierBudgetaire[]>(this.urlCalendrierBudgetaireList + secteurID);
  }

  listOrganisationByPeriodeContextualise(periodeID: string): Observable<any> {
    return this.http.get<CalendrierBudgetaire[]>(this.urllistOrganisationByPeriodeContextualise + periodeID);
  }
  calendrierBudgetaireControle(): Observable<any> {
    return this.http.get<CalendrierBudgetaire[]>(this.urlCalendrierBudgetaireControle);
  }

  calendrierBudgetaireListByOrgAndMillesime(organisationID: string, millesime: string): Observable<any> {
    return this.http.get<CalendrierBudgetaire[]>(this.urlCalendrierBudgetaireListByOrgAndMillesime + organisationID + '/' + millesime);
  }
  calendrierBudgetaireInsert(periode: CalendrierBudgetaire): Observable<any> {
    return this.http.post<any>(this.urlCalendrierBudgetaireInsert, periode);
  }
  calendrierBudgetaireUpdate(periode: CalendrierBudgetaire): Observable<any> {
    return this.http.put<any>(this.urlCalendrierBudgetaireUpdate, periode);
  }
  calendrierBudgetaireDelete(periodeID: string): Observable<any> {
    return this.http.delete<any>(this.urlCalendrierBudgetaireDelete + periodeID);
  }



  //////////// calendrierBudgetaireOrgfindByPeriode////////////

  calendrierBudgetaireOrgfindByPeriode(organisationID: string, millesime: string, periodeID: string): Observable<any> {
    return this.http.get<CalendrierBudgetaire[]>(this.urlcalendrierBudgetaireOrgfindByPeriode + organisationID + '/' + millesime + '/' + periodeID);
  }



  //////////// CalendrierBudgetaireOrg ////////////
  calendrierBudgetaireOrgList(): Observable<any> {
    return this.http.get<CalendrierBudgetaire[]>(this.urlCalendrierBudgetaireOrgList);
  }
  calendrierBudgetaireOrgEmailList(periodeOrgID: string): Observable<any> {
    return this.http.get<CalendrierBudgetaire[]>(this.urlCalendrierBudgetaireOrgEmailList + periodeOrgID);
  }
  calendrierBudgetaireOrgListByOrg(organisationID: string, millesime: string): Observable<any> {
    return this.http.get<CalendrierBudgetaire[]>(this.urllistControleContextualisation + organisationID + '/' + millesime);
  }


  calendrierBudgetaireNotification(login: string): Observable<any> {
    return this.http.get<CalendrierBudgetaire[]>(this.urlCalendrierBudgetaireNotification + login);
  }

  calendrierBudgetaireListOrgByOrgAndMillesime(organisationID: string, millesime: string): Observable<any> {
    return this.http.get<CalendrierBudgetaire[]>(this.urlCalendrierBudgetaireListOrgByOrgAndMillesime + organisationID + '/' + millesime);
  }
  calendrierBudgetaireOrgInsert(periode: CalendrierBudgetaire): Observable<any> {
    return this.http.post<any>(this.urlCalendrierBudgetaireOrgInsert, periode);
  }
  calendrierBudgetaireOrgUpdate(periode: CalendrierBudgetaire): Observable<any> {
    return this.http.put<any>(this.urlCalendrierBudgetaireOrgUpdate, periode);
  }
  calendrierBudgetaireOrgDelete(periodeOrgID: string): Observable<any> {
    return this.http.delete<any>(this.urlCalendrierBudgetaireOrgDelete + periodeOrgID);
  }

  //ParametreOuverture
  parametreOuvertureInsert(param: ParametreOuverture): Observable<any> {
    return this.http.post<any>(this.urlParametreOuvertureInsert, param);
  }
  //ParametreCloture
  calendrierBudgetaireCloture(periodeID: string): Observable<any> {
    return this.http.post<any>(this.urlCalendrierBudgetaireCloture, periodeID);
  }

  //listecgOrganisation
  cgOrganisationList(periodeID: string): Observable<any> {
    return this.http.get<CgOrganisation[]>(this.urlCgOrganisationList + periodeID);
  }



  technicienList(): Observable<any> {
    return this.http.get<any>(this.urlTechnicienList)
  }

  //////////////////////////////////// report ////////////////////////////////////////////////////////


  //CgReport
  public printCgReport(): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get<any>(this.urlCgReport, httpOptions);
  }


  //CgContextualiseReport
  public printCgContextualiseReport(millesime: any, secteurID: any, organisationID: any, type: any): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get<any>(this.urlCgContextualiseReport + millesime + '/' + secteurID + '/' + organisationID + '/' + type, httpOptions);
  }


  //missionReport
  public missionListReport(tab: any, niveau: number): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.post<any>(this.urlMissionListReport + niveau, tab, httpOptions);
  }


  //ptaReport
  public ptaReport(fparam: FindParam): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.post<any>(this.urlPtaReport, fparam, httpOptions);
  }

  //ptaReport
  public budgetByTacheReport(fparam: FindParam): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.post<any>(this.urlBudgetByTacheReport, fparam, httpOptions);
  }

  //ptaReport
  public ptaPerformanceReport(fparam: FindParam): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.post<any>(this.urlPtaPerformanceReport, fparam, httpOptions);
  }


  //missionReport
  public missionReport(fparam: FindParam): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.post<any>(this.urlMissionReport, fparam, httpOptions);
  }


  //missionReport
  public indicateurListReport(tab: any): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.post<any>(this.urlIndicateurReport, tab, httpOptions);
  }

  public indicateurReport(indicateurID: string): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.post<any>(this.urlIndicateursReport, indicateurID, httpOptions);
  }


  indicateurGenerateReport(param: any) {
    const headers = new HttpHeaders().set('Accept', 'application/octet-stream');
    return this.http.post(`${this.urlIndicateurReport}`, param, { headers, responseType: 'blob' })
  }


  public indicateurSuiviReport(fparam: FindParam): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.post<any>(this.urlindicateurSuiviReport, fparam, httpOptions);
  }



  //charteReport
  public charteReport(f: FindParam): any {
    const httpOptions = { responseType: 'arraybuffer' as 'json' };
    return this.http.post<any>(this.urlCgCharteReport, f, httpOptions);
  }



  //cgCharteGlobaleReport
  public cgCharteGlobaleReport(f: FindParam): any {
    const httpOptions = { responseType: 'arraybuffer' as 'json' };
    return this.http.post<any>(this.urlCgCharteGlobaleReport, f, httpOptions);
  }


  //cgDialogueGestionReport
  public cgDialogueGestionReport(f: FindParam): any {
    const httpOptions = { responseType: 'arraybuffer' as 'json' };
    return this.http.post<any>(this.urlCgDialogueGestionReport, f, httpOptions);
  }


  //cgSystemPerfReport
  public cgSystemPerfReport(f: FindParam): any {
    const httpOptions = { responseType: 'arraybuffer' as 'json' };
    return this.http.post<any>(this.urlCgSystemPerfReport, f, httpOptions);
  }


  //cgRegleGestionReport
  public cgRegleGestionReport(f: FindParam): any {
    const httpOptions = { responseType: 'arraybuffer' as 'json' };
    return this.http.post<any>(this.urlCgRegleGestionReport, f, httpOptions);
  }


  //cgRegleGestionReport
  public cgLettreMissionReport(f: FindParam): any {
    const httpOptions = { responseType: 'arraybuffer' as 'json' };
    return this.http.post<any>(this.urlCgLettreMissionReport, f, httpOptions);
  }




  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  cgstatdossier(fparam: FindParam): Observable<any> {
    return this.http.post(this.urlcgstatdossier, fparam)
  }

  cgstatstructure(fparam: FindParam): Observable<any> {
    return this.http.post(this.urlcgstatstructure, fparam)
  }

  cgstatimputation(fparam: FindParam): Observable<any> {
    return this.http.post(this.urlcgstatimputation, fparam)
  }

  cgstatrejet(fparam: FindParam): Observable<any> {
    return this.http.post(this.urlcgstatrejet, fparam)
  }

  userListG(organisationID: string, language: string): Observable<any> {
    return this.http.get(this.urlUserList + organisationID);
  }
  public listUsers(org: string): Observable<any> {
    return this.http.get(this.urlUserListe + '/' + org);
  }
  public listGroupes(org: string): Observable<any> {
    return this.http.get(this.urlGroupeListe + '/' + org);
  }

  public updateState(list: UpdateState[]): Observable<any> {
    return this.http.post(this.urlUpdateState, list);
  }
  public updateStates(list: UpdateState[]): Observable<any> {
    return this.http.post(this.urlUpdateStates, list);
  }

  public findCompte(activiteParentID: string, structureID: string): Observable<any> {
    return this.http.get(this.urlFindCompte + '/' + activiteParentID + '/' + structureID);
  }
  public listMoActivite(f: FindParam): Observable<any> {
    return this.http.post(this.urlMoListActivite, f);
  }
  public listMoTache(organisationID: string, millesime: string, activiteID: string): Observable<any> {
    return this.http.get(this.urlMoListTache + '/' + organisationID + '/' + millesime + '/' + activiteID);
  }
  public listMoActiviteARealiser(f: FindParam): Observable<any> {
    return this.http.post(this.urlListMoActiviteARealiser, f);
  }
  public listMoActiviteARealiserAll(f: FindParam): Observable<any> {
    return this.http.post(this.urlListMoActiviteARealiserAll, f);
  }
  public listMoARAlla(organisationID: string, millesime: string, moPlanTravailID: string): Observable<any> {
    return this.http.get(this.urlListMoARAlla + '/' + organisationID + '/' + millesime + '/' + moPlanTravailID);
  }
  public listPlan(organisationID: string, millesime: string, moPointFocaleID: string, structureID: string): Observable<any> {
    return this.http.get(this.urlMoPlanTravail + '/' + organisationID + '/' + millesime + '/' + moPointFocaleID + '/' + structureID);
  }
  public listPlanAll(organisationID: string, millesime: string, moPointFocaleID: string): Observable<any> {
    return this.http.get(this.urlMoPlanTravailAll + '/' + organisationID + '/' + millesime + '/' + moPointFocaleID);
  }
  public deletePlan(moPlanTravailID: string): Observable<any> {
    return this.http.delete(this.urlMoPlanTravailDelete + '/' + moPlanTravailID);
  }
  public deleteAR(moniActiviteARealiserID: string): Observable<any> {
    return this.http.delete(this.urlMoActiviteARDelete + '/' + moniActiviteARealiserID);
  }
  public savePlan(f: PlanTravail): Observable<any> {
    return this.http.post(this.urlPaInsert, f);
  }
  public listAgent(f: FindParam): Observable<any> {
    return this.http.post(this.urlListAgent, f);
  }
  public saveActivite(f: ActiviteARealiser): Observable<any> {
    return this.http.post(this.urlInsertMoActiviteARealiser, f);
  }
  public saveOperation(f: MoOperation): Observable<any> {
    return this.http.post(this.urlInserMoOperation, f);
  }
  public listMoOperationAll(f: MoOperation): Observable<any> {
    return this.http.post(this.urlListMoOperationAll, f);
  }

  public savePf(f: MoPointFocale): Observable<any> {
    return this.http.post(this.urlPfInsert, f);
  }
  public listMoPFAll(organisationID: string, millesime: string): Observable<any> {
    return this.http.get(this.urlListMoPFAll + "/" + organisationID + "/" + millesime);
  }
  public listMoPFByUser(organisationID: string, millesime: string, userID: string): Observable<any> {
    return this.http.get(this.urlListMoPFByUser + "/" + organisationID + "/" + millesime + "/" + userID);
  }
  public listMoPFDetail(organisationID: string, millesime: string, moPointFocaleID: string): Observable<any> {
    return this.http.get(this.urlListMoPFAllDetail + "/" + organisationID + "/" + millesime + "/" + moPointFocaleID);
  }
  public listSTructureByPf(organisationID: string, moPointFocaleID: string): Observable<any> {
    return this.http.get(this.urlListStructureByPf + "/" + organisationID + "/" + moPointFocaleID);
  }
  public listMoOperationComptes(moOperationID: string): Observable<any> {
    return this.http.get(this.urlListMoOperationComptes + "/" + moOperationID);
  }
  public listMoMemoireDepense(moOperationID: string): Observable<any> {
    return this.http.get(this.urlListMoMemoire + "/" + moOperationID);
  }
  public listCompteOperation(activiteParentID: string, structureID: string): Observable<any> {
    return this.http.get(this.urlCompteOperationList + '/' + activiteParentID + '/' + structureID);
  }
  public saveUo(f: MoUniteOeuvre): Observable<any> {
    return this.http.post(this.urlUoInsert, f);
  }
  public listUo(organisationID: string, millesime: string): Observable<any> {
    return this.http.get(this.urlListUo + "/" + organisationID + "/" + millesime);
  }
  public deleteUo(moUniteOeuvreID: string): Observable<any> {
    return this.http.delete(this.urlDeleteUo + "/" + moUniteOeuvreID);
  }

  saveFile(file: File, login: string, type: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('id', login);
    formData.append('type', type);
    const req = new HttpRequest('POST', `${this.urlFichierSaveFile}`, formData, { reportProgress: true, responseType: 'json', });
    return this.http.request(req);
  }

  fichierDownload(encodedFilename: string) {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get(`${this.urlFichierDo}/${encodedFilename}`, { headers, responseType: 'blob', });
  }

  public listFichier(id: string, type: string): Observable<any> {
    return this.http.get(this.urlFichierList + '/' + id + '/' + type);
  }
  public listAllFichier(id: string): Observable<any> {
    return this.http.get(this.urlFichierListAll + '/' + id);
  }
  public deleteFichier(id: string): Observable<any> {
    return this.http.delete(this.urlFichierDelete + '/' + id);
  }
  public listPl(id: string): Observable<any> {
    return this.http.get(this.urlMoPlanStructure + '/' + id);
  }

  private ip: string | null = null;

  private getLocalIP() {
    const peerConnection = new RTCPeerConnection({ iceServers: [] });

    peerConnection.createDataChannel('');
    peerConnection.createOffer().then(offer => peerConnection.setLocalDescription(offer));

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        const candidate = event.candidate.candidate;
        const match = candidate.match(/([0-9]{1,3}\.){3}[0-9]{1,3}/);
        if (match) {
          this.ip = match[0];
          console.log('Local IP:', this.ip);
        }
      }
    };
  }

  public getIp(): string | null {
    return this.ip;
  }
  /* getIp(): Observable<{ ip: string }> {
    return this.http.get<{ ip: string }>(this.apiUrl);
  } */


  public listObjectif(organisationID: string, millesime: string, moniActiviteARealiserID: string): Observable<any> {
    return this.http.get(this.urlListMoObjectif + "/" + organisationID + "/" + millesime + "/" + moniActiviteARealiserID);
  }
  public listIndicateur(organisationID: string, millesime: string, moObjectifID: string): Observable<any> {
    return this.http.get(this.urlListMoIndicateur + "/" + organisationID + "/" + millesime + "/" + moObjectifID);
  }

  public listActiviteTache(organisationID: string, millesime: string, moPlanTravailID: string): Observable<any> {
    return this.http.get(this.urlListActiviteTache + '/' + organisationID + '/' + millesime + '/' + moPlanTravailID);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




}
