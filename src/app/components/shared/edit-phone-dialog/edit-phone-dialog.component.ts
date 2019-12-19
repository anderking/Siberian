import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'sib-edit-phone-dialog',
  templateUrl: './edit-phone-dialog.component.html',
  styleUrls: ['./edit-phone-dialog.component.scss']
})
export class EditPhoneDialogComponent implements OnInit {

	public phoneTypes:any[];
	public phoneTypeSelected:string;
	public userId:string=localStorage.getItem('resID');

	constructor
	(
	@Inject(MAT_DIALOG_DATA) public data,
	public dialogRef: MatDialogRef<EditPhoneDialogComponent>
	)
	{
		this.phoneTypes= [
			{id:"Casa",name:"Casa"},
			{id:"Móvil",name:"Móvil"},
			{id:"Trabajo",name:"Trabajo"},
			{id:"Otro",name:"Otro"},
			
		];
		this.phoneTypeSelected = this.data.phone.phoneType;

	}


	ngOnInit()
	{
	}

	closeDialog(){
		this.dialogRef.close();
	}

	save(form: NgForm) {
	this.dialogRef.close(this.data);
	}

}
