import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { Structure } from 'src/app/class/class/structure/structure';
import { Activite } from 'src/app/class/classCg/activite/activite';
import { ActiviteParametre } from 'src/app/class/classCg/activiteParametre/activite-parametre';
import { Exercice } from 'src/app/class/exercice/exercice';
import { FindParam } from 'src/app/class/find-param';
import { MoIndicateur } from 'src/app/class/monitoringClass/indicateur.model';
import { MoPointFocale } from 'src/app/class/monitoringClass/pointfocale';
import { MoPointFocaleStructure } from 'src/app/class/monitoringClass/pointfocalestructure';
import { Organisation } from 'src/app/class/organisation/organisation';
import { User } from 'src/app/class/user/user';
import { Action } from 'src/app/enum/action.enum';
import { ApiService } from 'src/app/services/apiBase.service';


@Component({
  selector: 'app-pointfocal',
  templateUrl: './pointfocal.component.html',
  styleUrls: ['./pointfocal.component.scss']
})
export class PointfocalComponent {
  fparam: any;
  options: any[] = [];
  action = '';
  libelleRec = '';
  organisation: Organisation = new Organisation();
  organisations: Organisation[] = [];
  exercice: Exercice = new Exercice();
  exercices: Exercice[] = [];
  structures: Structure[] = [];
  selectedStructure: Structure[] = [];

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
  indicateurs: MoIndicateur[] = [];


  planactions: any[] = [];
  selectedPa: any[] = [];
  droits: any[] = [];
  username!: string;

  pageByAction = Action.LIST;

  selectedActivites: any[] = [];

  pf: MoPointFocale = new MoPointFocale();
  ip = '';
  constructor(
    private api: ApiService,
    private cgApi: ApiService,
    private tokenStorageService: TokenStorageService,
    public translate: TranslateService,
    public dialogService: DialogService) {
    this.getOrganisation();
    this.fparam = new FindParam(this.tokenStorageService.getOrganisation(), this.tokenStorageService.getUser().username);
    this.droits = this.tokenStorageService.getRoles();
    this.username = this.tokenStorageService.getUser().username;

  }

  ngOnInit() {
    const ipValue = this.api.getIp();
    if (ipValue) { this.ip = ipValue; }
    this.listOrganisation();
    this.listExercice();
    //this.structureList();
  }

  getPageByAction(action: Action) { this.pageByAction = action; }
  getOrganisation() { this.organisation.organisationID = this.tokenStorageService.getOrganisation(); }
  listOrganisation() { this.api.organisationList('', true).subscribe((data) => { console.log(data); this.organisations = data; if (data.length == 1) { this.organisation = data[0]; } }); }

  listExercice() { this.api.listExercice().subscribe((data) => { console.log(data); this.exercices = data; this.exercice = data[data.length - 1]; }); }

  structureList(organisationID: string) {
    this.displaySpinner = true;
    this.structures = [];
    this.listUsers(organisationID);
    this.load();
    this.api.structureList('fr', organisationID).subscribe((data) => {
      this.structures = data;
      console.log(data);
      this.displaySpinner = false;
    }, error => {
      this.displaySpinner = false;
    });
  }
  pfs: MoPointFocale[] = [];
  details: MoPointFocaleStructure[] = [];
  listMoPFAll() {
    this.displaySpinner = true;
    this.pfs = [];
    this.api.listMoPFAll(this.organisation.organisationID, this.exercice.millesime).subscribe((data) => {
      this.pfs = data;
      console.log(data);
      this.displaySpinner = false;
    }, error => {
      this.displaySpinner = false;
    });
  }

  async fillSelectedStructure(tab: MoPointFocaleStructure[]) {
    this.selectedStructure = tab
      .map(detail => this.structures.find(structure => structure.structureID === detail.structureID))
      .filter(structure => structure !== undefined) as Structure[];

    this.seStr = this.selectedStructure.map(structure => structure.abbreviationFr).join(', ');
  }

  onRowSelect(structure: Structure) {
    this.seStr = this.selectedStructure.map(structure => structure.abbreviationFr).join(', ');
  }
  listMoPFDetail(moPointFocaleID: string) {
    this.displaySpinner = true;
    this.api.listMoPFDetail(this.organisation.organisationID, this.exercice.millesime, moPointFocaleID).subscribe((data) => {
      this.fillSelectedStructure(data);
      console.log(data);
      this.displaySpinner = false;
    }, error => {
      this.displaySpinner = false;
    });
  }
  getList() {
    this.getPageByAction(Action.LIST);
  }

  getStructure(structureID: string) {
    let str = new Structure();
    for (const ele of this.structures) {
      if (ele.structureID == structureID) {
        str = ele;
      }
    }
    return str;
  }

  users: User[] = [];
  load() { this.listMoPFAll() }
  save() {
    this.pf.pointFocaleStructures = [];
    console.log(this.selectedStructure);
    let detail: MoPointFocaleStructure = new MoPointFocaleStructure();
    detail.moPointFocaleID = this.pf.moPointFocaleID;
    for (const ele of this.selectedStructure) {
      detail = new MoPointFocaleStructure();
      detail.moPointFocaleID = this.pf.moPointFocaleID;
      detail.moPointFocaleStructureID = `MOPFS${new Date().toISOString().replace(/[-:]/g, '').replace('T', '').replace(/\..*$/, '')}.${Math.floor(Math.random() * 1000)}.${Math.floor(Math.random() * 1000)}`;
      detail.structureID = ele.structureID;
      this.pf.pointFocaleStructures.push(Object.assign({}, detail));
    }
    this.pf.organisationID = this.organisation.organisationID;
    this.pf.millesime = this.exercice.millesime;
    this.pf.user_update = this.tokenStorageService.getUser().username;
    this.pf.ip_update = this.ip;
    this.displaySpinner = true;
    console.log(this.pf);
    this.api.savePf(this.pf).subscribe(data => {
      this.displaySpinner = false;
      this.load();
      this.getList();
      this.succes("Enregistrement réussie");
    }, error => { this.displaySpinner = false; this.erreur("Echec d'enregistrement"); })
  }
  actionPF = '';
  pfstructures: MoPointFocaleStructure[] = [];
  create() {
    this.pf = new MoPointFocale();
    this.actionPF = 'newPF';
    this.selectedStructure = [];
    this.seStr = '';
    this.pf.moPointFocaleID = `MOPF${new Date().toISOString().replace(/[-:]/g, '').replace('T', '').replace(/\..*$/, '')}.${Math.floor(Math.random() * 1000)}.${Math.floor(Math.random() * 1000)}`;
    this.getPageByAction(Action.CREATE);
  }
  getPF(pf: MoPointFocale, action: string) {
    this.pf = { ...pf };
    this.actionPF = action + 'PF';
    this.action = action;
    this.listMoPFDetail(pf.moPointFocaleID);
    this.getPageByAction(Action.CREATE);
  }
  listPlan(action: string) { }
  supprimer() { }

  deleteDialog = false;
  delete(pf: MoPointFocale) {
    this.pf = { ...pf };
    this.deleteDialog = true;
  }

  onDropdown1(pa: MoPointFocale) {
    this.options = [
      { label: "Consulter", icon: 'fas fa-eye', color: 'rgb(23, 74, 125)', command: () => { this.getPF(pa, 'view') } },
      { label: 'Modifier', icon: 'fas fa-edit', color: 'rgb(23, 74, 125)', command: () => { this.getPF(pa, 'edit') } },
      { label: "Transmettre pour validation", icon: 'fas fa-share', color: 'rgb(23, 74, 125)', command: () => { } },
      { label: "Valider le plan d'action", icon: 'fas fa-check-square', color: 'rgb(23, 74, 125)', command: () => { } },
      { label: "Exporter le plan d'action en word", icon: 'fas fa-print', color: 'rgb(23, 74, 125)', command: () => { } },
      { separator: true },
      { label: "Supprimer", icon: 'fas fa-trash', pTooltip: "Actions groupés", color: '#ce2727', command: () => { } },
    ];
  }


  seStr = '';
  src = 'assets/img/question.png';
  srca = 'assets/img/attention.png';
  messageDialog = false;
  title = '';
  message = '';
  succes(msg: string) { this.srca = 'assets/img/ok.png'; this.title = 'Succes !'; this.message = msg; this.messageDialog = true; }
  erreur(msg: string) { this.srca = 'assets/img/attention.png'; this.title = 'Erreur !'; this.message = msg; this.messageDialog = true; }

  verifyLength(valeur: any) { let val = '' + valeur; if (val.toString().length >= 35) { return true; } return false; }
  defineDescription(libelle: any): string { return libelle.slice(0, 34); }

  verifyLengthOP(valeur: any) { let val = '' + valeur; if (val.toString().length >= 95) { return true; } return false; }
  defineDescriptionOP(libelle: any): string { return libelle.slice(0, 94); }

  verifyLengthSteep(valeur: any) { let val = '' + valeur; if (val.toString().length >= 25) { return true; } return false; }
  defineDescriptionSteep(libelle: any): string { return libelle.slice(0, 24); }


  verifyLengthRec(valeur: any) { let val = '' + valeur; if (val.toString().length >= 85) { return true; } return false; }
  defineDescriptionRec(libelle: any): string { return libelle.slice(0, 84); }

  listUsers(organisationID: string) {
    this.api.userList(organisationID, 'fr').subscribe((data) => {
      this.users = data;
      console.log(data);
    })
  }

}
