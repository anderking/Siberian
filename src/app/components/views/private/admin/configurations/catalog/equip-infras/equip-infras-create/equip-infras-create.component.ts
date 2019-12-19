import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global';
import { Equipinfras } from '../../../../../../../../models/equipinfras';
import { EquipinfrasService } from '../../../../../../../../core/services/admin/equipinfras.service';
import { Subcategory } from '../../../../../../../../models/subcategory';
import { SubcategoryService } from '../../../../../../../../core/services/admin/subcategory.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';

@Component({
	selector: 'sib-equip-infras-create',
	templateUrl: './equip-infras-create.component.html',
	styleUrls: ['./equip-infras-create.component.scss']
})
export class EquipInfrasCreateComponent implements OnInit {

	public equipinfras:Equipinfras;
	public subcategories:Subcategory;
	public SubcategoryId:string;
	public types:any[];
	public typeSelected:string="";
	public total:Number;
	public failedConect:string;

	public auxImgString: string;
	public auxImg: any;

	public message:string;

	constructor(

		private _equipinfrasService: EquipinfrasService,
		private _subcategoryService: SubcategoryService,
		private _router: Router,
		private _location: Location,
		private snackBar: SnackBarService
		) 
	{ 
		this.types=
		[
			{id:"E",name:"Equipo"},
			{id:"I",name:"Infraestructura"},
		];

		this.equipinfras = new Equipinfras();
		console.log(this.equipinfras);
	}

	ngOnInit()
	{
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
					console.log(this.subcategories);
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

	register(form: NgForm)
	{
		if(form.valid)
		{
			this.equipinfras.name = form.value.name;
			this.equipinfras.description = form.value.description;
			this.equipinfras.type = form.value.type;
			this.equipinfras.SubcategoryId= form.value.SubcategoryId;

			this.auxImgString = form.value.image_url;
			this.auxImg = this.auxImgString.substr(12);
			console.log('split');
			console.log(this.auxImg);

			this.equipinfras.image_url = form.value.image_url;

			console.log(this.equipinfras);

			this._equipinfrasService.create(this.equipinfras).subscribe
			(
				response =>
				{
					if (response.status==true)
					{
						console.log(response.equipinfras);
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
