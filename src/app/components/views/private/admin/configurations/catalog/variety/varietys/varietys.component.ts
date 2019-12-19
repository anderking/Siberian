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
import { Variety } from '../../../../../../../../models/variety';
import { VarietyService } from '../../../../../../../../core/services/admin/variety.service';


@Component({
  selector: 'sib-varietys',
  templateUrl: './varietys.component.html',
  styleUrls: ['./varietys.component.scss']
})
export class VarietysComponent implements OnInit {


  public varietys:Array < Variety > = new Array < Variety > ();
  public message:string;
  public failedConect:string;

  displayedColumns: string[] = ['id','name','description','equipinfras','status','edit','delete'];
  dataSource: MatTableDataSource <Variety>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  

	constructor
	(
	  private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _varietyService: VarietyService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
	)
	{
	}

	ngOnInit() {
		this.getVarietys();
	}

	getVarietys()
  {
    this._varietyService.All().subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.varietys = response.varieties;
          console.log(this.varietys);
          this.table();
        }
        else
        {
          this.varietys = [];
          console.log(response);
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

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
		  this.dataSource.paginator.firstPage();
		}
	}

	table()
  {
    this.varietys = this.snackBar.orderByDateAsc(this.varietys);
    this.dataSource = new MatTableDataSource(this.varietys);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

	onDelete(id)
  {
    this.dialogService.openConfirmDialog('¿Estás seguro de eliminar esta variedad?').afterClosed().subscribe
    (
      response =>
      {
        if (response==true)
        {
          this.deleteVariety(id);
        }else
        {
          console.log(response);
        }
      }
      );
  }

  deleteVariety(id)
  {
    this._varietyService.deleteOne(id).subscribe
    (
      response =>
      {
        console.log(response);
        this.message = response.message.text;
        this.snackBar.openSnackBarSuccess(this.message);
        this.getVarietys();
      },
      error =>
      {
        console.log(<any>error);
      }
      )
  }
}
