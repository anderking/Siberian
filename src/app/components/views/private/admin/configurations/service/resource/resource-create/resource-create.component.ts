import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global'
import { Resource } from '../../../../../../../../models/resource';
import { ResourceService } from '../../../../../../../../core/services/admin/resource.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';

@Component({
  selector: 'sib-resource-create',
  templateUrl: './resource-create.component.html',
  styleUrls: ['./resource-create.component.scss']
})
export class ResourceCreateComponent implements OnInit {

	public resource:Resource;
	public resourceTypes:any[];
	public measureUnits:any[];
	public measureUnitSelected:string="";
	public resourceTypeSelected:string="";

	public message:string;

	constructor
	(
		private _resourceService: ResourceService,
		private _router: Router,
		private _location: Location,
		private snackBar: SnackBarService
		)
	{
		this.resourceTypes= [
			{id:"Herramienta",name:"Herramienta"},
			{id:"Equipo",name:"Equipo"},
			{id:"Material",name:"Material"},
			{id:"Humano",name:"Humano"},
		];

		this.measureUnits= [
			{id:"Unidades",name:"Unidades"},
			{id:"Kilogramos",name:"Kilogramos"},
			{id:"Litros",name:"Litros"},
			{id:"Metros",name:"Metros"},
		];

		this.resource = new Resource();
		console.log(this.resource);
	}

	ngOnInit()
	{

	}

	register(form: NgForm)
	{
		if(form.valid)
		{
			this.resource.name = form.value.name;
			this.resource.description = form.value.description;
			this.resource.resourceType = form.value.resourceType;
			this.resource.price = form.value.price;
			this.resource.measureUnit = form.value.measureUnit;

			console.log(this.resource);

			this._resourceService.create(this.resource).subscribe
			(
				response =>
				{
					if (response.status==true)
					{
						console.log(response.resource);
						this.message = response.message.text;
						form.reset();
						this.messageSnackBar(this.message); 
					}
					else
					{
						console.log(response);
						this.message = response.message.text;
						this.messageSnackBar(this.message);
					}
				},
				error =>
				{
					console.log(error);

					if(error instanceof HttpErrorResponse)
					{
						if(error.status===404)
						{
							this.message = error.error.message;
							console.log(error);
							this.messageSnackBar(this.message);
						}
					}else
					{
						//this.message = error.error.message;
						console.log(error);
						//this.messageSnackBar(this.message);
					}
				}
				);
		}else
		{
		}
	}

	messageSnackBar(message)
	{
		this.snackBar.openSnackBarSuccess(message);
	}
	goBack(){
		this._location.back();
	  }
}
