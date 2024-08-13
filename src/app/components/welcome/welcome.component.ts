import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Stat } from 'src/app/class/state/state';
import { ApiService } from 'src/app/services/api.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  mode = '';
  displaySpinner = false;
  user: any;

  list: any[] = [];
  state: Stat = new Stat();
  data: any;
  chartOptions: any;
  audihomeworks: any[] = [];

  chargCours = false;
  chargRes = false;
  chargUe = false;
  chargAs = false;
  chargSte = false;
  chargHaudi = false;
  constructor(
    public route: ActivatedRoute,
    public api: ApiService,
    public ts: SessionStorageService,
    public translate: TranslateService,
    public router: Router,
  ) { this.user = this.ts.getUser(); }
  basicOptions: any;
  basicData: any;
  options: any;
  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    console.log(this.ts.getUser());
    this.basicData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Sales',
          data: [540, 325, 702, 620],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }

  reloadAll() {

  }

  getTypeRes(id: number) {
    let libelle = '';
    switch (id) {
      case 1: libelle = "DEVOIR À FAIRE"; break;
      case 2: libelle = "SUPPORT DE COUR"; break;
      case 3: libelle = "LIEN HYPERTEXT"; break;
      case 4: libelle = "CONTENU VIDEO"; break;
      default:
        break;
    }
    return libelle;
  }




  onDownload(name: string): void {
    console.log(name);
    this.displaySpinner = true;
    const encodedFilename = btoa(name);
    this.api.download(name).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = atob(encodedFilename);
        link.click();
        window.URL.revokeObjectURL(url);
        this.displaySpinner = false;
      },
      (error) => {
        this.displaySpinner = false;
        this.erreur('errorLoadAttachment');
        console.error('An error occurred while downloading the file:', error);
      }
    );
  }

  detailCoursDialog = false;
  messageDialog = false;
  srca = '';
  title = '';
  message = '';
  succes(msg: string) {
    this.srca = 'assets/img/ok.png';
    this.title = 'Succes !';
    this.message = msg;
    this.messageDialog = true;
  }
  erreur(msg: string) {
    this.srca = 'assets/img/attention.png';
    this.title = 'Erreur !';
    this.message = msg;
    this.messageDialog = true;
  }

  status: any = '';
  toggleStatus(val: string) {
    this.status = val;
    this.ts.saveActiveItem(val);
  }

  getRoute(route: string) {
    this.toggleStatus(route);
    this.router.navigate(['accueil/' + route + '']);
  }
}
