import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { SessionStorageService } from '../services/session-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Organisation } from '../class/organisation/organisation';
import { Exercice } from '../class/exercice/exercice';
import { TokenStorageService } from '../auth/_services/token-storage.service';
import { FindParam } from '../class/find-param';
import { ApiService } from '../services/apiBase.service';
import { fromEvent, merge, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  items: MenuItem[] = [];
  notes: MenuItem[] = [];
  pars: MenuItem[] = [];
  sessions: MenuItem[] = [];
  user: any;
  profil: any;
  stateOptions: any[] = [];
  accounts: MenuItem[] = [];
  langue = this.translate.instant(this.ts.getActiveLang());

  logoutDialog = false;

  organisation: Organisation = new Organisation();
  exercice: Exercice = new Exercice();

  organisations: Organisation[] = [];
  exercices: Exercice[] = [];

  status: any = '';

  username!: string;
  fparam: any;
  droits: any[] = [];

  networkStatus: boolean = false;
  networkStatus$: Subscription = Subscription.EMPTY;
  constructor(
    public translate: TranslateService,
    private ts: SessionStorageService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    public api: ApiService,
    public route: ActivatedRoute,
  ) {
    this.user = this.tokenStorage.getUser();
    this.router.events.subscribe((res) => {
      this.status = this.tokenStorage.getActiveItem();
      this.translate.use(this.tokenStorage.getActiveLang());
    });
    this.getOrganisation();
    this.getMillesime();
    this.fparam = new FindParam(this.tokenStorage.getOrganisation(), this.tokenStorage.getUser().username);
    this.droits = this.tokenStorage.getRoles();
    this.username = this.tokenStorage.getUser().username;
  }

  getOrganisation() { this.organisation.organisationID = this.tokenStorage.getOrganisation(); }
  getMillesime() { this.exercice.millesime = this.tokenStorage.getMillesime(); }
  listOrganisation() { this.api.organisationList('', true).subscribe((data) => { console.log(data); this.organisations = data; if (data.length == 1) { this.organisation = data[0]; } }); }

  listExercice() { this.api.listExercice().subscribe((data) => { console.log(data); this.exercices = data; }); }
  ngOnInit(): void {
    this.translate.use(this.tokenStorage.getActiveLang());
    console.log(this.tokenStorage.getUser());
    this.toggleStatus(this.tokenStorage.getActiveItem());
    this.status = this.tokenStorage.getActiveItem();
    this.checkNetworkStatus();
  }

  toggleStatus(val: string) { this.status = val; this.tokenStorage.saveActiveItem(val); }

  changeLang(event: any) { this.langue = event; this.translate.use(event); this.tokenStorage.saveActiveLang(event); }

  logOut() { this.logoutDialog = true; }

  logout(): void { this.deconnexion(); }

  deconnexion() { this.tokenStorage.signOut(); this.router.navigate(['']); }
  close() { this.logoutDialog = false; }

  changeOrganisation(event: any) { let org = this.organisations.find(ct => ct.organisationID == event.target.value); if (org) { this.tokenStorage.saveOrganisation(org.organisationID, org.libelleFr); window.location.reload(); }; }
  changeMillesime(event: any) { let org = this.exercices.find(ct => ct.millesime == event.target.value); if (org) { this.tokenStorage.saveMillesime(org.millesime, org.libelleFr); window.location.reload(); }; }


  checkNetworkStatus() {
    this.networkStatus = navigator.onLine;
    this.networkStatus$ = merge(of(null), fromEvent(window, 'online'), fromEvent(window, 'offline'))
      .pipe(map(() => navigator.onLine)).subscribe(status => {
        console.log('status', status);
        this.networkStatus = status;
      });
  }
}
