import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global';
import {Location} from '@angular/common';
import { Motive } from '../../../../../../../../models/motive';
import { MotiveService } from '../../../../../../../../core/services/admin/motive.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'sib-motive-edit',
  templateUrl: './motive-edit.component.html',
  styleUrls: ['./motive-edit.component.scss']
})
export class MotiveEditComponent implements OnInit {

  public motive:Motive;
	public message:string;
  public failedConect:string;

  constructor(
    private _motiveService: MotiveService,
		private _route: ActivatedRoute,
		private _location: Location,
    private snackBar: SnackBarService
  ) { }

  ngOnInit() {
    this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getMotive(id);
			}
		);
  }

  getMotive(id)
	{
		this._motiveService.getOne(id).subscribe
		(
			response =>
			{
				this.motive = response.motive;
			},
			error =>
			{
				console.log(<any>error);
				if(error instanceof HttpErrorResponse)
				{
					if(error.status===0)
					{
						this.failedConect = Global.failed;
					}
				}
			}
		)
	}

	update(form: NgForm)
	{
		if(form.valid)
		{
			this._motiveService.update(this.motive).subscribe
			(
				response =>
				{
					if(response.status==true)
					{
						this.message  = response.message.text;
						this.snackBar.openSnackBar(this.message,'');
					}
					else
					{
						this.message  = response.message.text;
						this.snackBar.openSnackBar(this.message,'');
					}
				},
				error =>
				{
					console.log(error);
					this.message  = error.error.message;
					this.snackBar.openSnackBar(this.message,'');
				}
			);
		}else
		{
		}
		
	}

	goBack(){
		this._location.back();
	  }


}
