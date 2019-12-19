import { Component, OnInit,ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../../../../../../../../core/services/dialog.service';
import { Role } from '../../../../../../../../models/role';
import { RoleService } from '../../../../../../../../core/services/admin/role.service';
import { Function } from '../../../../../../../../models/function';
import { FunctionService } from '../../../../../../../../core/services/admin/function.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';
import { Location } from '@angular/common';


@Component({
  selector: 'sib-role-show',
  templateUrl: './role-show.component.html',
  styleUrls: ['./role-show.component.scss']
})
export class RoleShowComponent implements OnInit {


	public role:Role;
	public arrayRole:any;
	public functions:Array < Function > = new Array < Function > ();
    public message:string;
	public failedConect:string;
	  
	
	
	displayedColumnsR: string[] = ['name', 'description','status'];
	dataSourceR: MatTableDataSource<Role>;
	

	displayedColumns: string[] = ['title','entity','action','url'];
	dataSource: MatTableDataSource<Function>; 

	@ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
	

	constructor
	(
		private _roleService: RoleService,
		private _route: ActivatedRoute,
		private _router: Router,
		private snackBar: SnackBarService,
		private _location: Location,
    )
    {

    }

	ngOnInit()
	{
		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getRole(id);
			}
		);
	}


	getRole(id)
	{
		this._roleService.getOne(id).subscribe
		(
			response =>
			{
				if (response.status==true)
        {
          this.role = response.role;
          this.arrayRole = [];
          this.arrayRole.push(this.role);
		  console.log(this.role)
		 this.functions = response.role.functions;
			

          if(this.functions.length>0)
					{
						console.log(this.functions);
						this.table();
					}
					else
					{
						this.functions = [];
						console.log(this.functions);
						this.table();
					}

				}
				else
		        {
		          console.log(response);
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
		this.dataSource = new MatTableDataSource(this.functions);
		this.dataSourceR = new MatTableDataSource(this.arrayRole);
	 
	this.dataSource.paginator = this.paginator;
	  this.dataSource.sort = this.sort;
	}

	goBack(){
		this._location.back();
	  }

}
