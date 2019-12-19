import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global'
import { ServiceDetail } from 'src/app/models/serviceDetail';
import { ServiceDetailService } from 'src/app/core/services/admin/serviceDetail.service';
import { ResourceService } from 'src/app/core/services/admin/resource.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'sib-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit
{
	public serviceDetail: ServiceDetail;
	public resources: any;
	public resource:any;
	public resourcesSelected:any;
	public total:number;
	public message: string;
	public failedConect: string;
	public quantityResource:any;
	public arrayQuantityAux:any;
	public arrayResourcesAux:any;

	public resourcesUpdate: any =
	{
    	id: Number,
    	quantity: Number
  	};
  	public arrayResourcesUpdate:any;

  	public arraySearchResource:any;



	public isResources:boolean=false;

	constructor
	(
		private _resourceService: ResourceService,
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
				this.getServiceDetail(id);
			}
			);
		this.getResources();
	}

	getResources()
	{
		this._resourceService.All().subscribe
		(
			response =>
			{
				if (response.status == true)
				{
					this.resources = response.resources;
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
				if (error instanceof HttpErrorResponse)
				{
					if (error.status === 0)
					{
						this.failedConect = Global.failed;
					}
				}
			}
			)
	}

	getResourcesWhere(ids)
	{
		this._resourceService.getAllWhere(ids).subscribe
		(
			response =>
			{
				if (response.status == true)
				{
					this.arraySearchResource = response.resources;
					console.log(this.arraySearchResource);
				}
				else
				{
					this.message = response.message.text;
					console.log(this.message);
				}

			},
			error => 
			{
				console.log(<any>error);
				if (error instanceof HttpErrorResponse)
				{
					if (error.status === 0)
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

				if(this.serviceDetail.resources)
				{
					this.resourcesSelected = [];
					for(let resource of this.serviceDetail.resources)
					{
						this.resourcesSelected.push(resource.id);
					}
					if(this.resourcesSelected.length>0)
					{
						this.isResources = true;
					}
					console.log(this.isResources);
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
		if(form.value.resources)
		{
			this.arrayResourcesUpdate = [];

        	this.arrayResourcesUpdate = form.value.resources.map((val)=>{  
	            return {id: val.id, quantity: val.quantity};
	        })

	        this._serviceDetailService.addResource(this.serviceDetail.id,this.arrayResourcesUpdate).subscribe
			(
				response =>
				{
					if(response.status==true)
					{
						console.log(response);
						this.message  = response.message.text;
						this.messageSnackBar(this.message);
						this.getServiceDetail(this.serviceDetail.id);
					}
					else
					{
						console.log(response);
						this.message  = response.message.text;
						this.messageSnackBar(this.message);
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
      }		
	}

	changeResources(event) 
	{
		this.isResources = true;
		this.quantityResource = event;
		this.getResourcesWhere(event);
	}

	messageSnackBar(message)
	{
		this.snackBar.openSnackBarSuccess(message);
	}

	goBack()
	{
		this._location.back();
	}

}
