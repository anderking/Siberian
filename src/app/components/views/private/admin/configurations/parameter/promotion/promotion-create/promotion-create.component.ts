import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global';
import { Promotion } from 'src/app/models/promotion';
import { SubcategoryService } from 'src/app/core/services/admin/subcategory.service';
import { EquipinfrasService } from 'src/app/core/services/admin/equipinfras.service';
import { PromotionService } from 'src/app/core/services/admin/promotion.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker'


@Component({
  selector: 'sib-promotion-create',
  templateUrl: './promotion-create.component.html',
  styleUrls: ['./promotion-create.component.scss']
})
export class PromotionCreateComponent implements OnInit
{

	public promotion:Promotion;
	public subcategories: any;
	public equipinfras:any;

	public EquipinfrasId:string;
	public SubcategoryId:string;

	public types:any[];
	public typeSelected:string="";

	public total:Number;

	public failedConect:string;
	public message:string;

	public IdEquipinfras:any;
	public subcategoriesSelected:any;
	public equipinfrassSelected:any;
	public subcategorySelected:string = "";
	public equipinfrasSelected:string = "";

	public subcategory:any;
	public equipinfrasOne:any;

	public isType:boolean=false;
	public isSubcategory:boolean=false;
	public isEquipinfras:boolean=false;

	public minDateStart= new Date();
	public minDateEnd= new Date();



	constructor
	(
		private _promotionService: PromotionService,
		private _subcategoryService: SubcategoryService,
		private _equipinfrasService: EquipinfrasService,
		private _router: Router,
		private _location: Location,
		private snackBar: SnackBarService
		) 
	{
		this.promotion = new Promotion();
		
		this.types =
		[
			{id:"target",name:"Específico"},
			{id:"generic",name:"Genérico"},
		];
	}

	ngOnInit()
	{
		this.getEquipinfrass();
		this.getSubcategories();
	}


	getSubcategories()
	{
		this._subcategoryService.All().subscribe
		(
			response =>
			{
				if (response.status==true)
				{
					this.subcategories = response.subcategories;
					this.SubcategoryId = "";
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

	getEquipinfrass()
	{
		this._equipinfrasService.All().subscribe
		(
			response =>
			{
				if (response.status==true)
				{
					this.equipinfras = response.equipinfras;
					this.EquipinfrasId = "";
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
		this._subcategoryService.getOne(id).subscribe
		(
			response =>
			{
				this.subcategory = response.subcategory;
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

	getEquipinfras(id)
	{
		this._equipinfrasService.getOne(id).subscribe
		(
			response =>
			{
				this.equipinfrasOne = response.equipinfras;
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
			this.equipinfrasSelected = "";
		}

		if(event=="target")
		{
			this.isEquipinfras=true;
			this.isSubcategory=false;
			this.subcategorySelected = "";
		}
		console.log(this.isSubcategory,this.isEquipinfras);
	}


	register(form: NgForm)
	{
		if(form.valid)
		{
			this.promotion.name = form.value.name;
			this.promotion.description = form.value.description;
			this.promotion.percentDiscount= form.value.percentDiscount;
			this.promotion.type = form.value.type;
			this.promotion.EquipinfraId=form.value.EquipinfraId;
			this.promotion.SubcategoryId=form.value.SubcategoryId;
			this.promotion.dateStart = form.value.dateStart;
			this.promotion.dateEnd = form.value.dateEnd;

			this._promotionService.create(this.promotion).subscribe
			(
				response =>
				{
					if (response.status==true)
					{
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

						console.log(error);

					}
				}
				);
		}
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
