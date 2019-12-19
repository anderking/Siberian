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
import { Activity } from '../../../../../../../../models/activity';
import { ActivityService } from '../../../../../../../../core/services/admin/activity.service';

@Component({
  selector: 'sib-activitys',
  templateUrl: './activitys.component.html',
  styleUrls: ['./activitys.component.scss']
})
export class ActivitysComponent implements OnInit {

  public activities:Array < Activity> = new Array < Activity > ();
  public message:string;
  public failedConect:string;

  displayedColumns: string[] = ['id', 'name', 'description', 'estimatedTime', 'difficultyDegree','status','edit','delete'];
  dataSource: MatTableDataSource <Activity>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _activityService: ActivityService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) 
  {
   }

  ngOnInit() {
    this.getActivities();
  }

  getActivities()
  {
    this._activityService.All().subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.activities = response.activities;
          console.log(this.activities);
          this.table();
        }
        else
        {
          this.activities = [];
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
    this.activities = this.snackBar.orderByDateAsc(this.activities);
    this.dataSource = new MatTableDataSource(this.activities);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

	onDelete(id)
  {
    this.dialogService.openConfirmDialog('¿Estás seguro de eliminar esta actividad?').afterClosed().subscribe
    (
      response =>
      {
        if (response==true)
        {
          this.deleteActivity(id);
        }else
        {
          console.log(response);
        }
      }
      );
  }

  deleteActivity(id)
  {
    this._activityService.deleteOne(id).subscribe
    (
      response =>
      {
        console.log(response);
        this.message = response.message.text;
        this.snackBar.openSnackBarSuccess(this.message);
        this.getActivities();
      },
      error =>
      {
        console.log(<any>error);
      }
      )
  }
}

