import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global';
import {Componentt } from '../../../../../../../../models/componentt';
import { ComponentService } from '../../../../../../../../core/services/admin/component.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'sib-component-show',
  templateUrl: './component-show.component.html',
  styleUrls: ['./component-show.component.scss']
})
export class ComponentShowComponent implements OnInit {

  public component:Componentt;
  public arrayComponent:any;
  public message:string;
  public failedConect:string;

  displayedColumns: string[] = ['name','description','status','serviceDetails'];
  dataSourceC: MatTableDataSource<Componentt>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _componentService: ComponentService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _location: Location,
    private snackBar: SnackBarService
  ) { }

  ngOnInit() {
    this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getComponents(id);
			}
		);
  }

  getComponents(id)
	{
		this._componentService.getOne(id).subscribe
		(
			response =>
			{
			this.component = response.component;
			this.arrayComponent = [];
			this.arrayComponent.push(this.component);
			console.log(this.arrayComponent);

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
		this.dataSourceC = new MatTableDataSource(this.arrayComponent);

	}


	goBack(){
		this._location.back();
	  }
}
