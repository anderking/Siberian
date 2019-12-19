import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global';
import { Policy } from '../../../../../../../../models/policy';
import { PolicyService } from '../../../../../../../../core/services/admin/policy.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';


@Component({
  selector: 'sib-politic-edit',
  templateUrl: './politic-edit.component.html',
  styleUrls: ['./politic-edit.component.scss']
})
export class PoliticEditComponent implements OnInit {

  public policy:Policy;
  public message:string;
  public failedConect:string;

  constructor(
    private _policyService: PolicyService,
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
				this.getPolicy(id);
			}
		);
  }

  getPolicy(id)
	{
		this._policyService.getOne(id).subscribe
		(
			response =>
			{
				this.policy = response.policy;
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
			this._policyService.update(this.policy).subscribe
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
