import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global';
import { SubcategoryService } from 'src/app//core/services/admin/subcategory.service';

@Component({
	selector: 'sib-equipsinfras',
	templateUrl: './equipsinfras.component.html',
	styleUrls: ['./equipsinfras.component.scss']
})
export class EquipsinfrasComponent implements OnInit {

	public equipsinfras:any;
	public varieties:any;
	public subcategory:any;
	public category:any;
	public total:number;
	public message:string;
	public failedConect:string;
	public filterEquipsinfras:any = "";

	constructor
	(
    	private _subcategoryService: SubcategoryService,
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
				this.getSubcategory(id);
			}
		);
	}


	getSubcategory(id)
	{
		this._subcategoryService.getOne(id).subscribe
		(
			response =>
			{
				if (response.status==true)
				{
					this.subcategory = response.subcategory;
					this.category = response.subcategory.category;
					this.equipsinfras = response.subcategory.equipinfras;
					console.log(this.subcategory);
				}
				else
				{
					this.total=0;
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

    SetIdEquipinfras(id){
    	localStorage.setItem('IdEquipinfras',id);
    }

}
