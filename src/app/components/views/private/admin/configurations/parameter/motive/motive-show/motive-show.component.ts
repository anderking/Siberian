import { Component, OnInit, ViewChild } from '@angular/core';

import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/core/services/dialog.service';
import { MatPaginator } from '@angular/material/paginator';

import { Motive } from 'src/app/models/motive';
import { MotiveService } from 'src/app/core/services/admin/motive.service';

@Component({
  selector: 'sib-motive-show',
  templateUrl: './motive-show.component.html',
  styleUrls: ['./motive-show.component.scss']
})
export class MotiveShowComponent implements OnInit {

	public motive:Motive;
	public arrayMotive:any;
	public message:string;
  	public failedConect:string;

  	displayedColumns: string[] = ['name','description','status'];
	dataSource: MatTableDataSource<Motive>;

	@ViewChild(MatPaginator) paginator: MatPaginator;


	constructor
	(
		private _motiveService: MotiveService,
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
				this.getMotive(id);
			}
		);
	}

	getMotive(id)
	{
		this._motiveService.getOne(id).subscribe
		(
			response =>
			{
				this.motive = response.motive;
				this.arrayMotive = [];
				this.arrayMotive.push(this.motive);
				console.log(this.arrayMotive);
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
		this.dataSource = new MatTableDataSource(this.arrayMotive);
		this.dataSource.paginator = this.paginator;
	}

	goBack()
	{
		this._location.back();
	}

}

