import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../core/services/global';
import { CatalogueService } from '../../../../../../core/services/client/catalogue.service';


@Component({
  selector: 'sib-variety',
  templateUrl: './variety.component.html',
  styleUrls: ['./variety.component.scss']
})
export class VarietyComponent implements OnInit {

	public varietys:any;
	public equipinfras:any;
	public subcategory:any;
	public category:any;
	public message:string;
	public failedConect:string;
	public filterVarieties:any = "";

	constructor
	(
		private _catalogueService: CatalogueService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _location: Location
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
				this.getEquipinfras(id);
			}
		);
	}


	getEquipinfras(id)
	{
		this._catalogueService.getEquipinfras(id).subscribe
		(
			response =>
			{
				if (response.status==true)
				{
					this.varietys = response.equipinfras.varieties;
					this.equipinfras = response.equipinfras;
					this.subcategory = response.equipinfras.subcategory;
					this.getSubcategory(this.subcategory.id)
					console.log(response);
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

	getSubcategory(id)
	{
		this._catalogueService.getSubcategory(id).subscribe
		(
			response =>
			{
				if (response.status==true)
				{
					this.category = response.subcategory.category;
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

	goBack()
	{ 
		this._location.back(); 
    }

    SetIdVariety(id){
    	localStorage.setItem('IdVariety',id);
    }

}
