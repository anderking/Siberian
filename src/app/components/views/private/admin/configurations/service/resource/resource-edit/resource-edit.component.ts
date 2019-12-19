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
  selector: 'sib-resource-edit',
  templateUrl: './resource-edit.component.html',
  styleUrls: ['./resource-edit.component.scss']
})
export class ResourceEditComponent implements OnInit {

	public resource:Resource;
	public resourceTypes:any[];
	public measureUnits:any[];

	public message:string;
  	public failedConect:string;

	constructor
	(
		private _resourceService: ResourceService,
		private _route: ActivatedRoute,
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
    }

	ngOnInit()
	{
		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getResource(id);
			}
		);
	}

	getResource(id)
	{
		this._resourceService.getOne(id).subscribe
		(
			response =>
			{
				this.resource = response.resource;
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
		if(form.valid)
		{
			this._resourceService.update(this.resource).subscribe
			(
				response =>
				{
					if(response.status==true)
					{
						this.message  = response.message.text;
						this.snackBar.openSnackBar(this.message,'');
					}
					else
					{
						this.message  = response.message.text;
						this.snackBar.openSnackBar(this.message,'');
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
