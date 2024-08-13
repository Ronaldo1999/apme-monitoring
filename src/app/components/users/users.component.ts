import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, ConfirmationService, TreeNode } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { UserGlobal } from 'src/app/class/class/userGlobal/user-global';
import { FindParam } from 'src/app/class/find-param';
import { UpdateState } from 'src/app/class/update-state';
import { User } from 'src/app/class/user/user';
import { ApiService } from 'src/app/services/apiBase.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  userDialog = false;
  user: User = new User();

  files1: TreeNode[] = [];

  selectedUsers: any[] = [];
  action = '';
  submitted = false;
  switcherCollecte = 1;

  displayError = false;
  selectedLocalite: number[] = [];
  selectedRegions: number[] = [];
  selectedDepartement: number[] = [];
  selectedArrondi: number[] = [];
  profils = [
    { id: 1, libelle: 'Top management' },
    { id: 1, libelle: 'Responsable de programme' },
    { id: 1, libelle: 'Responsable d’action' },
    { id: 1, libelle: 'Responsable d’activites' },
    { id: 1, libelle: 'Referent d’action' },
    { id: 1, libelle: 'Coordonnateur du Controle de Gestion ' },
    { id: 1, libelle: 'Controleur de gestion ' },
    { id: 1, libelle: 'Responsable operationnel' },
    { id: 1, libelle: 'Referant departemental' },
    { id: 1, libelle: 'Responsable d’unites administratives ' },
  ];
  groupes = [
    { id: 1, libelle: 'ADMINISTRATEUR' },
    { id: 2, libelle: 'GESTIONNAIRE' },
    { id: 3, libelle: 'UTILISATEUR' },
  ];
  fparam: any;
  ref!: DynamicDialogRef;
  succesMessage: string = '';
  constructor(
    public route: ActivatedRoute,
    public ts: TokenStorageService,
    public dialogService: DialogService,
    public translate: TranslateService,
    private api: ApiService
  ) {
    this.fparam = new FindParam('ORG20180017050207.606.850', this.ts.getUser().username);
  }
  typeUser = '';

  ngOnInit(): void {
    this.userGlobal.user.userUpdate = this.ts.getUser().username;
    this.liste();
    this.typeUser = this.route.snapshot.params['typeUser'];
  
  }

  getNiveauIntervention(typeuser: number) {
    let libelle = '';
    switch (typeuser) {
      case 1:
        libelle = 'CENTRALE';
        break;
      case 2:
        libelle = 'REGIONALE';
        break;
      case 3:
        libelle = 'DEPARTEMENTALE';
        break;

      default:
        break;
    }
    return libelle;
  }
  displaySpinner = false;

  listDescendants() {
    this.displaySpinner = true;
    this.files1 = [];
    var arrayToTree = require('array-to-tree');
    this.api
      .userListByLogin('ORG20180017050207.606.850', this.ts.getUser().username)
      .subscribe(
        (data) => {
          this.users = data;

          for (let item of data) {
            let file: TreeNode = {
              key: '',
              data: null,
              label: '',
              parent: undefined,
            };
            file.key = item.login;
            file.data = item;
            file.label = item.nom + ' ' + item.prenom;
            file.parent = item.loginParent;
            this.files1.push(file);
          }
          this.files1 = arrayToTree(this.files1, {
            parentProperty: 'parent',
            customID: 'key',
          });
          this.displaySpinner = false;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  liste() {
    this.users = [];
    this.displaySpinner = true;
    this.api.listUsers('ORG20180017050207.606.850').subscribe(
      (res) => {
        this.users = res;
        this.displaySpinner = false;
        console.log(this.users);
      },
      (error) => { console.log(error); this.displaySpinner = false; }
    );
  }
  libelle = '';
  modifierTree() {
    this.trieTree(this.files1);
  }

  dialogActivation = false;
  mesageActivation = '';
  acti = 0;

  confirmActive(action: number) {
    if (action == 1) {
      this.mesageActivation = 'Êtes-vous certains de vouloir activer cet utilisateur ?';
      this.acti = 1;
    } else {
      this.mesageActivation = 'Êtes-vous certains de vouloir desactiver cet utilisateur ?';
      this.acti = 0;
    }
    this.dialogActivation = true;
  }

  active(user: User) {
    /* this.api.activeUser(user.userID, this.acti).subscribe((res: any) => {  }); */
  }
  usersUpdateList = new Set<User>();
  trieTree(topNode: TreeNode[]) {
    for (let index = 0; index < topNode.length; index++) {
      topNode[index].data.loginParent = null;
      this.AffecterNodeParent(topNode[index]);
    }
    console.log(this.usersUpdateList);
    this.api.userListUpdate(this.usersUpdateList).subscribe(
      (data: any) => {
        this.showDialogSucces('succès reseau update');
        this.usersUpdateList = new Set<User>();
      },
      (error) => {
        console.log(error);
        this.showDialogError('erreur reseau update');
      }
    );
  }
  AffecterNodeParent(topNode: TreeNode) {
    this.usersUpdateList.add(topNode.data);
    if (topNode.children != null) {
      var i;
      for (i = 0; i < topNode.children.length; i++) {
        topNode.children[i].data.loginParent = topNode.key;
        this.usersUpdateList.add(topNode.children[i].data);
        if (topNode.children[i].children != null) {
          this.AffecterNodeParent(topNode.children[i]);
        }
      }
    } else return;
  }

  close() {
    this.userDialog = false;
    this.submitted = false;
  }
  dialogConfirmAction = false;
  canSave = false;
  errorMessage = '';
  controle(bse: User) {
    /* if (!bse.loginuser) {
      this.canSave = false;
      this.errorMessage = 'Veuillez entrer un login svp !';
      this.dialogConfirmAction = true;
    } else if (!bse.passworduser) {
      this.canSave = false;
      this.errorMessage = 'Veuillez entrer le mot de passe svp !';
      this.dialogConfirmAction = true;
    } else if (!bse.nomuser) {
      this.canSave = false;
      this.errorMessage = 'Veuillez entrer le nom svp !';
      this.dialogConfirmAction = true;
    } else {
      this.canSave = true;
    } */
  }

  showDialogError(message: string) {
    this.errorMessage = message;
    this.displayError = true;
  }

  closeError() {
    this.displayError = false;
  }

  showDialogSucces(message: string) {
    this.succesMessage = message;
    this.successDialog = true;
  }

  expandAll() {
    this.files1.forEach((node) => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.files1.forEach((node) => {
      this.expandRecursive(node, false);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach((childNode) => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  

  listType: any[] = [
    { id: 1, label: 'CENTRALE' },
    { id: 2, label: 'REGIONNALE' },
    { id: 3, label: 'DEPARTEMENTALE' },
  ];
  type = 0;

  

 
  saveUserActeur() {
    this.displaySpinner = true;
  
    
  }

  /* ******************* Update state ************ */
  dialogDelete = false;
  successDialog = false;
  errorDialog = false;
  dconfirmActionDialog = false;
  upstate: UpdateState = new UpdateState();
  actif = 0;

  confirmActivationForOne(user: User, action: number) {
    if (action == 1) {
      this.actif = 1;
    }
    this.upstate = new UpdateState();
    this.selectedUsers.push(Object.assign({}, user));
    this.upstate.user_update = this.ts.getUser().username;
    this.upstate.action = action;
    this.upstate.typeID = 2;
    this.dconfirmActionDialog = true;
  }
  hideActivation() {
    this.actif = 0;
    this.dconfirmActionDialog = false;
    this.selectedUsers = [];
  }
  hideDeleteDialog() {
    this.actif = 0;
    this.dialogDelete = false;
    this.selectedUsers = [];
  }
  updateState() {
    console.log(this.selectedUsers);
    this.displaySpinner = true;
    let tab: UpdateState[] = [];
    for (const ele of this.selectedUsers) {
      this.upstate.elementSID = ele.login;
      tab.push(Object.assign({}, this.upstate));
    }
    this.api.updateStates(tab).subscribe((res) => {
      this.dconfirmActionDialog = false;
      this.displaySpinner = false;
      this.selectedUsers = [];
      this.showDialogSucces(this.translate.instant('Opération réussie'));
      this.actif = 0;
      this.refresh();
    });
  }

  confirmDel(user: User) {
    this.user = user;
    this.dialogDelete = true;
  }

  deleteList() {
    this.displaySpinner = true;
    this.api.userDelete(this.user.login, 'Fr').subscribe((res) => {
      this.selectedUsers = [];
      this.showDialogSucces(this.translate.instant('Suppression réussie'));
      this.displaySpinner = false;
      this.refresh();
      this.dialogDelete = false;
    });
  }
  refresh() {
    this.liste();
  }

  
  createUser() {
    this.duplicateUserName = false;
    this.duplicateEmail = false;
    this.actionUser = 'new'
    this.libelle = "Création d'un nouvel utilisateur"
    this.userGlobal = new UserGlobal(new User(), [], []);
    this.userUpdateDialog = true;
  }

  userGlobal: UserGlobal = new UserGlobal(new User(), [], []);
  username: any;
  allfields = false;
  duplicateUserName = false;
  duplicateEmail = false;
  userUpdateDialog = false;

  userGlobalInsert(object: UserGlobal, language: string) {
    object.user.organisationID = this.fparam.organisationID;
    object.user.userUpdate = this.ts.getUser().username;
    this.displaySpinner = true;
    this.api.userGlobalInsert(object, language).subscribe(
      (data: any) => {
        this.showDialogSucces(this.translate.instant('Utilisateur crée avec succès'));
        this.displaySpinner = false;
        this.userUpdateDialog = false;
        this.refresh();
      },
      (error) => {
        this.displaySpinner = false;
        console.log(error);
        this.showDialogError("Une erreur est survenue lors de la création de l'utilisateur");
        switch (error.error) {
          case 1001: this.duplicateUserName = true; break;
          case 1002: this.duplicateEmail = true; break;
          default: ; break;
        }
      }
    );
  }

  userGlobalUpdate(user: UserGlobal, language: string) {
    this.api.userGlobalUpdate(user, language).subscribe(
      (data: any) => {
        this.showDialogSucces(this.translate.instant('Utilisateur modifié avec succès'));
        this.displaySpinner = false;
        this.userUpdateDialog = false;
        this.refresh();
      },
      (error) => {
        this.displaySpinner = false;
        console.log(error);
        this.showDialogError("Une erreur est survenue lors de la modification de l'utilisateur");
        switch (error.error) {
          case 1001: this.duplicateUserName = true; break;
          case 1002: this.duplicateEmail = true; break;
          default: ; break;
        }
      }
    );
  }

  actionUser = '';
  saveUser() {

    this.userGlobal.user.organisationID = 'ORG20180017050207.606.850';
    this.submitted = true;
    if (
      this.userGlobal.user.login &&
      this.userGlobal.user.password &&
      this.userGlobal.user.organisationID &&
      this.userGlobal.user.nom &&
      this.userGlobal.user.telephone &&
      this.userGlobal.user.email
    ) {
      this.allfields = true;
      if (this.actionUser == 'new') {
        console.log(this.userGlobal);
        this.userGlobalInsert(this.userGlobal, 'fr');
      } else if (this.actionUser == 'edit') {
        this.userGlobalUpdate(this.userGlobal, 'fr');
      }
    }
  }
  passRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/;
  confirmPass = '';
  validerPass() {
    console.log('pass is ' + (this.passRegex.test(this.userGlobal.user.password) ? 'correct' : 'incorrect'));
    return this.passRegex.test(this.userGlobal.user.password);
  }

  getUser(user: User, action: string) {
    console.log(user);
    this.actionUser = action;
    this.libelle = this.translate.instant('user' + action);
    this.displaySpinner = true;
    this.api.userGlobalFind(user.login, 'fr').subscribe((data: any) => {
      this.displaySpinner = false;
      this.userGlobal = data;
      this.confirmPass = this.userGlobal.user.password;
      this.userUpdateDialog = true;
    });
  }

  vue = false;
  vuec = false;
  togglePasswordVisibility() {
    this.vue = !this.vue;
    const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }
  togglePasswordVisibilityCon() {
    this.vuec = !this.vuec;
    const passwordInput = document.getElementById('passwordInputC') as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }

  noSame = true;
  getConfirm(pass: string) {
    let reu = false;
    if (pass == this.userGlobal.user.password) {
      this.noSame = true;
      reu = true;
    } else {
      this.noSame = false;
      reu = false;
    }
    return reu;
  }
  
}
