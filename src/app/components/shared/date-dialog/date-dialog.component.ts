import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'sib-date-dialog',
  templateUrl: './date-dialog.component.html',
  styleUrls: ['./date-dialog.component.scss']
})
export class DateDialogComponent implements OnInit {

  public isDate: boolean = false;
  public isDateIn: boolean = false;
  public isDateFin: boolean = false;

  public fechaIn: Date;
  public fechaFin: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DateDialogComponent>
  ) { }

  ngOnInit() {
  }
  
  closeDialog() {
    this.dialogRef.close();
  }

  changeDateIn(type: string, event: MatDatepickerInputEvent<Date>) {
    this.isDateIn = true;
    this.fechaIn = event.value;
    console.log(this.fechaIn);
    //this.dateRevision = event.value;
  }

  changeDateFin(type: string, event: MatDatepickerInputEvent<Date>) {
    this.isDateFin = true;
    this.fechaFin = event.value;
    console.log(this.fechaFin);
    //this.dateRevision = event.value;
  }

}
