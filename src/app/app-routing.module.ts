import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ElaborationComponent } from './components/elaboration/elaboration.component';


import { ProfileComponent } from './components/profile/profile.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { LoginActivateGuard } from './services/login-activate.guard';
import { LogipageComponent } from './logipage/logipage.component';
import { GroupesComponent } from './components/groupes/groupes.component';
import { PointfocalComponent } from './components/pointfocal/pointfocal.component';
import { UsersComponent } from './components/users/users.component';
import { HomeparametreComponent } from './components/homeparametre/homeparametre.component';
import { UniteoeuvreComponent } from './components/uniteoeuvre/uniteoeuvre.component';
import { ModecontractualisationComponent } from './components/modecontractualisation/modecontractualisation.component';



const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LogipageComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  {
    path: 'accueil', component: AccueilComponent,
    canActivate: [LoginActivateGuard],
    children: [
      { path: '', component: WelcomeComponent },

      //------------------------------------------------------------------
      { path: 'statusEl', component: ElaborationComponent },
      { path: 'statusDoc', component: ElaborationComponent },
      { path: 'statusEval', component: ElaborationComponent },
      { path: 'statusParam', component: HomeparametreComponent },
      { path: 'moncompte', component: ProfileComponent },
      { path: 'groupes', component: GroupesComponent },
      { path: 'users', component: UsersComponent },
      { path: 'pointFocaux', component: PointfocalComponent },
      { path: 'uniteDoeuvre', component: UniteoeuvreComponent },
      { path: 'modeContractualisation', component: ModecontractualisationComponent },
    ]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
