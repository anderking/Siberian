import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceOrderService } from 'src/app/core/services/client/serviceOrder.service';
import * as moment from 'moment';

@Component({
  selector: 'sib-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.scss']
})
export class CalendarDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
		public dialogRef: MatDialogRef < CalendarDialogComponent >,
		private _s: ServiceOrderService) { }

	turns = [];
	min: any;
	datePickerConfig = {
		allowMultiSelect: true,
		min: moment(new Date())
	};

	//instale la libreria moment para que manejen las fechas USENLAAAAA

  ngOnInit() {
		this.min = moment(new Date());
		this.turns =
    [
      {id:"morning",name:"Mañana"},
      {id:"afternoon",name:"Tarde"},
    ];
  }
	
	closeDialog(){
  	this.dialogRef.close();
  }

}
