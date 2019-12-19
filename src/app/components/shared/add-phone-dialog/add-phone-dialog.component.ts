import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'sib-add-phone-dialog',
  templateUrl: './add-phone-dialog.component.html',
  styleUrls: ['./add-phone-dialog.component.scss']
})
export class AddPhoneDialogComponent implements OnInit {

	public phoneTypes:any[];
	public phoneTypeSelected:string="";
	public userId:string=localStorage.getItem('resID');

	constructor
	(
		@Inject(MAT_DIALOG_DATA) public data,
		public dialogRef: MatDialogRef<AddPhoneDialogComponent>
	)
	{
		this.phoneTypes= [
			{id:"Casa",name:"Casa"},
			{id:"Móvil",name:"Móvil"},
			{id:"Trabajo",name:"Trabajo"},
			{id:"Otro",name:"Otro"},
			
		];

	}

	ngOnInit()
	{

	}

	closeDialog(){
		this.dialogRef.close();
	}

	save(form: NgForm) {
		this.dialogRef.close(form.value);
	}


}
