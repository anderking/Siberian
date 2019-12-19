import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../core/services/global';
import { CatalogueService } from '../../../../../../core/services/client/catalogue.service';


@Component({
  selector: 'sib-variety-details',
  templateUrl: './variety-details.component.html',
  styleUrls: ['./variety-details.component.scss']
})
export class VarietyDetailsComponent implements OnInit {

	public equipinfras:any;
	public varietys:any;
	public variety:any;
	public varietyDetails:any;
	public IdEquipinfras:string;
	public IdVariety:Number;
	public categoryName:string;
	public message:string;
	public failedConect:string;
	public filterVarietiesDetail:any = "";


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
				this.IdEquipinfras= localStorage.getItem('IdEquipinfras');
				this.categoryName= localStorage.getItem('categoryName');;
				this.IdVariety = parseInt(id);
				this.getEquipinfras(this.IdEquipinfras);
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
					this.equipinfras = response.equipinfras;
					console.log(this.equipinfras);
					this.varietys = response.equipinfras.varieties;
					for (var i=0; i<this.varietys.length; i++)
					{
						if( this.varietys[i].id == this.IdVariety)
						{
							this.variety = response.equipinfras.varieties[i];
						}
					}
					this.varietyDetails = this.variety.varietyDetails;
					
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

    SetIdVarietyDetail(id){
    	localStorage.setItem('IdVarietyDetail',id);
    }

}
