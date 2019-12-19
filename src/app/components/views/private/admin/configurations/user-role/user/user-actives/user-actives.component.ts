import { Component, OnInit, ViewChild, EventEmitter, Input, Output} from '@angular/core';
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
  selector: 'sib-user-actives',
  templateUrl: './user-actives.component.html',
  styleUrls: ['./user-actives.component.scss']
})
export class UserActivesComponent implements OnInit {

	public user:any;
	public updateUser:any;
	public users: Array < User > = new Array < User > ();
	public message:string;
	public failedConect:string;
	public isChange:number=0;

	@Input() recoverOutputRecived:number;
	@Input() inactiveOutputRecived:number;
	@Output() inactiveOutput = new EventEmitter<number>();

	displayedColumns: string[] = ['id', 'email','firstName','lastName','dni','gender','role','status','edit','delete'];
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
		this._userService.getActives().subscribe
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
		          console.log(this.message);
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
		this.users = this.snackBar.orderByDateAsc(this.users);
		this.dataSource = new MatTableDataSource(this.users);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	onDesactive(id){
		this.dialogService.openConfirmDialog('¿Estás seguro de desactivar este usuario?').afterClosed().subscribe
		(
			response =>
			{
				if (response==true)
				{
					this.inactiveUser(id);
				}
			}
		);
	}

	inactiveUser(id)
	{
		this._userService.inactive(id).subscribe
		(
			response =>
			{
				this.getUsers();
				this.isChange = this.isChange+1;
				this.inactiveOutput.emit(this.isChange);
				this.message = response.message.text;
				this.snackBar.openSnackBar(this.message,'¿Deshacer?').onAction().subscribe
				(
					() =>
					{
						this.active(id);
					}
				);
			},
			error =>
			{
				console.log(<any>error);
			}
		);
	}

	active(id)
	{
		this._userService.active(id).subscribe
		(
			response =>
			{
				this.getUsers();
				this.isChange = this.isChange-1;
				this.inactiveOutput.emit(this.isChange);
		        this.message = response.message.text;
		        this.snackBar.openSnackBarSuccess(this.message);
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
