import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/core/services/dialog.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/core/services/admin/role.service';
import { FunctionService } from 'src/app/core/services/admin/function.service';

@Component({
  selector: 'sib-function-create',
  templateUrl: './function-create.component.html',
  styleUrls: ['./function-create.component.scss']
})
export class FunctionCreateComponent implements OnInit {

	public functions:any;
	public roles:any;
	public roleSelected:any;
	public role:any;
	public roleFunctions:any;
	public roleId:any;
	public message:string;
	public failedConect:string;
	current_selected: string;

	public roleFunctionsSelected:any;


	constructor
	(
		private dialogService: DialogService,
		private snackBar: SnackBarService,
		private _roleService: RoleService,
		private _functionService: FunctionService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _location: Location
		)
	{

	}

	ngOnInit()
	{
		this.getRoles();
		this.getFunctions();
	}

	getRoles()
	{
		this._roleService.All().subscribe
		(
			response =>
			{
				if (response.status==true)
				{
					this.roles = response.roles;
					this.roleSelected="";
				}

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

	getRole(id)
	{
		this._roleService.getOne(id).subscribe
		(
			response =>
			{
				this.role = response.role;
				this.roleFunctions=this.role.functions;
				/*if(this.roleFunctions)
				{
					this.roleFunctionsSelected = [];
					for(let roleFunction of this.roleFunctions)
					{
						this.roleFunctionsSelected.push(roleFunction.id);
					}
				}*/
				console.log(this.roleFunctions);
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

	getFunctions()
	{
		this._functionService.All().subscribe
		(
			response =>
			{
				if (response.status==true)
				{
					this.functions = response.functions;
					console.log(this.functions);
				}

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

	compareFn(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

	register()
	{	
		let functionsIds = this.roleFunctions.map(x => x.id)
		this._roleService.addFunctions(this.roleId, functionsIds).subscribe
		(
			response =>
			{
				if (response.status==true)
				{
					this.message = response.message.text;
					this.messageSnackBar(this.message);
					this.getRole(this.roleId)
				}
				else
				{
					this.message = response.message.text;
					this.messageSnackBar(this.message);
				}
			},
			error =>
			{
				console.log(error);
			});
	}

	changeRole(event)
	{
		this.roleId = event;
		this.getRole(event);
		console.log(this.roleSelected)
	}

	messageSnackBar(message)
	{
		this.snackBar.openSnackBarSuccess(message);
	}


	goBack()
	{
		this._location.back();
	}


}
