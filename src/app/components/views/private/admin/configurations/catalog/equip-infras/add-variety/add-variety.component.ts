import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global'
import { Equipinfras } from '../../../../../../../../models/equipinfras';
import { EquipinfrasService } from '../../../../../../../../core/services/admin/equipinfras.service';
import { VarietyService } from '../../../../../../../../core/services/admin/variety.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';

@Component({
	selector: 'sib-add-variety',
	templateUrl: './add-variety.component.html',
	styleUrls: ['./add-variety.component.scss']
})
export class AddVarietyComponent implements OnInit {

	public varieties:any;
	public equipinfras:Equipinfras;
	public VarietyId:string;
	public EquipinfraId:string;
	public total:Number;
	public message:string;
	public failedConect:string;

	constructor
	(
		private _varietyService: VarietyService,
		private _equipinfrasService: EquipinfrasService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _location: Location,
		private snackBar: SnackBarService
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
				this.EquipinfraId = id;
				this.getEquipinfras(id);
			}
			);
		this.getVarietys();
	}

	getVarietys()
	{
		this._varietyService.All().subscribe
		(
			response =>
			{
				if (response.status==true)
				{
					this.varieties = response.varieties;
					this.VarietyId="";
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


	register(form: NgForm)
	{
		if(form.valid)
		{
			this._equipinfrasService.addVariety(form.value.VarietyId,this.EquipinfraId).subscribe
			(
				response =>
				{
					if (response.status==true)
					{
						this.getEquipinfras(this.EquipinfraId);
						this.message = response.message.text;
						this.messageSnackBar(this.message); 
						form.reset();
					}
					else
					{
						console.log(response);
						this.getEquipinfras(this.EquipinfraId);
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

	onDelete(id)
	{
		this._equipinfrasService.deleteVariety(this.EquipinfraId,id).subscribe
		(
			response =>
			{
	            this.message = response.message.text;
	            this.snackBar.openSnackBarSuccess(this.message);
	            this.getEquipinfras(this.EquipinfraId);
			},
			error =>
			{
				console.log(<any>error);
			}
		)
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
