import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global'
import { Role } from '../../../../../../../../models/role';
import { RoleService } from '../../../../../../../../core/services/admin/role.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';
import { Location } from '@angular/common';

@Component({
  selector: 'sib-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss']
})
export class RoleCreateComponent implements OnInit {

	public role:Role;
	public message:string;

	constructor
	(
		private _roleService: RoleService,
		private _router: Router,
		private _location: Location,
		private snackBar: SnackBarService,
		)
	{
		this.role = new Role();
	}

	ngOnInit()
	{

	}

	register(form: NgForm)
	{
		if(form.valid)
		{
			this.role.name = form.value.name;
			this.role.description = form.value.description;
			this.role.functions = [17,22,19];

			this._roleService.create(this.role).subscribe
			(
				response =>
				{
					if (response.status==true)
					{
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
						//this.message = error.error.message;
						console.log(error);
						//this.messageSnackBar(this.message);
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
