import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global'
import { Variety } from '../../../../../../../../models/variety';
import { VarietyService } from '../../../../../../../../core/services/admin/variety.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';


@Component({
  selector: 'sib-variety-edit',
  templateUrl: './variety-edit.component.html',
  styleUrls: ['./variety-edit.component.scss']
})
export class VarietyEditComponent implements OnInit {
 
  public variety:Variety;
  public message:string;
  public failedConect:string;

  constructor(
    private _varietyService: VarietyService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _location: Location,
    private snackBar: SnackBarService
  ) 
  
  { 
    
  }

  ngOnInit() {

    this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getVariety(id);
			}
		);
  }

  getVariety(id)
	{
		this._varietyService.getOne(id).subscribe
		(
			response =>
			{
				this.variety = response.variety;
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
			this._varietyService.update(this.variety).subscribe
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
