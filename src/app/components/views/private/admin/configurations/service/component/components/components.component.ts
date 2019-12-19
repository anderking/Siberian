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
import { Componentt } from '../../../../../../../../models/componentt';
import { ComponentService } from '../../../../../../../../core/services/admin/component.service';


@Component({
  selector: 'sib-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})

export class ComponentsComponent implements OnInit {

  public components:Array < Componentt > = new Array < Componentt > ();
  public message:string;
  public failedConect:string;

  displayedColumns: string[] = ['id','name','description','serviceDetails','status','edit','delete'];
  dataSource: MatTableDataSource <Componentt>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _componentService: ComponentService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) { 
    
  }

  ngOnInit() {
    this.getComponents();
  }

  getComponents()
  {
    this._componentService.All().subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.components = response.components;
          console.log(this.components);
          this.table();
        }
        else
        {
          this.components = [];
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
    this.components = this.snackBar.orderByDateAsc(this.components);
    this.dataSource = new MatTableDataSource(this.components);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

	onDelete(id)
  {
    this.dialogService.openConfirmDialog('¿Estás seguro de eliminar este componente?').afterClosed().subscribe
    (
      response =>
      {
        if (response==true)
        {
          this.deleteComponent(id);
        }else
        {
          console.log(response);
        }
      }
      );
  }

  deleteComponent(id)
  {
    this._componentService.deleteOne(id).subscribe
    (
      response =>
      {
        console.log(response);
        this.message = response.message.text;
        this.snackBar.openSnackBarSuccess(this.message);
        this.getComponents();
      },
      error =>
      {
        console.log(<any>error);
      }
      )
  }
}

