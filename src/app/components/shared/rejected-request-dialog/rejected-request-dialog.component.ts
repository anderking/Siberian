import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {NgForm} from '@angular/forms';
import { MotiveService } from 'src/app/core/services/admin/motive.service';

@Component({
	selector: 'sib-rejected-request-dialog',
	templateUrl: './rejected-request-dialog.component.html',
	styleUrls: ['./rejected-request-dialog.component.scss']
})
export class RejectedRequestDialogComponent implements OnInit {

	public motive:string;
	public note:string;
	public motiveSelected:string = "";
	public motives:any;

	constructor
	(
		@Inject(MAT_DIALOG_DATA) public data,
		public dialogRef: MatDialogRef<RejectedRequestDialogComponent>,
		private _motiveService: MotiveService,
		)
	{

	}


	ngOnInit()
	{
		this.getMotives();
	}

	getMotives()
	{
		this._motiveService.All().subscribe
		(
			response =>
			{
				if (response.status==true)
				{
					this.motives = response.motives;
				}
			});
	}

	closeDialog(){
		this.dialogRef.close();
	}

	save(form: NgForm) {
		this.dialogRef.close(form.value);
	}

}
