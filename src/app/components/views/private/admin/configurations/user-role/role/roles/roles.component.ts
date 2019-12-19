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
import { Role } from '../../../../../../../../models/role';
import { RoleService } from '../../../../../../../../core/services/admin/role.service';

@Component({
  selector: 'sib-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  public roles:Array < Role > = new Array < Role > ();
  public role:any;
  public message:string;
  public failedConect:string;

  displayedColumns: string[] = ['id', 'name', 'description','status','edit','delete'];
  dataSource: MatTableDataSource<Role>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor
  (
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _roleService: RoleService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  )
  {

  }

  ngOnInit()
  {
    this.getRoles();
  }

  getRoles()
  {
    this._roleService.All().subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.roles = response.roles;
          console.log(this.roles);
          this.table();
        }
        else
        {
          this.roles = [];
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
    this.roles = this.snackBar.orderByDateAsc(this.roles);
    this.dataSource = new MatTableDataSource(this.roles);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onDelete(id)
  {
    this.dialogService.openConfirmDialog('¿Estás seguro de eliminar este rol?').afterClosed().subscribe
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
    this._roleService.deleteOne(id).subscribe
    (
      response =>
      {
        console.log(response);
        this.message = response.message.text;
        this.snackBar.openSnackBarSuccess(this.message);
        this.getRoles();
      },
      error =>
      {
        console.log(<any>error);
      }
      )
  }

}

