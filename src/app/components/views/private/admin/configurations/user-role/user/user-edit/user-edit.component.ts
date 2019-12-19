import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global';
import { User } from '../../../../../../../../models/user';
import { UserService } from '../../../../../../../../core/services/admin/user.service';
import { Role } from '../../../../../../../../models/role';
import { RoleService } from '../../../../../../../../core/services/admin/role.service';
import { LocationService } from '../../../../../../../../core/services/admin/location.service';
import { ChangeRoleService } from '../../../../../../../../core/services/admin/change-role.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';
import { Location } from '@angular/common';

@Component({
  selector: 'sib-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

	public user: any;
	public roles:Role;
	public dniTypes:any[];
	public updateUser:any;
	public failedConect:string;
	public message:string;

	constructor
	(
		private _userService: UserService,
		private _roleService: RoleService,
		private _locationService: LocationService,
		private _route: ActivatedRoute,
		private _router: Router,
    	private snackBar: SnackBarService,
		private _changeRoleService: ChangeRoleService,
		private _location: Location,
	)
	{
		this.dniTypes= [
	      {id:"v",name:"Venezolano"},
	      {id:"e",name:"Extranjero"},
	    ];

	}

	ngOnInit()
	{
		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getUser(id);
			}
		);
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
		)
	}

	getUser(id)
	{
		this._userService.getOne(id).subscribe
		(
			response =>
			{
				this.user = response;
				this.user = this.user.user;
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
			this._userService.update(this.user).subscribe
			(
				response =>
				{
					if(response.status==true)
					{
						this.updateUser = response.user;
						this.changeRoleUser(this.user.id,form.value.roleId);
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

	changeRoleUser(uid,rid)
	{
		this._userService.changeRole(uid,rid).subscribe
		(
			response =>
			{
				if(response.status==true)
				{
					this.getUser(this.user.id);
				}
				else
				{
					this.message = response.message.text;
			        this.snackBar.openSnackBarSuccess(this.message);

				}
			},
			error =>
			{
				console.log(<any>error);
			}
		);
	}
	goBack(){
		this._location.back();
	  }

}
