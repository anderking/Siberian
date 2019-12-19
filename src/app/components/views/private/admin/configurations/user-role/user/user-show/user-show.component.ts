import { Component, OnInit,ViewChild  } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../../../../../../../../core/services/dialog.service';
import { User } from '../../../../../../../../models/user';
import { Location } from '../../../../../../../../models/location';
import { UserService } from '../../../../../../../../core/services/admin/user.service';
import { LocationService } from '../../../../../../../../core/services/admin/location.service';
import { Phone } from '../../../../../../../../models/phone';
import { PhoneService } from '../../../../../../../../core/services/admin/phone.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';


@Component({
  selector: 'sib-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.scss']
})
export class UserShowComponent implements OnInit {


	public user:User;
	public arrayUser:any;
	public locations:Array < Location > = new Array < Location > ();
	public phones:Array < Phone > = new Array < Phone > ();
    public message:string;
	public failedConect:string;
	  
	
	
	displayedColumnsU: string[] = ['email','firstName','lastName','dni','gender','role','status'];
	dataSourceU: MatTableDataSource<User>;
	

	displayedColumnsP: string[] = ['number','phoneType'];
	dataSourceP: MatTableDataSource<Phone>; 

	displayedColumns: string[] = ['address','state','city','postalCode'];
	dataSource: MatTableDataSource<Location>; 

	@ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
	
	

	constructor
	(
		private _userService: UserService,
		public _locationService: LocationService,
		public _phoneService: PhoneService,
		private _route: ActivatedRoute,
		private _router: Router,
		private snackBar: SnackBarService,
		
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
				this.getUser(id);
				
			}
		);
	}


	

	getUser(id)
	{
		this._userService.getOne(id).subscribe
		(
			response =>
			{
				if (response.status==true)
        {
          this.user = response.user;
          this.arrayUser = [];
          this.arrayUser.push(this.user);
		  console.log(this.user)
		 this.phones = response.user.phones;
		 this.locations = response.user.locations;	

          if(this.locations.length>0)
					{
						console.log(this.locations);
						this.table();
					}
					else
					{
						this.locations = [];
						console.log(this.locations);
						this.table();
					}

		 if(this.phones.length>0)
					{
						console.log(this.phones);
						this.table();
					}
					else
					{
						this.phones = [];
						console.log(this.phones);
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
		this.dataSource = new MatTableDataSource(this.locations);
		this.dataSourceP = new MatTableDataSource(this.phones);
		this.dataSourceU = new MatTableDataSource(this.arrayUser);
		this.locations = this.snackBar.orderByDateAsc(this.locations);
		this.phones = this.snackBar.orderByDateAsc(this.phones);
	  
	  
	this.dataSource.paginator = this.paginator;
	  this.dataSource.sort = this.sort;
	}

	
}


