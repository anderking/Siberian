import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
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
  selector: 'sib-user-inactives',
  templateUrl: './user-inactives.component.html',
  styleUrls: ['./user-inactives.component.scss']
})
export class UserInactivesComponent implements OnInit, OnChanges {

	public user:any;
	public updateUser:any;
	public users: Array < User > = new Array < User > ();
	public message:string;
	public failedConect:string;
	public isChange:number=0;

	@Input() inactiveOutputRecived:number;
	@Output()
	recoverOutput = new EventEmitter<number>();

	displayedColumns: string[] = ['id', 'email','firstName','lastName','dni','gender','role','status','edit','delete','back'];
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

	ngOnChanges(){
		this.getUsers();
	}

	getUsers()
	{
		this._userService.getInactives().subscribe
		(
			response =>
			{
				if (response.status==true)
		        {
		        	this.users = response.users;
					this.table();
		        }
		        else
		        {
		          this.users = [];
		          this.message = response.message.text;
		          this.table();
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
		);
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
		this.users = this.snackBar.orderByDateAsc(this.users);
		this.dataSource = new MatTableDataSource(this.users);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	onDelete(id){
		this.dialogService.openConfirmDialog('¿Estás seguro de eliminar este Usuario permanentemente?').afterClosed().subscribe
		(
			response =>
			{
				if (response==true)
				{
					this.deleteUser(id);
				}else
				{
					console.log(response);
				}
			}
		);
	}

	deleteUser(id)
	{
		this._userService.delete(id).subscribe
		(
			response =>
			{
	            this.message = response.message.text;
	            this.snackBar.openSnackBarSuccess(this.message);
	            this.getUsers();
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}

	onBack(id){
		this.dialogService.openConfirmDialog('¿Estás seguro de activar este usuario?').afterClosed().subscribe
		(
			response =>
			{
				if (response==true)
				{
					this.active(id);
				}else
				{
					console.log(response);
				}
			}
		);
	}

	active(id)
	{
		this._userService.active(id).subscribe
		(
			response =>
			{
				this.isChange = this.isChange-1;
				this.recoverOutput.emit(this.isChange);
		        this.message = response.message.text;
		        this.snackBar.openSnackBarSuccess(this.message);
				this.getUsers();
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
