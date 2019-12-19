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
import { Resource } from '../../../../../../../../models/resource';
import { ResourceService } from '../../../../../../../../core/services/admin/resource.service';


@Component({
  selector: 'sib-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  
  public resources:Array < Resource > = new Array < Resource > ();
  public message:string;
  public failedConect:string;

  displayedColumns: string[] = ['id', 'name', 'description','resourceType','measureUnit','price','status','edit','delete'];
  dataSource: MatTableDataSource<Resource>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor
  (
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _resourceService: ResourceService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  )
  {

  }

  ngOnInit()
  {
    this.getResources();
  }

  getResources()
  {
    this._resourceService.All().subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.resources = response.resources;
          console.log(this.resources);
          this.table();
        }
        else
        {
          this.resources = [];
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
    this.resources = this.snackBar.orderByDateAsc(this.resources);
    this.dataSource = new MatTableDataSource(this.resources);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onDelete(id)
  {
    this.dialogService.openConfirmDialog('¿Estás seguro de eliminar este recurso?').afterClosed().subscribe
    (
      response =>
      {
        if (response==true)
        {
          this.deleteRole(id);
        }else
        {
          console.log(response);
        }
      }
      );
  }

  deleteRole(id)
  {
    this._resourceService.deleteOne(id).subscribe
    (
      response =>
      {
        console.log(response);
        this.message = response.message.text;
        this.snackBar.openSnackBarSuccess(this.message);
        this.getResources();
      },
      error =>
      {
        console.log(<any>error);
      }
      )
  }
}

