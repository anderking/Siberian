import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../core/services/global';
import { CatalogueService } from '../../../../../../core/services/client/catalogue.service';

@Component({
  selector: 'sib-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.scss']
})
export class SubcategoriaComponent implements OnInit {

	public subcategories:any;
	public category:any;
	public total:number;
	public message:string;
	public failedConect:string;

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
				this.getCategory(id);
			}
			);
	}

	getCategory(id)
	{
		this._catalogueService.getCategory(id).subscribe
		(
			response =>
			{
				if (response.status==true)
		        {
		        	this.category = response.category;
		        	if(response.category.subcategories.length>0)
					{
						this.subcategories = response.category.subcategories;
						console.log(this.subcategories);
					}
		        }
		        else
		        {
		          this.total =0;
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

}
