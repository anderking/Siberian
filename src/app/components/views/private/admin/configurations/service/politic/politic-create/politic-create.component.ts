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
  selector: 'sib-politic-create',
  templateUrl: './politic-create.component.html',
  styleUrls: ['./politic-create.component.scss']
})
export class PoliticCreateComponent implements OnInit {

  public policy:Policy;
  public message:string;

  constructor(
    private _policyService: PolicyService,
	private _router: Router,
	private _location: Location,
	private snackBar: SnackBarService

  ) 
  { 

    this.policy = new Policy();
    console.log(this.policy);
  }

  ngOnInit()
  {
  }


  register(form: NgForm)
	{
		if(form.valid)
		{
			console.log(form.value);
			this.policy.name = form.value.name;
			this.policy.description = form.value.description;
      this.policy.actionPlan = form.value.actionPlan;
			this._policyService.create(this.policy).subscribe
			(
				response =>
				{
					if (response.status==true)
					{
						console.log(response);
						this.message = response.message.text;
						form.reset();
						this.messageSnackBar(this.message); 
					}
					else
					{
						console.log(response);
						this.message = response.message.text;
						this.messageSnackBar(this.message);
					}
				},
				error =>
				{
					console.log(error);

					if(error instanceof HttpErrorResponse)
					{
						if(error.status===404)
						{
							this.message = error.error.message;
							console.log(error);
							this.messageSnackBar(this.message);
						}
					}else
					{
						
						console.log(error);
						
					}
				}
				);
		}else
		{
		}
	}

	messageSnackBar(message)
	{
		this.snackBar.openSnackBarSuccess(message);
	}
	goBack(){
		this._location.back();
	  }
}
