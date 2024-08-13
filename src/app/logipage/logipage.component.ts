import { Component, OnInit } from '@angular/core';
import { Organisation } from '../class/organisation/organisation';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User, UserLogin } from '../class/user/user';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from '../services/session-storage.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/_services/auth.service';
import { ApiService } from '../services/apiBase.service';
import { TokenStorageService } from '../auth/_services/token-storage.service';
@Component({
  selector: 'app-logipage',
  templateUrl: './logipage.component.html',
  styleUrls: ['./logipage.component.scss', './style.css']
})
export class LogipageComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  stateOptions: any[] = [];

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  lang: string = 'fr';
  value1: string = 'fr';

  langue = this.translate.instant(this.ts.getActiveLang());
  displaySpinner = false;
  spinner = false;
  user: User = new User();

  displayError = false;
  displaySucces = false;
  succesMessage: string = '';
  displayAffecter = false;
  displayAffecterPoste = false;
  ref!: DynamicDialogRef;
  organisations: any[] = [];

  loadingMessage = '';

  constructor(public dialogService: DialogService,
    public translate: TranslateService,
    private router: Router,
    private authService: AuthService,
    private ts: SessionStorageService,
    private tokenStorage: TokenStorageService,
    private http: HttpClient, private api: ApiService) { }

  ngOnInit(): void {
    this.translate.use(this.ts.getActiveLang());
    this.loadingMessage = 'En cours de chargement'
    this.login();
    // this.translate.use('fr');
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.stateOptions = [
      { label: 'Français', value: 'fr' },
      { label: 'English', value: 'en' },
    ];
  }
  async login() {
    this.spinner = true;
    setTimeout(async () => {
      this.spinner = false;
    }, 2000);
  }

  changeLang(event: any) {
    this.langue = event;
    this.translate.use(event);
    this.ts.saveActiveLang(event);
  }


  roles2: any[] = [];

  userT: User = new User();
  users: User[] = [];

  /*   onSubmit(): void {
      this.displaySpinner = true;
      const { username, password } = this.form;
  
      let user = new UserLogin();
      user.email = username;
      user.password = password;
      user.profil = 'enseignant';
      console.log(user);
      this.api.login(user).subscribe(
        (data: any) => {
          if (data || data != undefined || data.length) {
            console.log(data[0]);
            this.tokenStorage.saveUser(data[0]);
            this.tokenStorage.saveProfil(data[0]);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            console.log(this.tokenStorage.getUser().profil);
            this.displaySpinner = false;
            this.router.navigate(['/accueil']);
          } else if (data == undefined) {
            this.displaySpinner = false;
            this.errorMessage = 'Identifiants incorrects';
            this.isLoginFailed = true;
          } else {
            this.displaySpinner = false;
            this.errorMessage = 'Identifiants incorrects';
            this.isLoginFailed = true;
          }
        },
        (error) => {
          console.log(error.error);
          if (error.statusText == 'Unknown Error') {
            this.errorMessage = 'Impossible de joindre le serveur';
          } else if (error.error.error == 'Unauthorized') {
            this.errorMessage = 'Identifiants incorrects';
          } else {
            this.errorMessage = 'Identifiants incorrects';
          }
          this.displaySpinner = false;
          this.isLoginFailed = true;
        }
      );
    } */
  userLogin(login: string) { this.api.userLogin(login).subscribe(data => { }) }
  onSubmit(): void {
    this.spinner = true;
    this.loadingMessage = 'inCOnnect'
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.userLogin(data.username);
        this.spinner = false; this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/accueil']);
      },
      err => {
        console.log(err.error);
        if (err.statusText == 'Unknown Error') { this.errorMessage = this.translate.instant('Impossible de joindre le serveur'); }
        else if (err.error.error == 'Unauthorized') { this.errorMessage = this.translate.instant('Identifiants incorrects'); }
        else { this.errorMessage = err.error; }
        this.spinner = false; this.isLoginFailed = true;
      }
    );
  }

  loginDialog = false;
  confirm = false;
  gotomenu() {
    this.router.navigate(['/homer/attente']);
  }
  close() {
    this.confirm = false;
  }
  reloadPage(): void {
    window.location.reload();
  }

  closeSucces() {
    this.displaySucces = false;
  }

  closeError() {
    this.displayError = false;
  }

  changePassDialog = false;

  changePass() {
    this.changePassDialog = true;
  }
  newUser: User = new User();
  confirmPass = '';

  successDialog = false;
  errorDialog = false;
  errMessageLog = '';
  errDialogLog = false;
  /*  confirmChangePass() {
     if (this.newUser.password == this.userT.password) {
       this.errorMessage = "Mauvais mot de passe";
       this.errMessageLog = "Veuillez entrer un mot de passe different de l'ancien svp !";
       this.displayError = true;
     } else {
       this.api.changePassword(this.userT.login, this.newUser.password).subscribe(
         (res) => { this.successDialog = true; },
         (error) => { this.errorDialog = true; }
       );
     }
   } */

  vuec = false;
  togglePasswordVisibilityCon() {
    this.vuec = !this.vuec;
    const passwordInput = document.getElementById('passwordInputC') as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }

}
