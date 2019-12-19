import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global';
import { ServiceDetail } from 'src/app/models/serviceDetail';
import { ServiceDetailService } from 'src/app/core/services/admin/serviceDetail.service';

import { Activity } from 'src/app/models/activity';
import { Policy } from 'src/app/models/policy';
import { Resource } from 'src/app/models/resource';
import { Skill } from 'src/app/models/skill';

import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { DialogService } from 'src/app/core/services/dialog.service';


@Component({
	selector: 'sib-service-detail-show',
	templateUrl: './service-detail-show.component.html',
	styleUrls: ['./service-detail-show.component.scss']
})
export class ServiceDetailShowComponent implements OnInit {

	public serviceDetail: ServiceDetail;
	public arrayServiceDetail:any;
	public activities: Array<Activity> = new Array<Activity>();
	public policies: Array<Policy> = new Array<Policy>();
	public resources: Array<Resource> = new Array<Resource>();
	public skills: Array<Skill> = new Array<Skill>();

	public message: string;
	public failedConect: string;

	displayedColumnsA: string[] = ['name', 'description', 'estimatedTime','difficultyDegree','status'];
	dataSourceA: MatTableDataSource<Activity>;

	displayedColumnsP: string[] = ['name', 'description', 'actionPlan', 'status'];
	dataSourceP: MatTableDataSource<Policy>;

	displayedColumnsR: string[] = ['name', 'description', 'resourceType','measureUnit','price','status'];
	dataSourceR: MatTableDataSource<Resource>;

	displayedColumnsS: string[] = ['name', 'description', 'status'];
	dataSourceS: MatTableDataSource<Skill>;

	displayedColumns: string[] = ['name', 'estimatedPrice', 'estimatedWarrantyTime','note','serviceType','ComponentId','status'];
	dataSource: MatTableDataSource<ServiceDetail>;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(
		private _serviceDetailService: ServiceDetailService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _location: Location,
		private snackBar: SnackBarService
	) { }

	ngOnInit() {
		this._route.params.subscribe
			(
				params => {
					let id = params.id;
					this.getServiceDetails(id);
				}
			);
	}

	getServiceDetails(id) {
		this._serviceDetailService.getOne(id).subscribe
			(
				response => {
					if (response.status==true)
				{
					this.serviceDetail = response.serviceDetail;

					this.arrayServiceDetail = [];
					this.arrayServiceDetail.push(this.serviceDetail);
					console.log(this.arrayServiceDetail);
					
					this.activities = response.serviceDetail.activities;
                    this.policies = response.serviceDetail.policies;
					this.resources = response.serviceDetail.resources;
					this.skills = response.serviceDetail.skills;

					if(this.activities.length>0)
					{
						console.log(this.activities);
						this.table();
					}
					else
					{
						this.activities = [];
						console.log(this.activities);
						this.table();
					}
				 
					if(this.policies.length>0)
					{
						console.log(this.policies);
						this.table();
					}
					else
					{
						this.policies = [];
						console.log(this.policies);
						this.table();
					}

					if(this.resources.length>0)
					{
						console.log(this.resources);
						this.table();
					}
					else
					{
						this.resources = [];
						console.log(this.resources);
						this.table();
					}

					if(this.skills.length>0)
					{
						console.log(this.skills);
						this.table();
					}
					else
					{
						this.skills = [];
						console.log(this.skills);
						this.table();
					}

				}
				else
		        {
		          console.log(response);
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
		this.dataSource = new MatTableDataSource(this.arrayServiceDetail);
		this.activities = this.snackBar.orderByDateAsc(this.activities);
		this.dataSourceA = new MatTableDataSource(this.activities);
		this.policies = this.snackBar.orderByDateAsc(this.policies);
		this.dataSourceP = new MatTableDataSource(this.policies);
		this.resources = this.snackBar.orderByDateAsc(this.resources);
		this.dataSourceR = new MatTableDataSource(this.resources);
		this.skills = this.snackBar.orderByDateAsc(this.skills);
		this.dataSourceS = new MatTableDataSource(this.skills);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	


	goBack() {
		this._location.back();
	}
}
