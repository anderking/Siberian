import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global';
import { Variety } from '../../../../../../../../models/variety';
import { VarietyService } from '../../../../../../../../core/services/admin/variety.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';

@Component({
  selector: 'sib-variety-create',
  templateUrl: './variety-create.component.html',
  styleUrls: ['./variety-create.component.scss']
})
export class VarietyCreateComponent implements OnInit {

  public variety:Variety;
		public message:string;

  constructor(
    private _varietyService: VarietyService,
	private _router: Router,
	private _location: Location,
	private snackBar: SnackBarService
  ) 
  { 
    this.variety = new Variety();
    console.log(this.variety);
  }

  ngOnInit() {
  }

  register(form: NgForm)
	{
		if(form.valid)
		{
			console.log(form.value);
			this.variety.name = form.value.name;
			this.variety.description = form.value.description;

			this._varietyService.create(this.variety).subscribe
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
