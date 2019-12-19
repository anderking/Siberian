import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global'
import { Resource } from '../../../../../../../../models/resource';
import { ResourceService } from '../../../../../../../../core/services/admin/resource.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';


import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'sib-resource-show',
  templateUrl: './resource-show.component.html',
  styleUrls: ['./resource-show.component.scss']
})
export class ResourceShowComponent implements OnInit {

	public resource:Resource;
	public arrayResource: any;
	public message:string;
  	public failedConect:string;

	displayedColumns: string[] = ['name','description','resourceType','measureUnit','price','status','serviceDetails'];
	dataSource: MatTableDataSource<Resource>;
	
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	

	constructor
	(
		private _resourceService: ResourceService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _location: Location,
    	private snackBar: SnackBarService
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
				this.getResource(id);
			}
		);
	}

	getResource(id)
	{
		this._resourceService.getOne(id).subscribe
		(
			response =>
			{
				this.resource = response.resource;
				this.arrayResource = [];
				this.arrayResource.push(this.resource);
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

	table()
	{
		this.dataSource = new MatTableDataSource(this.arrayResource);
	}

	goBack(){
		this._location.back();
	  }

}
