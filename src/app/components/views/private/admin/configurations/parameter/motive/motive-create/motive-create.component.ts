import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global'
import { Motive } from '../../../../../../../../models/motive';
import { MotiveService } from '../../../../../../../../core/services/admin/motive.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';

@Component({
  selector: 'sib-motive-create',
  templateUrl: './motive-create.component.html',
  styleUrls: ['./motive-create.component.scss']
})
export class MotiveCreateComponent implements OnInit {
	
	public motive:Motive;
	public message:string;

	constructor
	(
		private _motiveService: MotiveService,
		private _router: Router,
		private _location: Location,
		private snackBar: SnackBarService,
		)
	{
		this.motive = new Motive();
	}

	ngOnInit()
	{

	}

	register(form: NgForm)
	{
		if(form.valid)
		{
			console.log(form.value);
			this.motive.name = form.value.name;
			this.motive.description = form.value.description;

			this._motiveService.create(this.motive).subscribe
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
