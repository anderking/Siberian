import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {Location} from '@angular/common';
import { Global } from 'src/app/core/services/global';
import { ServiceDetail } from 'src/app/models/serviceDetail';
import { ServiceDetailService } from 'src/app/core/services/admin/serviceDetail.service';
import { Componentt } from 'src/app/models/componentt';
import { ComponentService } from 'src/app/core/services/admin/component.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
	selector: 'sib-service-detail-edit',
	templateUrl: './service-detail-edit.component.html',
	styleUrls: ['./service-detail-edit.component.scss']
})
export class ServiceDetailEditComponent implements OnInit
{
	public serviceDetail:ServiceDetail;
	public components:any;
	public types:any[];
	public failedConect:string;
	public message:string;

	public seriviceDetailUpdate: any =
	{
		id: Number,
	    ComponentId: Number,
	    serviceType: String,
	    name: String,
	    note: String,
	    estimatedPrice: String,
	    estimatedWarrantyTime: String,
	};


	constructor(
		private _serviceDetailService: ServiceDetailService,
		private _componentService: ComponentService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _location: Location,
		private snackBar: SnackBarService
		) 

	{
		this.types= [
		{id:"Reparación",name:"Reparación"},
		{id:"Mantenimiento",name:"Mantenimiento"},
		{id:"Construcción",name:"Construcción"},
		{id:"Otros",name:"Otros"},
		];

	}

	ngOnInit()
	{
		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getServiceDetail(id);
			}
			);
		this.getComponents();
	}

	getComponents()
	{
		this._componentService.All().subscribe
		(
			response =>
			{
				this.components = response.components;
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


	getServiceDetail(id)
	{
		this._serviceDetailService.getOne(id).subscribe
		(
			response =>
			{
				this.serviceDetail = response.serviceDetail;
				console.log(this.serviceDetail);
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

	update(form: NgForm)
	{

		console.log(this.serviceDetail);

		this.seriviceDetailUpdate.id = this.serviceDetail.id;
		this.seriviceDetailUpdate.ComponentId= form.value.ComponentId;
		this.seriviceDetailUpdate.serviceType = form.value.type;
		this.seriviceDetailUpdate.name = form.value.name;
		this.seriviceDetailUpdate.note = form.value.note;
		this.seriviceDetailUpdate.estimatedPrice = form.value.estimatedPrice;
		this.seriviceDetailUpdate.estimatedWarrantyTime = form.value.estimatedWarrantyTime;

		if(form.valid)
		{
			this._serviceDetailService.update(this.seriviceDetailUpdate).subscribe
			(
				response =>
				{
					if(response.status==true)
					{
						console.log(response);
						this.message  = response.message.text;
						this.snackBar.openSnackBar(this.message,'');
						this.getServiceDetail(this.serviceDetail.id);
					}
					else
					{
						console.log(response);
						this.message  = response.message.text;
						this.snackBar.openSnackBar(this.message,'');
						this.getServiceDetail(this.serviceDetail.id);
					}
				},
				error =>
				{
					console.log(error);
					this.message  = error.error.message;
					this.snackBar.openSnackBar(this.message,'');
				}
				);
		}else
		{
		}
		
	}
	goBack(){
		this._location.back();
	  }
}
