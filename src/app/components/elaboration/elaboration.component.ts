import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TreeNode } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { Structure } from 'src/app/class/class/structure/structure';
import { Activite } from 'src/app/class/classCg/activite/activite';
import { ActiviteParametre } from 'src/app/class/classCg/activiteParametre/activite-parametre';
import { FactAgent } from 'src/app/class/classCg/gestFacture/facture';
import { Exercice } from 'src/app/class/exercice/exercice';
import { FindParam } from 'src/app/class/find-param';
import { ActiviteARealiser, MoActiviteObjectif } from 'src/app/class/monitoringClass/activitearealiser.model';
import { MoIndicateur } from 'src/app/class/monitoringClass/indicateur.model';
import { MoMemoireDepense } from 'src/app/class/monitoringClass/memoire-depense.model';
import { MoOperation, MoOperationCompte } from 'src/app/class/monitoringClass/operation.model';
import { PlanStructure, PlanTravail } from 'src/app/class/monitoringClass/plantravail.model';
import { MoPointFocale } from 'src/app/class/monitoringClass/pointfocale';
import { MoUniteOeuvre } from 'src/app/class/monitoringClass/unite-oeuvre.model';
import { Organisation } from 'src/app/class/organisation/organisation';
import { Action } from 'src/app/enum/action.enum';
import { ModeContractualisation } from 'src/app/enum/mode-contractualisation.enum';
import { ApiService } from 'src/app/services/apiBase.service';
import { formatDate } from '@angular/common';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NumberFormatter } from './number-formatter';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { SuccessDialogComponent } from 'src/app/dialog/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from 'src/app/dialog/error-dialog/error-dialog.component';
import { PrintMode } from 'src/app/enum/print-mode.enum';


@Component({
  selector: 'app-elaboration',
  templateUrl: './elaboration.component.html',
  styleUrls: ['./elaboration.component.scss']
})
export class ElaborationComponent implements OnInit {
  ip = '';
  fparam: any;
  options: any[] = [];
  action = '';
  libelleRec = '';
  organisation: Organisation = new Organisation();
  organisations: Organisation[] = [];
  exercice: Exercice = new Exercice();
  exercices: Exercice[] = [];
  structures: Structure[] = [];
  activitesAll: Activite[] = [];
  activite: Activite = new Activite();
  taches: Activite[] = [];
  param = new ActiviteParametre();
  objectifs: any[] = [];
  displaySpinner = false;
  structure: Structure = new Structure();
  sousprogrammes: Activite[] = [];
  actions: Activite[] = [];
  activites: Activite[] = [];
  planactions: any[] = [];
  selectedPa = new PlanTravail();
  droits: any[] = [];
  username!: string;
  pageByAction = Action.LIST;
  comptes: MoOperationCompte[] = [];
  selectedComptes: MoOperationCompte[] = [];
  selectedActivites: any[] = [];
  pf: MoPointFocale = new MoPointFocale();
  agents: FactAgent[] = [];
  arbre: TreeNode[] = [];
  selectedNodes: TreeNode[] = [];
  arbre2: TreeNode[] = [];
  arbre3: TreeNode[] = [];
  currentIndex = 1;
  currentIndexInd = 1;
  defaultText: string = "Drop documents to upload";
  dropText: string = "Drop documents to upload";
  fileTypeError: boolean = false;
  pdfUrl: SafeResourceUrl | null = null;
  fileUploaded: boolean = false;
  uploadProgress: number = 0;
  uploadedFile: File | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef;
  stplan: PlanStructure = new PlanStructure();
  structureplans: string[] = [];
  activiteARDialog = false;
  paDialog = false;
  pa: PlanTravail = new PlanTravail();
  activiteAR: ActiviteARealiser = new ActiviteARealiser();
  activiteManip: ActiviteARealiser = new ActiviteARealiser();
  operation: MoOperation = new MoOperation();
  opcompte: MoOperationCompte = new MoOperationCompte();
  actionPA = 'newPA';
  actionAR = 'newAR';
  actionOP = 'newOP';
  acte = 1;
  listActivs: Activite[] = [];
  activitesAR: ActiviteARealiser[] = [];
  operations: MoOperation[] = [];
  depenses: MoMemoireDepense[] = [];
  selectedOperations: MoOperation[] = [];
  operationsAR: MoOperation[] = [];
  operationAR: MoOperation = new MoOperation();
  deleteDialog = false;
  libelleSpinner = 'operationEnCOurs';
  selectedElement!: any;
  select = false;
  files: any[] = [];
  mode = PrintMode.planaction;
  modeA: PrintMode = PrintMode.activite;
  detailActivitePage = true;
  objectifPage = false;
  operationPage = false;
  objectifDialog = false;
  indicateurDialog = false;
  objectif = new MoActiviteObjectif();
  indicateur = new MoIndicateur();
  actionOb = '';
  actionInd = '';
  uoDialog = false;
  modesUo = [{ id: 1, label: 'MATIÈRE' }, { id: 2, label: 'MAIN D\'OEUVRE' },];
  activeIndex = 0;
  activeIndexOp = 0;
  periodesType: any[] = [{ id: 1, libelle: "JOURS" }, { id: 2, libelle: "SEMAINES" }, { id: 3, libelle: "MOIS" }]
  selectID !: string;
  selectedNode1!: TreeNode;
  printDialog = false;
  pdfData: SafeResourceUrl | null = null;
  optionsShow: any[] = [{ id: 1, icon: 'fas fa-copy', label: "En PTA" }, { id: 2, icon: 'fas fa-file', label: "Par activités" },]
  show = 1;
  wit = false;
  ref!: DynamicDialogRef;
  node: any;

  pfs: MoPointFocale[] = [];

  types: any[] = [{ id: 1, label: 'AGENT' }, { id: 2, label: 'STRUCTURE' },]
  col = [
    { field: '', header: 'N°' },
    { field: 'code', header: 'Code' },
    { field: 'libelleFr', header: 'Designation' },
    { field: 'objectif', header: 'Objectif' },
    { field: 'indicateur', header: 'Indicateurs' },
    { field: 'dateDebut', header: 'Debut' },
    { field: 'dateFin', header: 'Fin' },
    { field: 'montant', header: 'Montant' },
    { field: '', header: 'Actions' },
  ];
  montantMax = 0;

  modes = [
    { id: 1, label: 'BON DE COMMANDE', value: ModeContractualisation.BCA },
    { id: 2, label: 'MARCHÉ', value: ModeContractualisation.MARCHE },
    { id: 3, label: 'ORDRE DE MISSION', value: ModeContractualisation.MISSION },
  ];

  uo: MoUniteOeuvre = new MoUniteOeuvre();
  uos: MoUniteOeuvre[] = [];

  depense: MoMemoireDepense = new MoMemoireDepense();

  operationDialog = false;

  selectedStrR: string[] = [];
  selectedStrA: string[] = [];
  selectedStrC: string[] = [];
  selectedStrI: string[] = [];
  selectedAR: string[] = [];
  selectedAA: string[] = [];
  selectedAC: string[] = [];
  selectedAI: string[] = [];

  comptebudgetaire: any[] = [];
  indicateurs: MoIndicateur[] = [];

  constructor(
    private api: ApiService,
    private ts: TokenStorageService,
    public translate: TranslateService,
    private sanitizer: DomSanitizer,
    public dialogService: DialogService) {
    this.getOrganisation();
    this.fparam = new FindParam(this.ts.getOrganisation(), this.ts.getUser().username);
    this.droits = this.ts.getRoles();
    this.username = this.ts.getUser().username;
  }

  ngOnInit() { const ipValue = this.api.getIp(); if (ipValue) { this.ip = ipValue; } this.listOrganisation(); this.listExercice(); }

  getOrg(organisationID: string) { for (const ele of this.organisations) { if (ele.organisationID == organisationID) { this.organisation = ele; } } }

  listActivite(organisationID: string, millesime: string) { this.activitesAll = []; this.api.activiteList(organisationID, millesime, this.ts.getUser().username).subscribe((res) => { console.log(res); this.activitesAll = res; }); }

  listMoARAlla(moPlanTravailID: string) { this.displaySpinner = true; this.activitesAR = []; this.api.listMoARAlla(this.organisation.organisationID, this.exercice.millesime, moPlanTravailID).subscribe((res) => { console.log(res); this.activitesAR = res; console.log(this.activitesAR); this.displaySpinner = false; }, error => { this.displaySpinner = false; }); }

  getActiviteByID(activiteID: string, tab: Activite[]) { let act = new Activite(); for (const ele of tab) { if (ele.activiteID === activiteID) { act = ele; } } console.log(act); return act; }

  getActiviteARByID(activiteID: string, tab: ActiviteARealiser[]) { let act = new ActiviteARealiser(); for (const ele of tab) { if (ele.moniActiviteARealiserID === activiteID) { act = ele; } } console.log(act); return act; }

  getPageByAction(action: Action) { this.pageByAction = action; }

  getList() { this.getPageByAction(Action.LIST); }

  getOrganisation() { this.organisation.organisationID = this.ts.getOrganisation(); }

  listOrganisation() { this.api.organisationList('', true).subscribe((data) => { console.log(data); this.organisations = data; if (data.length == 1) { this.organisation = data[0]; } }); }

  listExercice() { this.displaySpinner = true; this.api.listExercice().subscribe((data) => { console.log(data); this.exercices = data; this.displaySpinner = false; this.exercice = data[data.length - 1]; }, error => { this.displaySpinner = false; }); }

  listMoPFAll(organisationID: string) { this.getOrg(organisationID); this.displaySpinner = true; this.api.listMoPFByUser(organisationID, this.exercice.millesime, this.ts.getUser().username).subscribe((data) => { this.listActivite(organisationID, this.exercice.millesime); this.pfs = data; console.log(data); this.displaySpinner = false; }, error => { this.displaySpinner = false; }); }

  load() { this.listPlan(); }

  convertAR(tache: Activite) {
    console.log(tache);
    this.wit = false;
    this.activiteAR = new ActiviteARealiser();
    this.activiteAR.tacheID = tache.activiteID;
    this.activiteAR.activiteID = tache.activiteParentID;
    this.activiteAR.libelleFr = tache.libelleFr;
    this.activiteAR.libelleUs = tache.libelleUs;
    this.activiteAR.reference = tache.reference;
    this.activiteAR.cible = tache.cible;
    this.activiteAR.poids = tache.poids;
    this.activiteAR.cout = tache.cout;
    this.listCompteBudget(tache.activiteID, tache.structureID);
    this.actionPA = 'editPA';
    this.activiteAR.moPlanTravailID = this.pa.moPlanTravailID;
    this.activiteAR.moniActiviteARealiserID = `MOAC${new Date().toISOString().replace(/[-:]/g, '').replace('T', '').replace(/\..*$/, '')}.${Math.floor(Math.random() * 1000)}.${Math.floor(Math.random() * 1000)}`;
    this.getPageByAction(Action.CREATEAR);
  }

  create() {
    this.removeFile();
    this.acte = 1;
    this.action = 'new';
    this.actionPA = 'newPA';
    this.pa = new PlanTravail();
    this.pa.ip_update = this.ip;
    this.init();
    this.pa.mode = 2;
    this.pa.planstructures = [];
    this.pa.moPointFocaleID = this.pf.moPointFocaleID;
    this.pa.moPlanTravailID = `MOPA${new Date().toISOString().replace(/[-:]/g, '').replace('T', '').replace(/\..*$/, '')}.${Math.floor(Math.random() * 1000)}.${Math.floor(Math.random() * 1000)}`;
    this.listPl(this.pa.moPlanTravailID);
    this.getPageByAction(Action.CREATEPA);
  }
  uploadPA() {
    this.removeFile();
    this.acte = 1;
    this.action = 'new';
    this.actionPA = 'newPA';
    this.pa = new PlanTravail();
    this.pa.ip_update = this.ip;
    this.init();
    this.pa.mode = 1;
    this.pa.moPlanTravailID = `MOPA${new Date().toISOString().replace(/[-:]/g, '').replace('T', '').replace(/\..*$/, '')}.${Math.floor(Math.random() * 1000)}.${Math.floor(Math.random() * 1000)}`;
    this.getPageByAction(Action.UPLOADPA);
  }

  async listL1() {
    this.fparam.organisationID = this.organisation.organisationID;
    this.fparam.millesime = this.exercice.millesime;
    this.fparam.moPlanTravailID = this.pa.moPointFocaleID;
    this.fparam.niveau = 1;
    this.fparam.activiteID = "1";
    this.sousprogrammes = await this.api.listMoActivite(this.fparam).toPromise();
  }
  createAR(tache?: Activite) {
    this.operations = [];
    this.selectedAR = [];
    this.selectedAA = [];
    this.selectedAC = [];
    this.selectedAI = [];
    this.listL1();
    if (tache) {
      console.log(tache);
      this.wit = false;
      this.activite = tache;
      this.activiteAR.tacheID = tache.activiteID;
      this.listCompteBudget(tache.activiteID, tache.structureID);
      this.activiteAR.activiteID = tache.activiteParentID;
    } else { this.wit = true; }
    this.acte = 2;
    this.activiteAR = new ActiviteARealiser();
    this.actionPA = 'editPA';
    this.activiteAR.moPlanTravailID = this.pa.moPlanTravailID;
    this.activiteAR.moniActiviteARealiserID = `MOAC${new Date().toISOString().replace(/[-:]/g, '').replace('T', '').replace(/\..*$/, '')}.${Math.floor(Math.random() * 1000)}.${Math.floor(Math.random() * 1000)}`;
    this.getPageByAction(Action.CREATEAR);
  }

  createOP() {
    this.actionOP = 'newOP'; this.action = 'new'; this.acte = 3; this.operation = new MoOperation(); this.comptes = []; this.depenses = []; this.operation.moniActiviteARealiserID = this.activiteAR.moniActiviteARealiserID; this.operationPage = true; this.objectifPage = false; this.detailActivitePage = false;
  }
  createObjectif() {
    this.actionOb = 'new'; this.objectif = new MoActiviteObjectif();
    this.objectif.ip_update = this.ip;
    this.objectif.code = this.generateObjectiveCode();
    this.indicateurs = [];
    this.objectifPage = true;
    this.operationPage = false; this.detailActivitePage = false;
  }

  createIndicateur() { this.actionInd = 'new'; this.indicateur = new MoIndicateur(); this.indicateur.ip_update = this.ip; this.indicateur.code = this.generateIndCode(this.objectif.code); this.indicateurDialog = true; }

  getPA(pa: PlanTravail, action: string) {
    this.listUo();
    this.action = action;
    this.pa = { ...pa };
    this.acte = 1;
    this.actionPA = action + 'PA';
    this.init();
    this.listPiece(pa.moPlanTravailID);
    this.listPl(pa.moPlanTravailID);
    this.listMoARAlla(pa.moPlanTravailID);
    this.getPageByAction(Action.CREATEPA);
    this.listAgent();
  }
  getAR(activiteAR: ActiviteARealiser, action: string) {
    console.log(activiteAR);
    this.wit = false;
    this.activiteAR = { ...activiteAR };
    this.acte = 2;
    this.actionAR = action + 'AR';
    this.opcompte = new MoOperationCompte();
    this.listOperation(activiteAR);
    this.listObjectif(activiteAR.moniActiviteARealiserID);
    this.onSelectTache(activiteAR.tacheID);
    this.listMoMemoireDepense(activiteAR);
    this.objectifPage = false;
    this.operationPage = false;
    this.detailActivitePage = true;
    this.getPageByAction(Action.CREATEAR);
    if (activiteAR.typer == 1 && activiteAR.r) { this.selectedAR = JSON.parse(activiteAR.r); } else { this.selectedStrR = JSON.parse(activiteAR.r); }
    if (activiteAR.typea == 1 && activiteAR.a) { this.selectedAA = JSON.parse(activiteAR.a); } else { this.selectedStrA = JSON.parse(activiteAR.a); }
    if (activiteAR.typec == 1 && activiteAR.c) { this.selectedAC = JSON.parse(activiteAR.c); } else { this.selectedStrC = JSON.parse(activiteAR.c); }
    if (activiteAR.typei == 1 && activiteAR.i) { this.selectedAI = JSON.parse(activiteAR.i); } else { this.selectedStrI = JSON.parse(activiteAR.i); }
  }
  getOP(operation: MoOperation, action: string) {
    this.operation = { ...operation };
    this.acte = 3;
    this.actionOP = action + 'OP';
    this.listMoOperationComptes(operation);
    this.operationPage = true;
    this.objectifPage = false;
    this.detailActivitePage = false;
  }
  structureList(organisationID: string) { this.displaySpinner = true; this.structures = []; this.api.structureList('fr', organisationID).subscribe((data) => { this.structures = data; console.log(data); this.displaySpinner = false; }, error => { this.displaySpinner = false; }); }
  back(niveau: number) { this.acte = niveau; switch (niveau) { case 1: this.getPageByAction(Action.CREATEPA); break; case 2: this.getPageByAction(Action.CREATEAR); break; case 3: this.getPageByAction(Action.CREATEOP); break; case 4: this.objectifPage = false; this.operationPage = false; this.detailActivitePage = true; break; default: break; } }
  getOC(opcompte: MoOperationCompte) { this.opcompte = { ...opcompte }; }
  getMemoire(momemoire: MoMemoireDepense) { this.depense = { ...momemoire }; }

  deleteOp(operation: MoOperation) { this.operation = { ...operation }; this.deletePlan('deleteOp', 2, 'red'); }


  deletePlan(message: string, nature: number, color: string) {
    this.ref = this.dialogService.open(DeleteDialogComponent, {
      header: 'Attention !',
      width: '400px',
      contentStyle: { height: 'auto', overflow: 'auto' },
      closable: false,
      data: { msg: this.translate.instant(message), nature: nature, color: color, },
    });
    this.ref.onClose.subscribe((data) => { if (data) { this.delete(); } });
  }
  deleteAR(message: string, nature: number, color: string) {
    this.ref = this.dialogService.open(DeleteDialogComponent, {
      header: 'Attention !',
      width: '400px',
      contentStyle: { height: 'auto', overflow: 'auto' },
      closable: false,
      data: { msg: this.translate.instant(message), nature: nature, color: color, },
    });
    this.ref.onClose.subscribe((data) => { if (data) { this.deleteAr(); } });
  }

  deleteAr() {
    this.displaySpinner = true;
    this.api.deleteAR(this.activiteAR.moniActiviteARealiserID).subscribe(res => { this.displaySpinner = false; this.showSuccesDialog('successDeleteAR'); },
      error => { console.log(error.error); this.showErrorDialog('errorDeleteAR'); this.displaySpinner = false; });
    this.ref.onClose.subscribe((data) => {
      this.load();
    });
  }
  delete() {
    this.displaySpinner = true;
    this.api.deleteAR(this.pa.moPlanTravailID).subscribe(res => { this.displaySpinner = false; this.showSuccesDialog('successDeletePlan'); },
      error => { console.log(error.error); this.showErrorDialog('errorDeletePlan'); this.displaySpinner = false; });
    this.ref.onClose.subscribe((data) => {
      this.load();
    });
  }

  showSuccesDialog(message: string) { this.ref = this.dialogService.open(SuccessDialogComponent, { header: this.translate.instant('succes !'), width: '300px', contentStyle: { "height": "auto", "overflow": "auto" }, closable: false, data: { msg: this.translate.instant(message) } }); this.ref.onClose.subscribe((data) => { this.load() }); }

  showErrorDialog(operation: string) { this.ref = this.dialogService.open(ErrorDialogComponent, { header: this.translate.instant('Erreur !'), width: '300px', contentStyle: { "height": "auto", "overflow": "auto" }, closable: true, data: { msg: this.translate.instant(operation) } }); }


  async onSelectActivite(activiteID: string, tab: any[]) {
    console.log(this.getActiviteByID(activiteID, tab));
    this.fparam.organisationID = this.organisation.organisationID;
    this.fparam.millesime = this.exercice.millesime;
    this.fparam.moPlanTravailID = this.pa.moPointFocaleID;
    this.fparam.niveau = this.getActiviteByID(activiteID, tab).niveauActiviteID + 1;
    this.fparam.activiteID = this.getActiviteByID(activiteID, tab).activiteID;
    this.fparam.structureID = this.getActiviteByID(activiteID, tab).structureID;
    if (this.getActiviteByID(activiteID, tab).niveauActiviteID != 4) {
      switch (this.getActiviteByID(activiteID, tab).niveauActiviteID) {
        case 1: this.actions = []; this.activites = []; this.taches = []; break;
        case 2: this.activites = []; this.taches = []; break;
        case 3: this.taches = []; this.comptebudgetaire = []; break;
        case 3: this.taches = []; break;
        default:
          break;
      }
      this.api.listMoActivite(this.fparam).subscribe((data) => {
        console.log(data);
        this.activitesAll = data;
        for (const ele of data) {
          switch (ele.niveauActiviteID) {
            case 2: this.actions.push(Object.assign({}, ele)); break;
            case 3: this.activites.push(Object.assign({}, ele)); break;
            case 4: this.taches.push(Object.assign({}, ele)); break;
            default:
              break;
          }
        }
      })
    }
  }




  addOperationComp() {
    if (!this.opcompte.moOperationCompteID) {
      this.opcompte.moOperationCompteID = `MOOPC${new Date().toISOString().replace(/[-:]/g, '').replace('T', '').replace(/\..*$/, '')}.${Math.floor(Math.random() * 1000)}.${Math.floor(Math.random() * 1000)}`;
      this.comptes.push(this.opcompte);
    } else {
      for (const ele of this.comptes) {
        if (ele.moOperationCompteID == this.opcompte.moOperationCompteID) {
          ele.moOperationID = this.opcompte.moOperationID;
          ele.operationBudgetaireID = this.opcompte.operationBudgetaireID;
          ele.libelleFr = this.opcompte.libelleFr;
          ele.libelleUs = this.opcompte.libelleUs;
          ele.montant = this.opcompte.montant;
          ele.quantite = this.opcompte.quantite;
        }
      }
      this.comptes = [...this.comptes];
    }
    this.opcompte = new MoOperationCompte();
  }
  addDepense() {
    if (!this.depense.moMemoireDepenseID) {
      for (const ele of this.uos) {
        if (ele.moUniteOeuvreID == this.depense.moUniteOeuvreID && this.depense.quantite) {
          this.depense.montant = ele.prixunitaire * this.depense.quantite;
          this.depense.prixunitaire = ele.prixunitaire;
          this.depense.designation = ele.designation;
          this.depense.conditionnement = ele.conditionnement;
        }
      }
      this.depense.moniActiviteARealiserID = this.activiteAR.moniActiviteARealiserID;
      this.depense.moMemoireDepenseID = `MOMED${new Date().toISOString().replace(/[-:]/g, '').replace('T', '').replace(/\..*$/, '')}.${Math.floor(Math.random() * 1000)}.${Math.floor(Math.random() * 1000)}`;
      this.depenses.push(this.depense);
    } else {
      for (const ele of this.depenses) {
        if (ele.moUniteOeuvreID == this.depense.moUniteOeuvreID) {
          for (const ele of this.uos) {
            if (ele.moUniteOeuvreID == this.depense.moUniteOeuvreID && this.depense.quantite) {
              this.depense.montant = ele.prixunitaire * this.depense.quantite;
              this.depense.prixunitaire = ele.prixunitaire;
              this.depense.designation = ele.designation;
              this.depense.conditionnement = ele.conditionnement;
            }
          }
          ele.moUniteOeuvreID = this.depense.moUniteOeuvreID;
          ele.moniActiviteARealiserID = this.activiteAR.moniActiviteARealiserID;
          ele.quantite = this.depense.quantite;
          ele.montant = this.depense.montant;
          ele.prixunitaire = this.depense.prixunitaire;
          ele.designation = this.depense.designation;
          ele.conditionnement = this.depense.conditionnement;
        }
      }
      this.depenses = [...this.depenses];
    }
    this.depense = new MoMemoireDepense();
  }

  onSelectTache(tacheID: string) {
    this.displaySpinner = true;
    this.comptebudgetaire = [];
    this.api.listCompteOperation(tacheID, this.activiteAR.structureID).subscribe((res) => {
      this.comptebudgetaire = res;
      console.log(res);
      this.displaySpinner = false;
    }, error => {
      this.displaySpinner = false;
    });
  }

  listCompteBudget(tacheID: string, structureID: string) {
    this.displaySpinner = true;
    this.comptebudgetaire = [];
    this.api.listCompteOperation(tacheID, structureID).subscribe((res) => {
      this.comptebudgetaire = res;
      console.log(res);
      this.displaySpinner = false;
    }, error => {
      this.displaySpinner = false;
    });
  }


  setShower(option: any) { this.show = option; console.log(this.show); }


  onDropdown1(pa: PlanTravail) {
    this.pa = pa;
    this.options = [
      { label: "Consulter", icon: 'fas fa-eye', color: 'rgb(23, 74, 125)', command: () => { this.getPA(pa, 'view') } },
      { label: 'Modifier', icon: 'fas fa-edit', color: 'rgb(23, 74, 125)', command: () => { this.getPA(pa, 'edit') } },
      { label: "Transmettre pour validation", icon: 'fas fa-share', color: 'rgb(23, 74, 125)', command: () => { } },
      { label: "Valider le plan d'action", icon: 'fas fa-check-square', color: 'rgb(23, 74, 125)', command: () => { } },
      { label: "Exporter le plan d'action", icon: 'fas fa-print', color: 'rgb(23, 74, 125)', command: () => { this.exporterPA() } },
      { separator: true },
      { label: "Supprimer", icon: 'fas fa-trash', pTooltip: "Actions groupés", color: '#ce2727', command: () => { this.deletePlan('deletePlan', 2, 'red') } },
    ];
  }
  onDropdown(activite: ActiviteARealiser) {
    if (activite.moniActiviteARealiserID) {
      this.activiteAR = activite;
      this.options = [
        { label: "Consulter", icon: 'fas fa-eye', color: 'rgb(23, 74, 125)', command: () => { this.getAR(activite, 'view') } },
        { label: 'Modifier', icon: 'fas fa-edit', color: 'rgb(23, 74, 125)', command: () => { this.getAR(activite, 'edit') } },
        { label: "Tirer la fiche", icon: 'fas fa-print', color: 'rgb(23, 74, 125)', command: () => { this.printFiche(PrintMode.activite) } },
        { label: "Envoyer au RACI concerné", icon: 'fas fa-share', color: 'rgb(23, 74, 125)', command: () => { } },
        { label: "Valider le l'activité", icon: 'fas fa-check-square', color: 'rgb(23, 74, 125)', command: () => { } },
        { separator: true },
        { label: "Supprimer", icon: 'fas fa-trash', pTooltip: "Actions groupés", color: '#ce2727', command: () => { this.deletePlan('deleteAR', 2, 'red') } },
      ];
    }
  }
  onDropdownOP(element: MoOperation) {
    this.operationAR = element;
    this.options = [
      { label: "Consulter", icon: 'fas fa-eye', color: 'rgb(23, 74, 125)', command: () => { this.getOP(element, 'view') } },
      { label: 'Modifier', icon: 'fas fa-edit', color: 'rgb(23, 74, 125)', command: () => { this.getOP(element, 'edit') } },
      { label: "Nouvel indicateur", icon: 'fas fa-folder-plus', color: 'rgb(23, 74, 125)', command: () => { } },
      { label: "Envoyer au RACI concerné", icon: 'fas fa-share', color: 'rgb(23, 74, 125)', command: () => { } },
      { label: "Valider le l'activité", icon: 'fas fa-check-square', color: 'rgb(23, 74, 125)', command: () => { } },
      { separator: true },
      { label: "Supprimer", icon: 'fas fa-trash', pTooltip: "Actions groupés", color: '#ce2727', command: () => { } },
    ];
  }

  onDropdownARList() {
    this.options = [
      { label: "Envoyer au RACI concerné", icon: 'fas fa-share', color: 'rgb(23, 74, 125)', command: () => { } },
      { label: "Valider les activités", icon: 'fas fa-check-square', color: 'rgb(23, 74, 125)', command: () => { } },
      { separator: true },
      { label: "Supprimer", icon: 'fas fa-trash', pTooltip: "Actions groupés", color: '#ce2727', command: () => { } },
    ];
  }
  onDropdownOPList() {
    this.options = [
      { label: "Envoyer au RACI concerné", icon: 'fas fa-share', color: 'rgb(23, 74, 125)', command: () => { } },
      { label: "Valider les opérations", icon: 'fas fa-check-square', color: 'rgb(23, 74, 125)', command: () => { } },
      { separator: true },
      { label: "Supprimer", icon: 'fas fa-trash', pTooltip: "Actions groupés", color: '#ce2727', command: () => { } },
    ];
  }

  onCheckboxChange(id: string, isChecked: boolean) {
    if (isChecked) { this.selectedActivites.push(id); } else {
      const index = this.selectedActivites.indexOf(id);
      if (index !== -1) { this.selectedActivites.splice(index, 1); }
    }
  }


  convertCompteToOp(activite: ActiviteARealiser) {
    this.displaySpinner = true;
    this.libelleSpinner = 'convertionEnCOurs';
    this.api.findCompte(activite.tacheID, activite.structureID).subscribe((res) => {
      this.comptebudgetaire = res;
      console.log(res);
      const saveOperationsPromises = res.map((ele: any) => {
        let operation = new MoOperation();
        operation.montant = ele.cp;
        operation.libelleFr = ele.libelleFr;
        operation.libelleUs = ele.libelleUs;
        operation.indicateur = "Pas d'indicateurs";
        operation.objectif = "Pas d'indicateurs";
        operation.organisationID = this.organisation.organisationID;
        operation.structureID = activite.structureID;
        operation.millesime = this.exercice.millesime;
        operation.user_update = this.ts.getUser().username;
        operation.moniActiviteARealiserID = activite.moniActiviteARealiserID;
        operation.ip_update = this.ip;
        operation.moOperationID = `MOOP${new Date().toISOString().replace(/[-:]/g, '').replace('T', '').replace(/\..*$/, '')}.${Math.floor(Math.random() * 1000)}.${Math.floor(Math.random() * 1000)}`;
        const opeOmpte = new MoOperationCompte();
        opeOmpte.montant = ele.cp;
        opeOmpte.operationBudgetaireID = ele.tacheID;
        opeOmpte.libelleFr = ele.compteCode + ' - ' + ele.libelleFr;
        opeOmpte.libelleUs = ele.compteCode + ' - ' + ele.libelleUs;
        opeOmpte.moOperationCompteID = `MOOPC${new Date().toISOString().replace(/[-:]/g, '').replace('T', '').replace(/\..*$/, '')}.${Math.floor(Math.random() * 1000)}.${Math.floor(Math.random() * 1000)}`;
        console.log(opeOmpte);
        operation.operationComptes.push(Object.assign({}, opeOmpte));
        console.log(operation);
        return this.api.saveOperation(operation).toPromise();
      });

      Promise.all(saveOperationsPromises)
        .then(() => {
          this.showSuccesDialog("successSaveOperations");
          this.listOperation(activite);
        })
        .catch(error => {
          this.showErrorDialog("errorSaveOperations");
          console.error(error);
        })
        .finally(() => {
          this.displaySpinner = false;
          this.libelleSpinner = 'Chargement';
        });

      console.log(res);
    }, error => {
      this.displaySpinner = false;
    });
  }


  listCompte(organisationID: string, millesime: string) {
    this.api.compteList(organisationID, millesime, this.ts.getUser().username).subscribe((data) => {
      this.comptes = data; console.log(data);
    })
  }
  listStructureByPf(moPointFocaleID: string) {
    this.displaySpinner = true;
    this.api.listPlanAll(this.organisation.organisationID, this.exercice.millesime, moPointFocaleID).subscribe((data) => {
      this.planactions = data; console.log(data);
      this.displaySpinner = false;
    }, error => {
      this.displaySpinner = false;
    })
    this.api.listSTructureByPf(this.organisation.organisationID, moPointFocaleID).subscribe((data) => {
      this.structures = data;
      console.log(data);
      this.displaySpinner = false;
    }, error => {
      this.displaySpinner = false;
    });
  }
  listPlan() {
    this.api.listPlanAll(this.organisation.organisationID, this.exercice.millesime, this.pf.moPointFocaleID).subscribe((data) => {
      this.planactions = data; console.log(data);
      this.displaySpinner = false;
    }, error => {
      this.displaySpinner = false;
    })
  }

  getStr(structureID: string) {
    let structure: Structure = new Structure();
    for (const ele of this.structures) {
      if (ele.structureID === structureID) {
        structure = ele;
      }
    }
    return structure;
  }

  close() {
    this.getPageByAction(Action.LIST);
  }

  init() {
    this.arbre = [];
    this.arbre2 = [];
    this.arbre3 = [];
    this.structureplans = [];
    this.actions = [];
    this.activites = [];
    this.taches = [];
    this.activitesAR = [];
    this.operations = [];
  }

  listOperation(element: ActiviteARealiser) {
    this.operations = [];
    this.fparam.activiteID = element.moniActiviteARealiserID; this.displaySpinner = true; this.operations = []; this.api.listMoOperationAll(this.fparam).subscribe((res) => { console.log(res); this.operations = res; console.log(this.operations); this.displaySpinner = false; }, error => { this.displaySpinner = false; });
  }

  listObjectif(moniActiviteARealiserID: string) {
    this.displaySpinner = true;
    this.api.listObjectif(this.organisation.organisationID, this.exercice.millesime, moniActiviteARealiserID).subscribe((res) => {
      console.log(res);
      this.objectifs = res;
      console.log(this.objectifs);
      this.displaySpinner = false;
    }, error => { this.displaySpinner = false; });
  }

  listIndicateur(moObjectifID: string) {
    this.displaySpinner = true;
    this.indicateurs = [];
    this.api.listIndicateur(this.organisation.organisationID, this.exercice.millesime, moObjectifID).subscribe((res) => {
      console.log(res);
      this.indicateurs = res;
      console.log(this.indicateurs);
      this.displaySpinner = false;
    }, error => { this.displaySpinner = false; });
  }

  listMoOperationComptes(element: MoOperation) { this.displaySpinner = true; this.comptes = []; this.api.listMoOperationComptes(element.moOperationID).subscribe((res) => { console.log(res); this.comptes = res; console.log(this.comptes); this.displaySpinner = false; }, error => { this.displaySpinner = false; }); }

  listMoMemoireDepense(element: ActiviteARealiser) { this.depenses = []; this.api.listMoMemoireDepense(element.moniActiviteARealiserID).subscribe((res) => { console.log(res); this.depenses = res; console.log(this.depenses); }, error => { this.displaySpinner = false; }); }

  listAgent() { this.fparam.millesime = this.exercice.millesime; this.agents = []; this.api.listAgent(this.fparam).subscribe((res) => { console.log(res); this.agents = res; }); }

  getLibelleCompte(operationBudgetaireID: string) { for (const ele of this.comptebudgetaire) { if (ele.tacheID == operationBudgetaireID) { this.opcompte.libelleFr = ele.compteCode + ' - ' + ele.libelleFr; this.montantMax = ele.cp; } } }


  async onNodeExpand(event: any) { const node = event.node; this.node = node; console.log(node.data); if (node.data.niveauActiviteID != 4) { node.children = await this.getChild(node.data); } else { node.children = await this.getARList(node.data); } this.arbre = [...this.arbre]; }

  async getARList(tache: Activite) {
    this.activite = tache;
    this.fparam.organisationID = this.organisation.organisationID;
    this.fparam.millesime = this.exercice.millesime;
    this.fparam.activiteID = tache.activiteParentID;
    this.fparam.tacheID = tache.activiteID;
    this.fparam.structureID = this.pa.structureID;
    this.fparam.moPlanTravailID = this.pa.moPlanTravailID;
    if (this.fparam.organisationID && this.fparam.millesime && this.fparam.activiteID && this.fparam.tacheID && this.fparam.moPlanTravailID) {
      this.displaySpinner = true;
      this.arbre3 = [];
      try {
        let rs = await this.api.listMoActiviteARealiser(this.fparam).toPromise();
        console.log(rs);
        for await (const item2 of rs) {
          let op: TreeNode = { key: '', data: null, type: '', parent: undefined };
          op.key = item2.moniActiviteARealiserID;
          op.data = item2;
          op.parent = item2.activiteID;
          op.type = 'activiteAR';
          this.arbre3.push(op);
        }
      } catch (error) {
        this.displaySpinner = false;
        console.error('Erreur lors de la récupération des activités à réaliser:', error);
      } finally {
        this.displaySpinner = false;
      }
    }
    return this.arbre3;
  }

  async getChild(a: Activite) {
    this.fparam.organisationID = this.organisation.organisationID;
    this.fparam.millesime = this.exercice.millesime;
    this.fparam.moPlanTravailID = this.pa.moPointFocaleID;
    this.fparam.niveau = a.niveauActiviteID + 1;
    this.fparam.activiteID = a.activiteID;
    this.fparam.structureID = a.structureID;
    this.arbre2 = [];
    this.displaySpinner = true;
    let rs = await this.api.listMoActivite(this.fparam).toPromise();
    console.log(rs);
    for await (const item2 of rs) {
      let op: TreeNode = { key: '', data: null, type: '', parent: undefined, children: [{ data: {} }], };
      op.key = item2.activiteID;
      op.data = item2;
      op.parent = item2.activiteParentID;
      op.type = 'activite';
      this.arbre2.push(op);
    }
    this.displaySpinner = false;
    return this.arbre2;
  }


  verifyLength(valeur: any) { let val = '' + valeur; if (val.toString().length >= 35) { return true; } return false; }
  defineDescription(libelle: any): string { return libelle.slice(0, 34); }

  verifyLengthOP(valeur: any) { let val = '' + valeur; if (val.toString().length >= 95) { return true; } return false; }
  defineDescriptionOP(libelle: any): string { return libelle.slice(0, 94); }

  verifyLengthSteep(valeur: any) { let val = '' + valeur; if (val.toString().length >= 25) { return true; } return false; }
  defineDescriptionSteep(libelle: any): string { return libelle.slice(0, 24); }


  verifyLengthRec(valeur: any) { let val = '' + valeur; if (val.toString().length >= 110) { return true; } return false; }
  defineDescriptionRec(libelle: any): string { return libelle.slice(0, 109); }


  savePlan() {
    this.pa.activiteARealisers = this.activitesAR;
    this.pa.planstructures = [];
    for (const ele of this.structureplans) {
      let ps = new PlanStructure()
      ps.moPlanStructureID = `MOPST${new Date().toISOString().replace(/[-:]/g, '').replace('T', '').replace(/\..*$/, '')}.${Math.floor(Math.random() * 1000)}.${Math.floor(Math.random() * 1000)}`;
      ps.structureID = ele;
      ps.moPlanTravailID = this.pa.moPlanTravailID;
      ps.organisationID = this.organisation.organisationID;
      ps.millesime = this.exercice.millesime;
      ps.user_update = this.ts.getUser().username;
      this.pa.planstructures.push(Object.assign({}, ps));
    }
    this.pa.organisationID = this.organisation.organisationID;
    this.pa.millesime = this.exercice.millesime;
    this.pa.user_update = this.ts.getUser().username;

    this.pa.ip_update = this.ip;
    this.displaySpinner = true;
    console.log(this.pa);
    this.api.savePlan(this.pa).subscribe(data => {
      if (this.uploadedFile) { this.api.saveFile(this.uploadedFile, this.pa.moPlanTravailID, 'plantravail').subscribe(data => { }); }
      this.displaySpinner = false;
      this.load();
      this.close();
      this.showSuccesDialog("successSavePlan");
    }, error => {
      this.displaySpinner = false;
      this.showErrorDialog("errorSavePlan");
    })
  }

  savePlanc() {
    this.pa.activiteARealisers = this.activitesAR;
    for (const ele of this.structureplans) {
      let ps = new PlanStructure()
      ps.moPlanStructureID = `MOPST${new Date().toISOString().replace(/[-:]/g, '').replace('T', '').replace(/\..*$/, '')}.${Math.floor(Math.random() * 1000)}.${Math.floor(Math.random() * 1000)}`;
      ps.structureID = ele;
      ps.moPlanTravailID = this.pa.moPlanTravailID;
      ps.organisationID = this.organisation.organisationID;
      ps.millesime = this.exercice.millesime;
      ps.user_update = this.ts.getUser().username;
      this.pa.planstructures.push(Object.assign({}, ps));
    }
    this.pa.organisationID = this.organisation.organisationID;
    this.pa.millesime = this.exercice.millesime;
    this.pa.user_update = this.ts.getUser().username;
    this.pa.moPointFocaleID = this.pf.moPointFocaleID;
    this.pa.ip_update = this.ip;
    this.displaySpinner = true;
    console.log(this.pa);
    this.api.savePlan(this.pa).subscribe(data => {
      this.displaySpinner = false;
      this.load();
      this.close();
      this.showSuccesDialog("successImportPlan");
    }, error => {
      this.displaySpinner = false;
      this.showErrorDialog("errorImportPlan");
    })
  }


  getPF(pfID: string) { let pf: MoPointFocale = new MoPointFocale(); for (const ele of this.pfs) { if (ele.moPointFocaleID == pfID) { pf = ele; } } return pf; }


  saveActivite() {
    this.activiteAR.operations = this.operations;
    this.activiteAR.objectifs = this.objectifs;
    this.activiteAR.memoiredepenses = this.depenses;
    this.activiteAR.organisationID = this.organisation.organisationID;
    this.activiteAR.millesime = this.exercice.millesime;
    this.activiteAR.user_update = this.ts.getUser().username;
    this.activiteAR.ip_update = this.ip;
    if (this.activiteAR.typer == 1) { this.activiteAR.r = JSON.stringify(this.selectedAR); } else { this.activiteAR.r = JSON.stringify(this.selectedStrR); }
    if (this.activiteAR.typea == 1) { this.activiteAR.a = JSON.stringify(this.selectedAA); } else { this.activiteAR.a = JSON.stringify(this.selectedStrA); }
    if (this.activiteAR.typec == 1) { this.activiteAR.c = JSON.stringify(this.selectedAC); } else { this.activiteAR.c = JSON.stringify(this.selectedStrC); }
    if (this.activiteAR.typei == 1) { this.activiteAR.i = JSON.stringify(this.selectedAI); } else { this.activiteAR.i = JSON.stringify(this.selectedStrI); }
    this.displaySpinner = true;
    console.log(this.activiteAR);
    this.api.saveActivite(this.activiteAR).subscribe(data => {
      this.displaySpinner = false;
      this.getPA(this.pa, this.actionPA);
      this.showSuccesDialog("successSaveActivite");
    }, error => {
      this.displaySpinner = false;
      this.showErrorDialog("errorSaveActivite");
    })
  }

  saveOperation(operation: MoOperation) {
    operation.operationComptes = this.comptes;
    operation.organisationID = this.organisation.organisationID;
    operation.millesime = this.exercice.millesime;
    operation.user_update = this.ts.getUser().username;
    operation.ip_update = this.ip;
    this.displaySpinner = true;
    console.log(operation);
    if (!operation.moOperationID) {
      operation.moOperationID = `MOOP${new Date().toISOString().replace(/[-:]/g, '').replace('T', '').replace(/\..*$/, '')}.${Math.floor(Math.random() * 1000)}.${Math.floor(Math.random() * 1000)}`;
      this.api.saveOperation(operation).subscribe(data => {
        this.displaySpinner = false;
        this.operationDialog = false;
        this.listOperation(this.activiteAR);
        this.listMoARAlla(this.pa.moPlanTravailID);
        this.listMoOperationComptes(operation);
        this.operationPage = false;
        this.detailActivitePage = true;
        this.showSuccesDialog("successSaveOperation");
      }, error => { this.displaySpinner = false; this.showErrorDialog("errorSaveOperation"); })
    } else {
      this.api.saveOperation(this.operation).subscribe(data => {
        this.displaySpinner = false;
        this.operationDialog = false;
        this.listOperation(this.activiteAR);
        this.listMoARAlla(this.pa.moPlanTravailID);
        this.listMoOperationComptes(operation);
        this.operationPage = false;
        this.detailActivitePage = true;
        this.showSuccesDialog("successUpdateOperation");
      }, error => { this.displaySpinner = false; this.showErrorDialog("errorUpdateOperation"); })
    }

  }





  /* *************************************************************************************************** Main d'oeuvre *************************************************************************************************** */

  listUo() {
    this.displaySpinner = true;
    this.uos = [];
    this.api.listUo(this.organisation.organisationID, this.exercice.millesime).subscribe((data) => {
      this.uos = data;
      console.log(data);
      this.displaySpinner = false;
    }, error => {
      this.displaySpinner = false;
    });
  }

  getMontantUnite(moUniteOeuvreID: string) { this.depense.moUniteOeuvreID = moUniteOeuvreID; }

  getUOeuvre(moUniteOeuvreID: string) { let uo = new MoUniteOeuvre(); for (const ele of this.uos) { if (ele.moUniteOeuvreID == moUniteOeuvreID) { uo = ele; } } return uo; }


  nodeSelect(event: any) {
    if (event.node.data.niveauActiviteID) { this.activite = event.node.data; } else { this.activiteAR = event.node.data; }
    this.select = true;
    this.selectedElement = event.node.data;
    console.log(this.selectedElement);
    console.log(this.selectedNodes);
  }

  onRowDoubleClick(rowData: any): void { console.log('Double clic sur la ligne:', rowData); }

  nodeUnselect(event: any) { }

  getIndicateur(indicateur: MoIndicateur, action: string) { this.actionInd = action; this.indicateur = { ...indicateur }; this.indicateurDialog = true; }
  getObjectif(objectif: MoActiviteObjectif, action: string) {
    this.actionOb = action; this.objectif = { ...objectif };
    this.listIndicateur(objectif.moObjectifID);
    this.objectifPage = true; this.detailActivitePage = false;
  }

  defineType(niveau: number): string { switch (niveau) { case 1: return 'SP'; case 2: return 'AC'; case 3: return 'AT'; case 4: return 'T'; default: return '' } }

  async exporterPA(): Promise<void> {
    const doc = new jsPDF('landscape');
    const imgWidth = 25;
    const imgHeight = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const imgX = (pageWidth - imgWidth) / 2;
    const txtPlan = this.pa.libelleFr;
    const txtExercice = this.exercice.libelleFr;
    const txtPf = this.getPF(this.pa.moPointFocaleID).designationFr;
    const leftText1 = 'REPUBLIQUE DU CAMEROUN';
    const leftTextPlan = 'PLAN D\'ACTION';
    const leftText2 = 'PAIX - TRAVAIL - PATRIE';
    const leftText3 = this.organisation.libelleFr;
    const rightText1 = 'REPUBLIC OF CAMEROON';
    const rightText2 = 'PEACE - WORK - FATHERLAND';
    const rightText3 = this.organisation.libelleUs;
    const rightX = pageWidth - 20;
    const textWidth1 = doc.getStringUnitWidth(rightText1) * 10 / doc.internal.scaleFactor;
    const textWidth2 = doc.getStringUnitWidth(rightText2) * 10 / doc.internal.scaleFactor;
    const textWidth3 = doc.getStringUnitWidth(rightText3) * 10 / doc.internal.scaleFactor;
    doc.addImage('assets/apme.png', 'PNG', imgX, 10, imgWidth, imgHeight);
    doc.setFontSize(10);
    doc.text(rightText1, rightX - textWidth1, 20);
    doc.text(leftText1, 15, 20);
    doc.setFontSize(9);
    doc.text(leftText2, 20, 25);
    doc.text(rightText2, rightX - (textWidth2 + 5), 25);
    doc.text(rightText3, rightX - textWidth3, 30);
    doc.text(leftText3, 15, 30);

    doc.setFontSize(12);
    doc.setFont('Helvetica', 'bold');
    doc.text(leftTextPlan, pageWidth / 2, 37, { align: 'center' });
    doc.setFontSize(11);
    doc.setFont('Helvetica', 'normal');
    doc.text(txtPlan, pageWidth / 2, 42, { align: 'center' });
    doc.setFontSize(9);
    doc.setTextColor(128, 128, 128);
    doc.text("Budget : " + txtExercice, 15, 43);
    doc.text("Point Focal : " + txtPf, 15, 48);

    if (this.show == 1) {
      const allChildren = await this.getActivitiesFromAllLevel();
      const data = [];

      for (const item of allChildren) {
        data.push({
          niveauActiviteID: item.data.niveauActiviteID ? item.data.niveauActiviteID : '',
          code: item.data.code,
          abbreviationFr: item.data.abbreviationFr ? item.data.abbreviationFr : '',
          libelleFr: item.data.libelleFr ? item.data.libelleFr : '',
          objectif: item.data.objectif ? item.data.objectif : '',
          indicateur: item.data.indicateur ? item.data.indicateur : '',
          dateDebut: item.data.dateDebut ? formatDate(new Date(item.data.dateDebut), 'dd/MM/yyyy', 'fr') : '',
          dateFin: item.data.dateFin ? formatDate(new Date(item.data.dateFin), 'dd/MM/yyyy', 'fr') : '',
          montant: item.data.montant ? NumberFormatter.formatWithThousandSeparator(item.data.montant) : 0
        });
      }
      const pageSize = doc.internal.pageSize;
      const pageHeight = pageSize.height;

      const totalWidth = doc.internal.pageSize.getWidth();
      let pageCount = 0;
      autoTable(doc, {
        head: [['CODE', 'STRUCTURE', 'DÉSIGNATION', 'OBJECTIFS', 'INDICATEURS', 'DEBUT', 'FIN', 'COÛTS']],
        body: data.map(item => {
          if ([4].includes(item.niveauActiviteID)) {
            return [
              { content: item.code + " - " + item.abbreviationFr + " - " + item.libelleFr, colSpan: 7, styles: { fillColor: '#d8d8d8', fontStyle: 'bold' } },
              { content: item.montant, styles: { fillColor: '#d8d8d8', fontStyle: 'bold' } },
            ];
          } else if ([1, 2, 3].includes(item.niveauActiviteID)) {
            return [
              { content: item.code, styles: { valign: 'middle', halign: 'left', fontStyle: 'bold' } },
              item.abbreviationFr,
              { content: item.libelleFr, colSpan: 6, styles: { fillColor: '#eaeaea', fontStyle: 'normal' } },
              '', '', '', '', ''
            ];
          }
          return [
            { content: item.code, styles: { valign: 'middle', halign: 'left', fontStyle: 'bold', textColor: '#007ad9' } },
            item.abbreviationFr, item.libelleFr, item.objectif, item.indicateur, item.dateDebut, item.dateFin, item.montant
          ];
        }),
        startY: 53,
        theme: 'grid',
        headStyles: { fillColor: [23, 74, 125], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7, valign: 'middle', },
        columnStyles: {
          0: { valign: 'middle', halign: 'left', fontSize: 9, fontStyle: 'bold', cellWidth: (totalWidth * 0.05) },
          1: { valign: 'middle', halign: 'left', fontSize: 9, fontStyle: 'bold', cellWidth: (totalWidth * 0.05) },
          2: { valign: 'middle', halign: 'left', fontSize: 8, fontStyle: 'normal', cellWidth: (totalWidth * 0.25) },
          3: { valign: 'middle', halign: 'left', fontSize: 9, fontStyle: 'normal' },
          4: { valign: 'middle', halign: 'left', fontSize: 9, fontStyle: 'normal' },
          5: { valign: 'middle', halign: 'left', fontSize: 9, fontStyle: 'normal' },
          6: { valign: 'middle', halign: 'left', fontSize: 9, fontStyle: 'normal' },
          7: { valign: 'middle', halign: 'right', fontSize: 7.1, fontStyle: 'bold', cellWidth: (totalWidth * 0.08) },
        },
        didDrawPage: (data) => {
          pageCount++;
          doc.setFontSize(10);
          const repetitiveText = "----- PLAN D'ACTION -----";
          doc.setFontSize(10);
          doc.text(repetitiveText, pageWidth / 2, pageHeight - 10, { align: 'center' });
        }
      });
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.text(`Page ${i} / ${totalPages}`, pageWidth - 30, pageHeight - 10);
      }
    } else {
      const allChildren = await this.listActiviteTache();
      console.log(allChildren);
      const data = [];

      for (const item of allChildren) {
        data.push({
          niveauActiviteID: item.data.niveauActiviteID ? item.data.niveauActiviteID : '',
          code: item.data.code,
          abbreviationFr: item.data.abbreviationFr ? item.data.abbreviationFr : '',
          libelleFr: item.data.libelleFr ? item.data.libelleFr : '',
          objectif: item.data.objectif ? item.data.objectif : '',
          indicateur: item.data.indicateur ? item.data.indicateur : '',
          responsables: item.data.responsables ? item.data.responsables : '',
          statut: item.data.statut ? item.data.statut : '',
          montant: item.data.montant ? NumberFormatter.formatWithThousandSeparator(item.data.montant) : 0
        });
      }
      const pageSize = doc.internal.pageSize;
      const pageHeight = pageSize.height;
      const totalWidth = doc.internal.pageSize.getWidth();
      let pageCount = 0;
      autoTable(doc, {
        head: [['CODE', 'DÉSIGNATION', 'OBJECTIFS', 'INDICATEURS', 'RESPONSABLES', 'STATUTS', 'COÛTS']],
        body: data.map(item => {
          if ([4].includes(item.niveauActiviteID)) {
            return [{ content: item.code + " - " + item.libelleFr, colSpan: 6, styles: { fillColor: '#d8d8d8', fontStyle: 'bold' } },
            { content: item.montant, styles: { fillColor: '#d8d8d8', fontStyle: 'bold' } },];
          }
          return [
            { content: item.code, styles: { valign: 'middle', halign: 'left', fontStyle: 'bold', textColor: '#007ad9' } },
            item.libelleFr,
            item.objectif,
            item.indicateur,
            item.responsables,
            item.statut,
            item.montant
          ];
        }),
        startY: 53,
        theme: 'grid',
        headStyles: { fillColor: [23, 74, 125], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7, valign: 'middle', },
        columnStyles: {
          0: { valign: 'middle', halign: 'left', fontSize: 9, fontStyle: 'bold', cellWidth: (totalWidth * 0.05) },
          1: { valign: 'middle', halign: 'left', fontSize: 9, fontStyle: 'bold', cellWidth: (totalWidth * 0.25) },
          2: { valign: 'middle', halign: 'left', fontSize: 8, fontStyle: 'normal', cellWidth: (totalWidth * 0.25) },
          3: { valign: 'middle', halign: 'left', fontSize: 9, fontStyle: 'normal' },
          4: { valign: 'middle', halign: 'left', fontSize: 9, fontStyle: 'normal' },
          5: { valign: 'middle', halign: 'left', fontSize: 9, fontStyle: 'normal' },
          6: { valign: 'middle', halign: 'left', fontSize: 9, fontStyle: 'normal' },
          7: { valign: 'middle', halign: 'right', fontSize: 7.1, fontStyle: 'bold', cellWidth: (totalWidth * 0.08) },
        },
        didDrawPage: (data) => {
          pageCount++;
          doc.setFontSize(10);
          const repetitiveText = "----- PLAN D'ACTION -----";
          doc.setFontSize(10);
          doc.text(repetitiveText, pageWidth / 2, pageHeight - 10, { align: 'center' });
        }
      });
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.text(`Page ${i} / ${totalPages}`, pageWidth - 30, pageHeight - 10);
      }
    }
    const pdfData = doc.output('datauristring');
    this.pdfData = this.sanitizer.bypassSecurityTrustResourceUrl(pdfData);
    this.printDialog = true;
  }


  async printFiche(mode: PrintMode): Promise<void> {
    this.mode = mode;
    const doc = new jsPDF();
    const imgWidth = 25;
    const imgHeight = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const imgX = (pageWidth - imgWidth) / 2;
    const txtPlan = this.pa.libelleFr;
    const txtExercice = this.exercice.libelleFr;
    const txtPf = this.getPF(this.pa.moPointFocaleID).designationFr;
    const libelleFrAR = this.activiteAR.libelleFr;
    const leftText1 = 'REPUBLIQUE DU CAMEROUN';
    const leftTextPlan = 'FICHE D\'ACTIVITÉ';
    const leftText2 = 'PAIX - TRAVAIL - PATRIE';
    const leftText3 = this.organisation.libelleFr;
    const rightText1 = 'REPUBLIC OF CAMEROON';
    const rightText2 = 'PEACE - WORK - FATHERLAND';
    const dateDebut = formatDate(new Date(this.activiteAR.dateDebut), 'dd/MM/yyyy', 'fr');
    const dateFin = formatDate(new Date(this.activiteAR.dateFin), 'dd/MM/yyyy', 'fr');
    const modeA = this.activiteAR.modeContractualisation;

    const rightText3 = this.organisation.libelleUs;
    const rightX = pageWidth - 20;
    const textWidth1 = doc.getStringUnitWidth(rightText1) * 10 / doc.internal.scaleFactor;
    const textWidth2 = doc.getStringUnitWidth(rightText2) * 10 / doc.internal.scaleFactor;
    const textWidth3 = doc.getStringUnitWidth(rightText3) * 10 / doc.internal.scaleFactor;

    const textWidth = doc.getStringUnitWidth(leftTextPlan) * 14 / doc.internal.scaleFactor;
    const startX = (pageWidth - textWidth) / 2;
    const endX = startX + textWidth;

    doc.addImage('assets/apme.png', 'PNG', imgX, 10, imgWidth, imgHeight);
    doc.setFontSize(10);
    doc.text(rightText1, rightX - textWidth1, 20);
    doc.text(leftText1, 15, 20);
    doc.setFontSize(9);
    doc.text(leftText2, 20, 25);
    doc.text(rightText2, rightX - (textWidth2 + 5), 25);
    doc.text(rightText3, rightX - textWidth3, 30);
    doc.text(leftText3, 15, 30);

    doc.setFontSize(12);
    doc.setFont('Helvetica', 'bold');
    doc.text(leftTextPlan, pageWidth / 2, 37, { align: 'center' });
    doc.setFontSize(11);
    doc.setFont('Helvetica', 'normal');

    doc.setFontSize(9);
    doc.setTextColor(128, 128, 128);
    doc.text(this.translate.instant('budget') + txtExercice, 15, 43);
    doc.text(this.translate.instant('pft') + txtPf, 15, 48);
    doc.text(this.translate.instant('pat') + txtPlan, 15, 53);
    doc.text(this.translate.instant('debut') + dateDebut, 15, 58);
    doc.text(this.translate.instant('fin') + dateFin, 15, 63);
    doc.text(this.translate.instant('da') + libelleFrAR, 15, 68);
    doc.text(this.translate.instant('modeContractualisation') + ' : ' + modeA, 15, 73);
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.setFont('Helvetica', 'bold');
    let currentY = 83;
    doc.text(this.translate.instant('operationsAR'), 15, currentY);
    doc.line(15, currentY + 1, 15 + doc.getTextWidth(this.translate.instant('operationsAR')), currentY + 1);
    autoTable(doc, { startY: currentY + 5, head: [['N°', 'Désignation', 'Coût']], body: [[1, 'Article A', 100], [2, 'Article B', 200],], });

    currentY += 10;
    doc.text(this.translate.instant('objectifs'), 15, currentY);
    doc.line(15, currentY + 1, 15 + doc.getTextWidth(this.translate.instant('objectifs')), currentY + 1);

    autoTable(doc, { startY: currentY + 5, head: [['N°', 'Code', 'Désignation', 'Taux .R.']], body: [[1, 'C01', 'Objectif A', '10%'], [2, 'C02', 'Objectif B', '20%'],], });
    currentY += 10;
    doc.text(this.translate.instant('racis'), 15, currentY);
    doc.line(15, currentY + 1, 15 + doc.getTextWidth(this.translate.instant('racis')), currentY + 1);

    autoTable(doc, { startY: currentY + 5, head: [['N°', 'Role', 'Intitulé']], body: [[1, 'R001', 'Rôle A'], [2, 'R002', 'Rôle B'],], });

    const pageSize = doc.internal.pageSize;
    const pageHeight = pageSize.height;

    const totalWidth = doc.internal.pageSize.getWidth();
    let pageCount = 0;

    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) { doc.setPage(i); doc.text(`Page ${i} / ${totalPages}`, pageWidth - 30, pageHeight - 10); }

    const pdfData = doc.output('datauristring');
    this.pdfData = this.sanitizer.bypassSecurityTrustResourceUrl(pdfData);
    this.printDialog = true;
  }
  async printMemoire(mode: PrintMode): Promise<void> {
    this.mode = mode;
    const doc = new jsPDF();
    const imgWidth = 25;
    const imgHeight = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const imgX = (pageWidth - imgWidth) / 2;
    const txtPlan = this.pa.libelleFr;
    const txtExercice = this.exercice.libelleFr;
    const txtPf = this.getPF(this.pa.moPointFocaleID).designationFr;
    const libelleFrAR = this.activiteAR.libelleFr;
    const leftText1 = 'REPUBLIQUE DU CAMEROUN';
    const leftTextPlan = this.translate.instant('memoireDepensePrint');
    const leftText2 = 'PAIX - TRAVAIL - PATRIE';
    const leftText3 = this.organisation.libelleFr;
    const rightText1 = 'REPUBLIC OF CAMEROON';
    const rightText2 = 'PEACE - WORK - FATHERLAND';
    const rightText3 = this.organisation.libelleUs;
    const rightX = pageWidth - 20;

    const textWidth1 = doc.getStringUnitWidth(rightText1) * 10 / doc.internal.scaleFactor;
    const textWidth2 = doc.getStringUnitWidth(rightText2) * 10 / doc.internal.scaleFactor;
    const textWidth3 = doc.getStringUnitWidth(rightText3) * 10 / doc.internal.scaleFactor;
    const textWidth = doc.getStringUnitWidth(leftTextPlan) * 14 / doc.internal.scaleFactor;

    doc.addImage('assets/apme.png', 'PNG', imgX, 10, imgWidth, imgHeight);
    doc.setFontSize(10);
    doc.text(rightText1, rightX - textWidth1, 20);
    doc.text(leftText1, 15, 20);
    doc.setFontSize(9);
    doc.text(leftText2, 20, 25);
    doc.text(rightText2, rightX - (textWidth2 + 5), 25);
    doc.text(rightText3, rightX - textWidth3, 30);
    doc.text(leftText3, 15, 30);

    doc.setFontSize(12);
    doc.setFont('Helvetica', 'bold');
    doc.text(leftTextPlan, pageWidth / 2, 37, { align: 'center' });
    doc.setFontSize(11);
    doc.setFont('Helvetica', 'normal');

    doc.setFontSize(9);
    doc.setTextColor(128, 128, 128);
    doc.text(this.translate.instant('budget') + txtExercice, 15, 43);
    doc.text(this.translate.instant('pft') + txtPf, 15, 48);
    doc.text(this.translate.instant('pat') + txtPlan, pageWidth / 2, 43);
    doc.text(this.translate.instant('da') + libelleFrAR, pageWidth / 2, 48);

    const data = this.depenses.map((exam, index) => {
      return [index + 1, this.getUOeuvre(exam.moUniteOeuvreID).designation, this.getUOeuvre(exam.moUniteOeuvreID).conditionnement, this.getUOeuvre(exam.moUniteOeuvreID).prixunitaire, exam.quantite, exam.montant ? NumberFormatter.formatWithThousandSeparator(exam.montant) : 0];
    });
    data.push(["TOTAL", "", "", "", "", this.getTotalMemoire() ? NumberFormatter.formatWithThousandSeparator(this.getTotalMemoire()) : 0]);
    const pageSize = doc.internal.pageSize;
    const pageHeight = pageSize.height;

    const totalWidth = doc.internal.pageSize.getWidth();
    let pageCount = 0;

    autoTable(doc, {
      startY: 53,
      head: [['N°', 'Désignation', 'Conditionnement', 'P.U', 'Qté', 'Montant']], // En-têtes du tableau  
      body: data,
      theme: 'grid',
      headStyles: { fillColor: [23, 74, 125], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9, valign: 'middle', },
      columnStyles: {
        0: { valign: 'middle', halign: 'left', fontSize: 9, fontStyle: 'bold', cellWidth: (totalWidth * 0.05) },
        1: { valign: 'middle', halign: 'left', fontSize: 9, fontStyle: 'normal' },
        2: { valign: 'middle', halign: 'left', fontSize: 8, fontStyle: 'normal' },
        3: { valign: 'middle', halign: 'left', fontSize: 9, fontStyle: 'normal' },
        4: { valign: 'middle', halign: 'left', fontSize: 9, fontStyle: 'normal' },
        5: { valign: 'middle', halign: 'right', fontSize: 9, fontStyle: 'bold' }
      },
      didDrawPage: (data) => {
        pageCount++;
        doc.setFontSize(10);
        const repetitiveText = `----- ${leftTextPlan} -----`;
        doc.setFontSize(10);
        doc.text(repetitiveText, pageWidth / 2, pageHeight - 10, { align: 'center' });
      }
    });

    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.text(`Page ${i} / ${totalPages}`, pageWidth - 30, pageHeight - 10);
    }

    const pdfData = doc.output('datauristring');
    this.pdfData = this.sanitizer.bypassSecurityTrustResourceUrl(pdfData);
    this.printDialog = true;
  }

  getTotalMemoire() { let total = 0; for (const item of this.depenses) { total += item.montant; } return total; }
  getTotalOperation() { let total = 0; for (const item of this.operations) { total += item.montant; } return total; }


  async getAllChildrenWithAR(activite: any) {
    const children = await this.getChild(activite);
    const op: TreeNode = { key: activite.activiteID, data: activite, type: 'activite', parent: undefined, children: [] };
    let allChildren: any[] = [];
    if (op.data.niveauActiviteID === 1) {
      allChildren.push(op);
    }
    for (const child of children) {
      allChildren.push(child);
      if (child.data.niveauActiviteID === 4) {
        const activitiesAR = await this.getARList(child.data);
        const filteredAR = activitiesAR.filter(ar => ar.data.tacheID === child.data.activiteID);
        child.data.montant = filteredAR.reduce((sum, ar) => sum + ar.data.montant, 0);
        console.log(child.data);
        allChildren = allChildren.concat(activitiesAR);
      } else {
        const childChildren = await this.getAllChildrenWithAR(child.data);
        allChildren = allChildren.concat(childChildren);
      }
    }
    return allChildren;
  }

  /*  async getAllChildrenAR(activite: any) {
     let allChildren: any[] = [];
     const activitiesAR = await this.getARList(activite);
     allChildren = allChildren.concat(activitiesAR);
     return allChildren;
   } */
  /*  async listActiviteTache() {
    let allData: any[] = [];
    let activities = [];
    const taches = await this.api.listActiviteTache(this.organisation.organisationID, this.exercice.millesime, this.pa.moPlanTravailID).toPromise();
    console.log(taches);
    for await (const item of taches) {
      let op: TreeNode = { key: '', data: null, type: '', parent: undefined };
      op.key = item.activiteID;
      op.data = item;
      op.parent = item.activiteParentID;
      op.type = 'activite';
      activities.push(op);
    }
    allData = allData.concat(activities);
    for (const activite of activities) {
      const childrenWithAR = await this.getAllChildrenAR(activite.data);
      console.log(activite);
      allData = allData.concat(childrenWithAR);
    }
    return allData;
  } */
  /* async listActiviteTache() {
    let allData: any[] = [];
    const activitiesMap: { [key: string]: TreeNode } = {};
    const taches = await this.api.listActiviteTache(this.organisation.organisationID, this.exercice.millesime, this.pa.moPlanTravailID).toPromise();
    console.log(taches);
    for (const item of taches) {
      let op: TreeNode = { key: item.activiteID, data: item, type: 'activite', parent: item.activiteParentID };
      activitiesMap[item.activiteID] = op;
    }
    for (const item of taches) {
      const activite = activitiesMap[item.activiteID];
      allData.push(activite);
    }
    for (const activite of Object.values(activitiesMap)) {
      const childrenWithAR = await this.getAllChildrenAR(activite.data);
      activite.children = activite.children || [];
      activite.children.push(...childrenWithAR);
    }

    return allData;
  }

  async getAllChildrenAR(activite: any) {
    let allChildren: any[] = [];
    const activitiesAR = await this.getARList(activite);
    allChildren = allChildren.concat(activitiesAR);
    return allChildren;
  } */

  async listActiviteTache() {
    let allData: any[] = [];
    const activitiesMap: { [key: string]: TreeNode } = {};
    const taches = await this.api.listActiviteTache(this.organisation.organisationID, this.exercice.millesime, this.pa.moPlanTravailID).toPromise();

    console.log(taches);

    for (const item of taches) {
      let op: TreeNode = { key: item.activiteID, data: item, type: 'activite', children: [] };
      activitiesMap[item.activiteID] = op;
      allData.push(op);
    }

    for (const activite of Object.values(activitiesMap)) {
      const childrenWithAR = await this.getAllChildrenAR(activite.data);
      activite.children = activite.children || [];
      activite.children.push(...childrenWithAR);
    }

    return allData;
  }

  async getAllChildrenAR(activite: any) {
    let allChildren: any[] = [];
    const activitiesAR = await this.getARList(activite);
    allChildren = activitiesAR.filter((ar: any) => ar.tacheID === activite.activiteID);
    return allChildren;
  }


  generateObjectiveCode(): string {
    this.currentIndex = this.objectifs.length + 1;
    const paddedIndex = String(this.currentIndex).padStart(6, '0');
    const code = `OB${paddedIndex}`; this.currentIndex++; return code;
  }
  generateIndCode(codeOb: string): string {
    this.currentIndexInd = this.indicateurs.length + 1;
    const paddedIndex = String(this.currentIndexInd).padStart(4, '0');
    const code = codeOb.slice(-2) + `I${paddedIndex}`; this.currentIndexInd++; return code;
  }


  async getActivitiesFromAllLevel() {
    this.fparam.organisationID = this.organisation.organisationID;
    this.fparam.millesime = this.exercice.millesime;
    this.fparam.moPlanTravailID = this.pa.moPointFocaleID;
    this.fparam.niveau = 1;
    this.fparam.activiteID = "1";
    const sousprogrammes = await this.api.listMoActivite(this.fparam).toPromise();
    this.sousprogrammes = await this.api.listMoActivite(this.fparam).toPromise();
    let allData: any[] = [];
    for (const activite of sousprogrammes) {
      const childrenWithAR = await this.getAllChildrenWithAR(activite);
      allData = allData.concat(childrenWithAR);
    }
    return allData;
  }
  

  onDragOver(event: DragEvent) { event.preventDefault(); this.dropText = "Release to upload"; }

  onDragLeave(event: DragEvent) { event.preventDefault(); this.dropText = this.defaultText; }

  onDrop(event: DragEvent) { event.preventDefault(); const files = event.dataTransfer?.files; this.handleFiles(files || null); }

  onFileSelected(event: Event) { const input = event.target as HTMLInputElement; if (input.files) { this.handleFiles(input.files); } }

  handleFiles(files: FileList | null) {
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type !== 'application/pdf') {
        this.fileTypeError = true;
        this.dropText = "File type must be PDF";
        this.pdfUrl = null;
      } else {
        this.fileTypeError = false;
        this.dropText = "File uploaded successfully!";
        this.uploadedFile = file;
        const fileUrl = URL.createObjectURL(file);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
        this.fileUploaded = true;
        this.uploadProgress = 0;
        const interval = setInterval(() => {
          this.uploadProgress += 10;
          if (this.uploadProgress >= 100) {
            clearInterval(interval);
            this.uploadProgress = 100;
          }
        }, 200);
      }
    }
  }

  removeFile() {
    this.pdfUrl = null;
    this.pdfData = null;
    this.fileUploaded = false;
    this.uploadProgress = 0;
    this.uploadedFile = null;
    this.dropText = this.defaultText;
  }

  onDownload(name: string): void {
    this.displaySpinner = true;
    this.api.fichierDownload(name).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const fileUrl = URL.createObjectURL(blob);
        this.pdfData = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
        this.displaySpinner = false;
        this.printDialog = true;
      }, (error) => console.error('An error occurred while downloading the file:', error));
  }

  listPiece(id: string) {
    this.files = [];
    this.api.listAllFichier(id).subscribe(files => {
      console.log(files);
      this.files = files;
    })
  }
  async listPl(id: string) {
    this.structureplans = [];
    this.api.listPl(id).subscribe(structureplans => {
      console.log(structureplans);
      for (const ele of structureplans) {
        this.structureplans.push(ele.structureID);
      }
    })
    this.fparam.organisationID = this.organisation.organisationID;
    this.fparam.millesime = this.exercice.millesime;
    this.fparam.moPlanTravailID = this.pa.moPointFocaleID;
    this.fparam.niveau = 1;
    this.fparam.activiteID = "1";
    this.arbre = [];
    var arrayToTree = require('array-to-tree');
    let activities = await this.api.listMoActivite(this.fparam).toPromise();
    console.log(activities);
    for (let item of activities) {
      let file: TreeNode = { key: "", data: null, parent: undefined, children: [{ data: {} }] };
      file.key = item.activiteID;
      file.data = item;
      file.parent = item.activiteParentID;
      this.arbre.push(file);
    };
    this.arbre = arrayToTree(this.arbre, { parentProperty: 'parent', customID: 'key' });
  }

  saveObjectif() {
    if (!this.objectif.moObjectifID) {
      this.objectif.moObjectifID = `MOOBJ${new Date().toISOString().replace(/[-:]/g, '').replace('T', '').replace(/\..*$/, '')}.${Math.floor(Math.random() * 1000)}.${Math.floor(Math.random() * 1000)}`;
      this.objectifs.push(Object.assign({}, this.objectif));
    } else {
      for (const ele of this.objectifs) {
        if (this.objectif.moObjectifID == ele.moObjectifID) {
          ele.moObjectifID = this.objectif.moObjectifID;
          ele.moniActiviteARealiserID = this.activiteAR.moniActiviteARealiserID;
          ele.libelleFr = this.objectif.libelleFr;
          ele.code = this.objectif.code;
          ele.libelleUs = this.objectif.libelleUs;
          ele.description = this.objectif.description;
          ele.indicateurs = this.indicateurs;
        }
      }
      this.objectifs = [...this.objectifs];
    }
    this.objectifPage = false;
    this.detailActivitePage = true;
  }



  saveIndicateur() {
    if (!this.indicateur.moIndicateurID) {
      this.indicateur.moIndicateurID = `MOIND${new Date().toISOString().replace(/[-:]/g, '').replace('T', '').replace(/\..*$/, '')}.${Math.floor(Math.random() * 1000)}.${Math.floor(Math.random() * 1000)}`;
      this.indicateurs.push(Object.assign({}, this.indicateur));
    } else {
      for (const ele of this.indicateurs) {
        if (this.indicateur.moIndicateurID == ele.moIndicateurID) {
          ele.code = this.indicateur.code;
          ele.libelleFr = this.indicateur.libelleFr;
          ele.description = this.indicateur.description;
          ele.periodicite = this.indicateur.periodicite;
          ele.jourRappel = this.indicateur.jourRappel;
          ele.periodiciteType = this.indicateur.periodiciteType;
          ele.reference = this.indicateur.reference;
          ele.etat = this.indicateur.etat;
          ele.cible = this.indicateur.cible;
        }
      }
      this.indicateurs = [...this.indicateurs];
    }
    this.indicateurDialog = false;
  }


  remove(i: number, tab: any[]) { tab.splice(i, 1); }

  saveUo() {
    this.uo.organisationID = this.organisation.organisationID;
    this.uo.millesime = this.exercice.millesime;
    this.uo.user_update = this.ts.getUser().username;
    this.uo.ip_update = this.ip;
    this.displaySpinner = true;
    console.log(this.uo);
    this.api.saveUo(this.uo).subscribe(data => {
      this.displaySpinner = false;
      this.uoDialog = false;
      this.listUo();
      this.showSuccesDialog("Enregistrement réussie");
    }, error => { this.displaySpinner = false; this.showErrorDialog("Echec d'enregistrement"); })
  }

  createUo() {
    this.uo = new MoUniteOeuvre();
    this.uo.moUniteOeuvreID = `MOUO${new Date().toISOString().replace(/[-:]/g, '').replace('T', '').replace(/\..*$/, '')}.${Math.floor(Math.random() * 1000)}.${Math.floor(Math.random() * 1000)}`;
    this.uoDialog = true;
  }

}
