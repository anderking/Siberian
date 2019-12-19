import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global';
import { Subcategory } from 'src/app/models/subcategory';
import { SubcategoryService } from 'src/app/core/services/admin/subcategory.service';
import { Equipinfras } from 'src/app/models/equipinfras';
import { EquipinfrasService } from 'src/app/core/services/admin/equipinfras.service';
import { Promotion } from 'src/app/models/promotion';
import { PromotionService } from 'src/app/core/services/admin/promotion.service';

import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'sib-promotion-edit',
  templateUrl: './promotion-edit.component.html',
  styleUrls: ['./promotion-edit.component.scss']
})
export class PromotionEditComponent implements OnInit {

	public promotion:Promotion;
	public equipinfras:any;
	public subcategories:any;
	public types:any[];
	public failedConect:string;
	public message:string;

	public isType:boolean=false;
	public isSubcategory:boolean=false;
	public isEquipinfras:boolean=false;

	public minDateStart= new Date();
	public minDateEnd= new Date();


	constructor(
		private _promotionService: PromotionService,
		private _equipinfrasService: EquipinfrasService,
		private _subcategoryService: SubcategoryService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _location: Location,
		private snackBar: SnackBarService
		) 
	{
		this.types =
		[
		{id:"target",name:"Específico"},
		{id:"generic",name:"Genérico"},
		];
	}

	ngOnInit() {
		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getPromotion(id);
			}
			);
		this.getSubcategories();
		this.getEquipinfras();

	}

	getSubcategories()
	{
		this._subcategoryService.All().subscribe
		(
			response =>
			{
				this.subcategories = response.subcategories;
				console.log(this.subcategories);
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

	getEquipinfras()
	{
		this._equipinfrasService.All().subscribe
		(
			response =>
			{
				this.equipinfras = response.equipinfras;
				console.log(this.equipinfras);
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

	getPromotion(id)
	{
		this._promotionService.getOne(id).subscribe
		(
			response =>
			{
				this.promotion = response.promotions;
				
				if(this.promotion.type=="target")
				{
					this.isEquipinfras = true;
					this.isSubcategory = false;
				}

				if(this.promotion.type=="generic")
				{
					this.isSubcategory = true;
					this.isEquipinfras = false;

				}
				console.log(this.promotion);
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

	changeType(event)
	{
		if(event=="generic")
		{
			this.isSubcategory=true;
			this.isEquipinfras=false;
		}

		if(event=="target")
		{
			this.isEquipinfras=true;
			this.isSubcategory=false;
		}
		console.log(this.isSubcategory,this.isEquipinfras);
	}

	update(form: NgForm)
	{
		if(form.valid)
		{
			this._promotionService.update(this.promotion).subscribe
			(
				response =>
				{
					if(response.status==true)
					{
						this.message  = response.message.text;
						this.snackBar.openSnackBar(this.message,'');
						this.getPromotion(this.promotion.id);
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
	goBack()
	{
		this._location.back();
	}
}

