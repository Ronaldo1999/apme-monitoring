import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  message = ''
  color = ''
  nature = 0;

  constructor(public config: DynamicDialogConfig, public ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.message = this.config.data.msg;
    this.nature = this.config.data.nature;
    this.color = this.config.data.color;
  }
  closeOk() { this.ref.close(1) }
  closeKo() { this.ref.close() }

}
