import { APP_INITIALIZER, LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './services/config.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { EditorModule } from 'primeng/editor';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabMenuModule } from 'primeng/tabmenu';
import { TreeTableModule } from 'primeng/treetable';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
//import { NgxUploaderDirectiveModule } from 'ngx-uploader-directive';
import { PrimeModule } from './shared/prime.module';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmationService } from 'primeng/api';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { SplitterModule } from 'primeng/splitter';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ElaborationComponent } from './components/elaboration/elaboration.component';

import { ProfileComponent } from './components/profile/profile.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxPrintModule } from 'ngx-print';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { NumberInputDirective } from './components/number-input-directive.directive';
import { LogipageComponent } from './logipage/logipage.component';
import { GroupesComponent } from './components/groupes/groupes.component';

import { PickListModule } from 'primeng/picklist';
import { PointfocalComponent } from './components/pointfocal/pointfocal.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NumberMaxDirectiveDirective } from './components/number-max-imputation.directive';
import { UsersComponent } from './components/users/users.component';
import { HomeparametreComponent } from './components/homeparametre/homeparametre.component';
import { UniteoeuvreComponent } from './components/uniteoeuvre/uniteoeuvre.component';
import { ModecontractualisationComponent } from './components/modecontractualisation/modecontractualisation.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DeleteDialogComponent } from './dialog/delete-dialog/delete-dialog.component';
import { SuccessDialogComponent } from './dialog/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './dialog/error-dialog/error-dialog.component';

registerLocaleData(localeFr);

export function initConfig(appConfig: ConfigService) {
  return () => appConfig.loadConfig();
}
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccueilComponent,
    ElaborationComponent,
    ProfileComponent,
    WelcomeComponent,
    ResetpasswordComponent,
    NumberInputDirective,
    NumberMaxDirectiveDirective,
    LogipageComponent, GroupesComponent, PointfocalComponent,UsersComponent, HomeparametreComponent, UniteoeuvreComponent, ModecontractualisationComponent, DeleteDialogComponent, SuccessDialogComponent, ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, HttpClientModule,
    PdfViewerModule,
    PrimeModule,
    DropdownModule,
    MultiSelectModule,
    TabMenuModule, SelectButtonModule, ProgressSpinnerModule,
    ConfirmPopupModule, ButtonModule, InputTextModule,
    TreeTableModule,
    ConfirmDialogModule, DialogModule, EditorModule, OverlayPanelModule, SplitterModule, SplitButtonModule,
    QRCodeModule, NgxPrintModule, PickListModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    DialogService,
    TranslateService,
    ConfirmationService,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigService],
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
