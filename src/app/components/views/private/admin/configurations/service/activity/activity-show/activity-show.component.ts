import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global';

import { Activity } from '../../../../../../../../models/activity';
import { ActivityService } from '../../../../../../../../core/services/admin/activity.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'sib-activity-show',
  templateUrl: './activity-show.component.html',
  styleUrls: ['./activity-show.component.scss']
})
export class ActivityShowComponent implements OnInit {

  public activity:Activity;
  public arrayActivity:any;
  public message:string;
  public failedConect:string;

  displayedColumnsA: string[] = ['name','description','estimatedTime','difficultyDegree'];
  dataSourceA: MatTableDataSource<Activity>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _activityService: ActivityService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _location: Location
  ) { }

  ngOnInit() {
    this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getActivity(id);
			}
		);
   
  }

  getActivity(id)
	{
		this._activityService.getOne(id).subscribe
		(
			response =>
			{
				if (response.status==true)
				{
				console.log("Que trae response: ",response)
				this.activity = response.activity;
				this.arrayActivity = [];
				this.arrayActivity.push(this.activity);
				console.log(this.arrayActivity);

				this.table();
				}
				else
				{
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


	table()
	{
		this.dataSourceA = new MatTableDataSource(this.arrayActivity);
	}

	goBack(){
		this._location.back();
	  }

}
