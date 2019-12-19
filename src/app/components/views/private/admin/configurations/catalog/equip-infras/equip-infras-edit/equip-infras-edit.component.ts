import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {Location} from '@angular/common';
import { Global } from '../../../../../../../../core/services/global';
import { Subcategory } from '../../../../../../../../models/subcategory';
import { SubcategoryService } from '../../../../../../../../core/services/admin/subcategory.service';
import { Equipinfras } from '../../../../../../../../models/equipinfras';
import { EquipinfrasService } from '../../../../../../../../core/services/admin/equipinfras.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';


@Component({
	selector: 'sib-equip-infras-edit',
	templateUrl: './equip-infras-edit.component.html',
	styleUrls: ['./equip-infras-edit.component.scss']
})
export class EquipInfrasEditComponent implements OnInit {
	public equipinfras:Equipinfras;
	public subcategories:any;
	public types:any[];
	public failedConect:string;
	public message:string;

	constructor(
		private _equipinfrasService: EquipinfrasService,
		private _subcategoryService: SubcategoryService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _location: Location,
		private snackBar: SnackBarService
		) 
	{
		this.types= [
		{id:"E",name:"Equipo"},
		{id:"I",name:"Infraestructura"},
		];
	}

	ngOnInit() {
		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getEquipinfras(id);
			}
			);
		this.getSubcategories();

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


	getEquipinfras(id)
	{
		this._equipinfrasService.getOne(id).subscribe
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

	update(form: NgForm)
	{
		this.equipinfras.SubcategoryId = form.value.SubcategoryId;
		if(form.valid)
		{
			this._equipinfrasService.update(this.equipinfras).subscribe
			(
				response =>
				{
					if(response.status==true)
					{
						this.message  = response.message.text;
						this.snackBar.openSnackBar(this.message,'');
						this.getEquipinfras(this.equipinfras.id);
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
