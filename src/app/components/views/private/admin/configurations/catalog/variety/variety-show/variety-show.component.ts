import { Component, OnInit,ViewChild  } from '@angular/core';
import {NgForm} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/core/services/dialog.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Global } from '../../../../../../../../core/services/global';
import { Variety } from '../../../../../../../../models/variety';
import { VarietyService } from '../../../../../../../../core/services/admin/variety.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';


@Component({
  selector: 'sib-variety-show',
  templateUrl: './variety-show.component.html',
  styleUrls: ['./variety-show.component.scss']
})
export class VarietyShowComponent implements OnInit {

  public variety:Variety;
  public arrayVariety:any;
	public message:string;
  public failedConect:string;


  displayedColumns: string[] = ['name','description','status'];
  dataSource: MatTableDataSource<Variety>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private _varietyService: VarietyService,
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
				this.getVariety(id);
			}
		);
  }

  getVariety(id)
	{
		this._varietyService.getOne(id).subscribe
		(
			response =>
			{
				
					this.variety = response.variety;

					this.arrayVariety = [];
					this.arrayVariety.push(this.variety);
					console.log(this.arrayVariety);
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
		this.dataSource = new MatTableDataSource(this.arrayVariety);
		
		this.dataSource.paginator = this.paginator;
	}

	goBack(){
		this._location.back();
	  }
}

