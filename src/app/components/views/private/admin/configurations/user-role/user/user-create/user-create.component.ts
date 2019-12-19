import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global';
import { User } from '../../../../../../../../models/user';
import { UserService } from '../../../../../../../../core/services/admin/user.service';
import { Role } from '../../../../../../../../models/role';
import { RoleService } from '../../../../../../../../core/services/admin/role.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';

@Component({
	selector: 'sib-user-create',
	templateUrl: './user-create.component.html',
	styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

	public user:any;
	public roles:any;

	public email:string;
	public password:string;
	public firstName:string;
	public lastName:string;
	public dni:string;
	public dniType:string;
	public roleId:string;

	public dniTypes:any[];
	public dniTypeSelected:string="";
	public roleSelected:string="";
	public resID:string;

	public message:string;
	public failedConect:string;

	constructor
	(
		private _router: Router,
		private _userService: UserService,
		private _roleService: RoleService,
		private snackBar: SnackBarService,
		private _location: Location,
		)
	{
		this.dniTypes= [
			{id:"v",name:"Venezolano"},
			{id:"e",name:"Extranjero"},
			{id:"j",name:"Jurídico"},
		];

		this.user = new User();
	}

	ngOnInit()
	{
		this.getRoles();
	}

	getRoles()
	{
		this._roleService.All().subscribe
		(
			response =>
			{
				this.roles = response.roles;
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
		);
	}

	register(form: NgForm)
	{
		if(form.valid)
		{
			this.user.email = form.form.value.email;
			this.user.password = form.form.value.password;
			this.user.firstName = form.form.value.firstName;
			this.user.lastName = form.form.value.lastName;
			this.user.dniType = form.form.value.dniType;
			this.user.dni = form.form.value.dni;
			this.user.RoleId = form.form.value.RoleId;

			console.log(this.user);

			this._userService.create(this.user).subscribe
			(
				response =>
				{
					if (response.status==true)
					{
						console.log(response);
						form.reset();
						this.message = response.message.text;
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

	messageSnackBar(message){
		this.snackBar.openSnackBarSuccess(message);
	}
	goBack(){
		this._location.back();
	  }

}
