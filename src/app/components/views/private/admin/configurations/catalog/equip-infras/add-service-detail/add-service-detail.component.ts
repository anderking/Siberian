import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global'

import { VarietyDetail } from 'src/app/models/varietyDetail';
import { VarietyDetailService } from 'src/app/core/services/admin/varietyDetail.service';
import { ServiceDetail } from 'src/app/models/serviceDetail';
import { ServiceDetailService } from 'src/app/core/services/admin/serviceDetail.service';

import { SnackBarService } from 'src/app/core/services/snack-bar.service';
@Component({
	selector: 'sib-add-service-detail',
	templateUrl: './add-service-detail.component.html',
	styleUrls: ['./add-service-detail.component.scss']
})
export class AddServiceDetailComponent implements OnInit {

	public varietyDetail:VarietyDetail;
	public varietyDetailId:any;
	public serviceDetailsV: any;
	public serviceDetails: any;
	public services:string;
	public total:Number;
	public message:string;
	public failedConect:string;
	public serviceDetailSelected:any;

	constructor
	(
		private _varietyDetailService: VarietyDetailService,
		private _serviceDetailService: ServiceDetailService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _location: Location,
		private snackBar: SnackBarService
		)
	{

	}

	ngOnInit()
	{

		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				console.log(id);
				this.getVarietyDetail(id);
			}
			);

		this.getServiceDetails();

	}

	getVarietyDetail(id)
	{
		this._varietyDetailService.getAllService(id).subscribe
		(
			response =>
			{
				this.varietyDetail = response.varietyDetail;
				this.varietyDetailId = this.varietyDetail.id;
				this.serviceDetailsV = this.varietyDetail.serviceDetail;

				if(this.serviceDetailsV)
				{
					this.serviceDetailSelected = [];
					for(let serviceDetailV of this.serviceDetailsV)
					{
						this.serviceDetailSelected.push(serviceDetailV.id);
					}
				}

				console.log(this.varietyDetail);

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

	getServiceDetails()
	{
		this._serviceDetailService.All().subscribe
		(
			response =>
			{

				if (response.status==true)
				{
					this.serviceDetails = response.serviceDetails;
					console.log(this.serviceDetails);
					this.services="";
				}
				else
				{
					this.total = 0;
					this.message = response.message.text;
					console.log(this.message);
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

	update(form: NgForm)
	{
		console.log(form.value.services);
		if(form.valid)
		{
			this._varietyDetailService.addService(this.varietyDetailId,form.value.services).subscribe
			(
				response =>
				{
					if(response.status==true)
					{
						this.message  = 'Servicios Añadidos Correctamente';
						this.snackBar.openSnackBar(this.message,'');
						this.getVarietyDetail(this.varietyDetailId);
					}
					else
					{
						this.message  = 'Ha ocurrido un error';
						this.snackBar.openSnackBar(this.message,'');
						this.getVarietyDetail(this.varietyDetailId);
					}
					console.log(response);
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

	goBack()
	{ 
		this._location.back(); 
	}

}
