import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, TreeNode } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { FindParam } from 'src/app/class/class/findparam/find-param';
import { Groupe } from 'src/app/class/class/groupe/groupe';
import { GroupeGlobal } from 'src/app/class/class/groupeGlobal/groupe-global';
import { Modules } from 'src/app/class/class/module/modules';
import { Organisation } from 'src/app/class/class/organisation/organisation';
import { Role } from 'src/app/class/class/role/role';
import { Systeme } from 'src/app/class/class/systeme/systeme';
import { UpdateState } from 'src/app/class/update-state';
import { User } from 'src/app/class/class/user/user';
import { ApiService } from 'src/app/services/apiBase.service';
import { Exercice } from 'src/app/class/exercice/exercice';

@Component({
  selector: 'app-groupes',
  templateUrl: './groupes.component.html',
  styleUrls: ['./groupes.component.scss'],
})
export class GroupesComponent implements OnInit {
  //Groupe
  organisations: Organisation[] = [];
  exercices: Exercice[] = [];
  organisation: Organisation = new Organisation();
  exercice: Exercice = new Exercice();
  groupGlobalList: GroupeGlobal[] = [];
  groupes: Groupe[] = [];
  groupe: Groupe = new Groupe();
  groupeSelect: Groupe = new Groupe();
  userList: User[] = [];
  userGroupeList: User[] = [];
  groupeGlobal: GroupeGlobal = new GroupeGlobal();
  groupeGlobalSelect: GroupeGlobal = new GroupeGlobal();
  itemsGroupe: MenuItem[] = [];

  //Systèmes
  systeme: Systeme = new Systeme();
  systemeSelect: Systeme = new Systeme();
  systemes: Systeme[] = [];
  systemesg: Systeme[] = [];
  groupeSubmitted: boolean = false;

  //Modules
  module: Modules = new Modules();
  moduleSelect: Modules = new Modules();
  modules: Modules[] = [];
  modulesf: Modules[] = [];
  modulesGroupes: Modules[] = [];

  //roles
  role: Role = new Role();
  roleSelect: Role = new Role();
  roles: Role[] = [];
  roleSelectors: Role[] = [];
  roleSelectors2: Role[] = [];

  modulesRoles: Modules[] = [];
  modulesForAddRoles: Modules[] = [];
  duplicate: boolean = false;
  duplicateCode: boolean = false;
  duplicateLibelleFr: boolean = false;
  duplicateLibelleUs: boolean = false;
  confirmMessage = '';
  files1: TreeNode[] = [];
  selectedNodes3: TreeNode[] = [];

  organisationID!: string;
  users: User[] = [];

  rolesUser = new Set<Role>();
  rolesUserFinal = new Set<Role>();
  indexRole!: number;
  displayConfirmRole: boolean = false;
  displayAjoutRole: boolean = false;
  displayAjout: boolean = false;
  displayEditGroup: boolean = false;
  displayUser: boolean = false;
  displayRole: boolean = false;

  fparam: any;

  constructor(
    private api: ApiService,
    private tokenStorageService: TokenStorageService,
    public dialog: DialogService,
    public translate: TranslateService
  ) {
    this.droits = this.tokenStorageService.getRoles();
    this.fparam = new FindParam('ORG20180017050207.606.850', this.tokenStorageService.getUser().username);
  }
  displaySpinner = false;

  ngOnInit(): void {
    this.listOrganisation();
    this.listExercice();
    // this.listGroupess();
    this.listRole();
  }

  listExercice() {
    this.displaySpinner = true;
    this.api.listExercice().subscribe((data) => {
      console.log(data); this.exercices = data;
      this.displaySpinner = false;
      this.exercice = data[data.length - 1];
    }, error => {
      this.displaySpinner = false;
    });
  }

  listOrganisation() { this.api.organisationList('', true).subscribe((data) => { console.log(data); this.organisations = data; if (data.length == 1) { this.organisation = data[0]; } }); }

  listModulesGroupes(event: { value: string }) {
    this.api
      .moduleListByHabilitation(
        this.tokenStorageService.getUser().username,
        event.value
      )
      .subscribe((data) => {
        this.modulesGroupes = data;
      });
  }

  /** liste tous les groupes */
  listGroupes() {
    this.groupGlobalList = [];
    this.displaySpinner = true;
    this.fparam.etat = 1;
    this.api.groupeList(this.fparam).subscribe(
      (data) => {
        console.log(data);
        console.log('data');
        this.groupGlobalList = data;
        this.displaySpinner = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  refrech() {
    this.listGroupess(this.organisation.organisationID);
  }
  groupess: Groupe[] = [];
  listGroupess(organisationID:string) {
    this.groupGlobalList = [];
    this.displaySpinner = true;
    this.fparam.etat = 1;
    this.api.listGroupes('ORG20180017050207.606.850').subscribe(
      (res) => {
        console.log(res);
        console.log('data');
        this.groupGlobalList = res;
        this.displaySpinner = false;
      },
      (error) => {
        this.displaySpinner = false;
        console.log(error);
      }
    );
  }

  verifyLength(valeur: any) { let val = '' + valeur; if (val.toString().length >= 35) { return true; } return false; }
  defineDescription(libelle: any): string { return libelle.slice(0, 34); }

  listModulesForAddRoles(event: { value: string }) {
    this.api
      .moduleListByHabilitation(
        this.tokenStorageService.getUser().username,
        event.value
      )
      .subscribe((data) => {
        this.modulesForAddRoles = data;
      });
  }

  listAllRoles() {
    this.listRole();
  }

  listModulesRoles(event: { value: string }) {
    this.api
      .moduleListByHabilitation(
        this.tokenStorageService.getUser().username,
        event.value
      )
      .subscribe((data) => {
        this.modulesRoles = data;
      });
  }

  /** liste des roles */
  listRole() {
    var arrayToTree = require('array-to-tree');
    this.fparam.etat = 1;
    this.api.roleListByUserData(this.fparam).subscribe(
      (data) => {
        console.log(data);
        this.roleSelectors2 = data;
        this.files1 = [];
        this.roles = data;
        for (let item of data) {
          let file: TreeNode = {
            key: '',
            data: null,
            label: '',
            parent: undefined,
          };
          file.key = item.roleID;
          file.data = item;
          file.label = item.libelleFr;
          file.parent = item.roleParent;
          this.files1.push(file);
        }
        this.files1 = arrayToTree(this.files1, {
          parentProperty: 'parent',
          customID: 'key',
        });
      },
      (error) => {
        console.log(error.error);
      }
    );
  }
  displayEditRole: boolean = false;
  closeDialogEditRole() {
    this.displayEditRole = false;
  }

  closeConfirmRole() {
    this.displayConfirmRole = false;
  }

  rolesByUser(roles: Role[]) {
    let listeRole: Role[] = [];
    let mesRoles: any;
    mesRoles = this.tokenStorageService.getRoles();
    for (let item of mesRoles) {
      roles.forEach((element) => {
        if (item == element.code) {
          this.rolesUser.add(element);
        }
      });
    }
    this.rolesUser.forEach((element) => {
      this.rolesUserFinal.add(element);
    });
    roles.forEach((element) => {
      this.rolesUser.forEach((element2) => {
        if (element.roleID == element2.roleParent) {
          this.rolesUserFinal.add(element);
        }
      });
    });
    this.rolesUserFinal.forEach((element) => {
      listeRole.push(element);
    });
    return listeRole;
  }

  /**liste des utilisateurs par organisation */
  // listUser() {
  //   this.api.userList(this.fparam.organisationID, 'fr').subscribe((data) => {
  //     console.log(data);
  //     for (var i = data.length - 1; i >= 0; i--) {
  //       for (var j = 0; j < this.groupeGlobalSelect.users.length; j++) {
  //         if ((data[i] && (data[i].login === this.groupeGlobalSelect.users[j].login)) || (data[i] && (data[i].login === ''))) {
  //           data.splice(i, 1);
  //         }
  //       }
  //     } this.users = data; this.users = [... this.users];
  //   });
  // liste = liste.concat(data.filter((obj: User) => obj.login != element.login)); console.log(liste);
  // let liste2 = this.groupeGlobalSelect.users.filter((obj: User) => obj.login)
  // this.users = data.filter((val: User) => !this.groupeGlobalSelect.users.includes(val));
  // }

  refres() {
    this.users = [];
    this.groupeGlobal.users = [];
  }
  listUser() {
    this.api.userListG(this.fparam.organisationID, 'fr').subscribe((data) => {
      console.log(data);
      this.users = data.filter((user: User) => {
        return (!this.groupeGlobal.users.some((gUser) => gUser.login === user.login) && user.login !== '');
      });
      this.users = [...this.users];
    });
  }

  action = '';
  libelle = '';
  showDialogEditGroup(action: string, groupe?: GroupeGlobal) {
    this.action = action;
    if (action == 'edit') {
      this.libelle = 'editGroup';
    } else if (action == 'view') {
      this.libelle = 'consultGroup';
    } else if (action == 'new') {
      this.libelle = 'newGroup';
    }
    if (groupe) {
      this.groupeGlobal = groupe;
    } else {
      this.groupeGlobal = new GroupeGlobal();
    }
    this.displayEditGroup = true;
  }

  closeDialogEditGroup() {
    this.displayEditGroup = false;
  }

  // showDialogRole(groupe: GroupeGlobal) {

  //   this.displayRole = true;
  //   this.selectedNodes3 = []
  //   for (let i = 0; i < groupe.roles.length; i++) {
  //     let elmt: TreeNode<any> = { data: groupe.roles[i], key: groupe.roles[i].roleID, label: groupe.roles[i].libelleFr, partialSelected: false }
  //     this.selectedNodes3.push(elmt);
  //   }

  // }

  showDialogRole(groupe: GroupeGlobal) {
    this.groupeGlobal = groupe;
    this.displayRole = true;
    this.selectedNodes3 = groupe.roles.map((role) => ({
      data: role,
      key: role.roleID,
      label: role.libelleFr,
      partialSelected: false,
    }));
  }

  closeDialogRole() {
    this.displayRole = false;
  }

  showDialogUser(groupe: GroupeGlobal) {
    this.groupeGlobal = groupe;
    this.listUser();
    this.displayUser = true;
  }
  closeDialogUser() {
    //this.refres();
    this.displayUser = false;
  }

  showDialogConfirmGroupe(groupe: GroupeGlobal) {
    console.log(groupe);

    this.groupeGlobal = groupe;
    this.displayConfirmGroupe = true;
  }
  closeConfirmGroupe() {
    this.displayConfirmGroupe = false;
  }

  /** ajouter un groupe */
  addGroupe() {
    this.displaySpinner = true;
    this.groupeSubmitted = true;
    this.groupeGlobal.groupe.organisationID = 'ORG20180017050207.606.850';
    this.groupeGlobal.groupe.user_update = this.tokenStorageService.getUser().username;
    if (this.groupeGlobal.groupe.code && this.groupeGlobal.groupe.libelleFr) {
      this.api.groupeInsert(this.groupeGlobal).subscribe(
        (data: any) => {
          this.refrech();
          this.successDialog = true;
          this.succesMessage = this.translate.instant('Groupe enregistré avec succès');
          this.groupeGlobal = new GroupeGlobal();
          this.groupeSubmitted = false;
          this.displaySpinner = false;
          this.closeDialogEditGroup();
        },
        (error) => {
          console.log(error);
          switch (error.error) {
            case 1001: this.duplicateCode = true; break;
            case 1002: this.duplicateLibelleFr = true; break;
            case 1003: this.duplicateLibelleUs = true; break;

            default:
              this.groupeSubmitted = false;
              this.displayAjout = false;
              this.showDialogError('Une erreur est survenue lors de la création du Groupe');
              break;
          }
        }
      );
    }
  }

  canSave = false;
  dialogAction = false;
  controle(groupe: Groupe) {
    if (!groupe.code) {
      this.displaySpinner = false;
      this.canSave = false;
      this.errorMessage = 'Veuillez renseigner le code svp !';
      this.dialogAction = true;
    } else if (!groupe.libelleFr) {
      this.displaySpinner = false;
      this.canSave = false;
      this.errorMessage = 'Veuillez renseigner le libellé svp !';
      this.dialogAction = true;
    } else {
      this.canSave = true;
    }
  }
  saveGroupe(groupe: Groupe) {
    this.displaySpinner = true;
    console.log(groupe);
    this.controle(groupe);
    if (this.canSave == true) {
      this.api.groupeUpdater(groupe).subscribe((data: any) => {
        console.log(data);
        this.successDialog = true;
        this.action = 'edit';
        this.closeDialogEditGroup();
        this.displaySpinner = false;
        this.refrech();
      }, (error) => {
        this.displaySpinner = false;
        this.errorDialog = true;
      }
      );
    }
  }
  // dialogs : affichage et hide groupe de fonctionnalités

  //// Modules ////
  listModules(event: { value: string }) {
    this.api
      .moduleListByHabilitation(
        this.tokenStorageService.getUser().username,
        event.value
      )
      .subscribe((data) => {
        this.modules = data;
      });
  }

  listModulesForm(event: { value: string }) {
    this.api
      .moduleListByHabilitation(
        this.tokenStorageService.getUser().username,
        event.value
      )
      .subscribe((data) => {
        this.modulesf = data;
      });
  }

  listModulesUpd(sysID: string) {
    this.api
      .moduleListByHabilitation(
        this.tokenStorageService.getUser().username,
        sysID
      )
      .subscribe((data) => {
        this.modulesf = data;
      });
  }

  indexGrp!: number;
  /** recupère le groupe selectionné pour traitement */
  recuperer(item: GroupeGlobal, index: number) {
    this.indexGrp = index;
    this.groupeGlobalSelect = item;
    console.log(this.groupeGlobalSelect);

    this.listModulesUpd(this.groupeGlobalSelect.groupe.systemeID);
  }

  /** suppression du groupe */
  deleteGroupe() {
    this.displaySpinner = true;
    console.log(this.groupeGlobal.groupe.groupeID);
    this.api.groupeDelete(this.groupeGlobal.groupe.groupeID).subscribe(
      (data) => {
        console.log(data);
        this.displaySpinner = false;
        this.groupGlobalList.splice(this.indexGrp, 1);
        this.refrech();
        this.showDialogSucces(this.translate.instant('Groupe supprimé avec succès'));
      },
      (error) => {
        console.log(error);
        this.showDialogError('Une erreur est survenue lors de la suppression du Groupe');
      }
    );
    this.displayConfirmGroupe = false;
  }

  /** affecter des utilisateurs au groupe */
  affecterUser() {
    this.displaySpinner = true;
    console.log(this.groupeGlobal);
    this.api.groupeAffecterUser(this.groupeGlobal).subscribe(
      (data: any) => {
        this.displaySpinner = false;
        this.showDialogSucces(this.translate.instant('Groupe Modifié avec succès'));
        this.users = [];
      },
      (error) => {
        console.log(error);
        this.showDialogError('Une erreur est survenue lors de la gestion des utilisateurs');
        this.users = [];
      }
    );
    this.displayUser = false;
  }
  /** affecter des roles au groupe */
  affecterRole(grp: GroupeGlobal) {
    this.displaySpinner = true;
    grp.roles = [];
    for (let element of this.selectedNodes3) {
      grp.roles.push(element.data);
    }
    console.log('groupe auquel on affecte les roles');
    console.log(grp);
    this.api.groupeAffecterRole(grp).subscribe(
      (data: any) => {
        this.showDialogSucces(this.translate.instant('Groupe Modifié avec succès'));
        this.displaySpinner = false;
      },
      (error) => {
        console.log(error);
        this.showDialogError('Une erreur est survenue lors de la Modification du Groupe');
      }
    );
    this.displayRole = false;
  }

  //dialogs : Confirmmation  suppression groupe
  displayConfirmGroupe: boolean = false;
  errorMessage: string = '';
  displayError: boolean = false;
  succesMessage: string = '';
  displaySucces: boolean = false;
  showDialogError(message: string) {
    this.errorMessage = message;
    this.errorDialog = true;
  }

  closeError() {
    this.errorDialog = false;
  }

  showDialogSucces(message: string) {
    this.succesMessage = message;
    this.successDialog = true;
  }

  closeSucces() {
    this.successDialog = false;
  }

  /* ******************* Update state ************ */
  dialogDelete = false;
  successDialog = false;
  errorDialog = false;
  dconfirmActionDialog = false;
  selectedGroupes: any[] = [];
  upstate: UpdateState = new UpdateState();
  actif = 0;
  /*  confirmActivation(action: number) {
     if (action == 1) {
       this.actif = 1;
     }
     this.upstate = new UpdateState();
     this.upstate.user_update = this.tokenStorageService.getUser().username;
     this.upstate.action = action;
     this.upstate.typeID = 1;
     this.dconfirmActionDialog = true;
   } */
  droits: string[] = [];
  habilitation(code: string) { for (let role of this.droits) { if (role == code) { return true; } } return false; }
  confirmActivationForOne(groupe: Groupe, action: number) {
    if (action == 1) {
      this.actif = 1;
    }
    this.upstate = new UpdateState();
    this.selectedGroupes.push(Object.assign({}, groupe));
    this.upstate.user_update = this.tokenStorageService.getUser().username;
    this.upstate.action = action;
    this.upstate.typeID = 1;
    this.dconfirmActionDialog = true;
  }
  hideActivation() {
    this.actif = 0;
    this.dconfirmActionDialog = false;
    this.selectedGroupes = [];
  }
  hideDeleteDialog() {
    this.actif = 0;
    this.dialogDelete = false;
    this.selectedGroupes = [];
  }
  updateState() {
    console.log(this.selectedGroupes);
    this.displaySpinner = true;
    let tab: UpdateState[] = [];
    for (const ele of this.selectedGroupes) {
      this.upstate.elementSID = ele.groupeID;
      tab.push(Object.assign({}, this.upstate));
    }
    this.api.updateStates(tab).subscribe((res) => {
      this.dconfirmActionDialog = false;
      this.displaySpinner = false;
      this.selectedGroupes = [];
      this.successDialog = true;
      this.actif = 0;
      this.refrech();
    });
  }
  /* ******************* Update state ************ */
}
