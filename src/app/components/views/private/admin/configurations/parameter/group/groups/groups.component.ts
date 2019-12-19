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
import { Group } from '../../../../../../../../models/group';
import { GroupService } from '../../../../../../../../core/services/admin/group.service';

@Component({
  selector: 'sib-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  public groups:Array < Group> = new Array < Group > ();
  public message:string;
  public failedConect:string;

  displayedColumns: string[] = ['id', 'name', 'description', 'parameters', 'status','edit','delete'];
  dataSource: MatTableDataSource <Group>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _groupService: GroupService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) 
  {
   }

  ngOnInit() {
    this.getGroups();
  }

  getGroups()
  {
    this._groupService.All().subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.groups = response.groups;
          console.log(this.groups);
          this.table();
        }
        else
        {
          this.groups = [];
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
    this.groups = this.snackBar.orderByDateAsc(this.groups);
    this.dataSource = new MatTableDataSource(this.groups);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

	onDelete(id)
  {
    this.dialogService.openConfirmDialog('¿Estás seguro de eliminar este grupo?').afterClosed().subscribe
    (
      response =>
      {
        if (response==true)
        {
          this.deleteGroup(id);
        }else
        {
          console.log(response);
        }
      }
      );
  }

  deleteGroup(id)
  {
    this._groupService.deleteOne(id).subscribe
    (
      response =>
      {
        console.log(response);
        this.message = response.message.text;
        this.snackBar.openSnackBarSuccess(this.message);
        this.getGroups();
      },
      error =>
      {
        console.log(<any>error);
      }
      )
  }
}
