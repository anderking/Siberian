import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../../../../../../../../core/services/dialog.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global';
import { User } from '../../../../../../../../models/user';
import { UserService } from '../../../../../../../../core/services/admin/user.service';

@Component({
  selector: 'sib-user-alls',
  templateUrl: './user-alls.component.html',
  styleUrls: ['./user-alls.component.scss']
})
export class UserAllsComponent implements OnInit {

	public user:any;
	public updateUser:any;
	public users: Array < User > = new Array < User > ();
	public message:string;
	public failedConect:string;

	displayedColumns: string[] = ['id', 'email','firstName','lastName','dniType','dni','gender','role','status','edit','delete'];
	dataSource: MatTableDataSource<User>;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	constructor
	(
		private _userService: UserService,
		private dialogService: DialogService,
		private snackBar: SnackBarService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _location: Location
	)
	{
		
	}

	ngOnInit()
	{
		this.getUsers();
	}

	getUsers()
	{
		this._userService.All().subscribe
		(
			response =>
			{
				this.users = response.users;
				this.table();
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

	applyFilter(filterValue: string)
	{
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	table()
	{
		this.dataSource = new MatTableDataSource(this.users);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	onDelete(id){
		this.dialogService.openConfirmDialog('¿Estás seguro de eliminar el Usuario?').afterClosed().subscribe
		(
			response =>
			{
				if (response==true)
				{
					this.getUser(id);
				}else
				{
					console.log(response);
				}
			}
		);
	}

	getUser(id)
	{
		this._userService.getOne(id).subscribe
		(
			response =>
			{
				this.user = response;
				this.user = this.user.user;
				this.update(this.user);
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}

	update(user)
	{
		this.user.status = 'inactive';
		this._userService.update(this.user).subscribe
		(
			response =>
			{
				if(response.status==true)
				{
					this.updateUser = response.user;
					this.getUsers();
					this.snackBar.openSnackBar('Eliminado Correctamente','¿Deshacer?').onAction().subscribe
					(
						() =>
						{
							this.user.status = 'active';
							this._userService.update(this.user).subscribe
							(
								response =>
								{
									if(response.status==true)
									{
										this.updateUser = response.user;
										this.getUsers();
										this.message = "Usuario Recuperado Correctamente";
										this.snackBar.openSnackBar(this.message,'');
									}
									else
									{
										this.message  = response.message.text;
										this.snackBar.openSnackBar(this.message,'');
									}

								}
							);
						}
					);
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
	}
	goBack(){
		this._location.back();
	  }

}
