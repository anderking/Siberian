import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global'
import { Variety } from '../../../../../../../../models/variety';
import { VarietyService } from '../../../../../../../../core/services/admin/variety.service';
import { VarietyDetail } from '../../../../../../../../models/varietyDetail';
import { VarietyDetailService } from '../../../../../../../../core/services/admin/varietyDetail.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';

@Component({
	selector: 'sib-add-variety-details',
	templateUrl: './add-variety-details.component.html',
	styleUrls: ['./add-variety-details.component.scss']
})
export class AddVarietyDetailsComponent implements OnInit {

	public varietyDetail:VarietyDetail;
	public variety:Variety;
	public equipsinfras:any;
	public equipinfras:any;
	public EquipinfraId:any;
	public VarietyId:any;
	public message:string;
	public failedConect:string;

	constructor
	(
		private _varietyDetailService: VarietyDetailService,
		private _varietyService: VarietyService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _location: Location,
		private snackBar: SnackBarService
		)
	{
		this.varietyDetail = new VarietyDetail();
	}

	ngOnInit()
	{

		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.VarietyId = id;
				this.EquipinfraId= params.EquipinfraId;
				this.getVariety(id);
			}
		);

	}

	getVariety(id)
	{
		this._varietyService.getOne(id).subscribe
		(
			response =>
			{
		        this.variety = response.variety;
		        this.equipsinfras = this.variety.equipinfras;
				
				for (var i=0; i<this.equipsinfras.length; i++)
				{
					if( this.equipsinfras[i].id == this.EquipinfraId)
					{
						this.equipinfras = this.equipsinfras[i];
					}
				}

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
			this.varietyDetail.VarietyEquipinfraId = this.equipinfras.VarietyEquipinfras_id;
			this.varietyDetail.name = form.value.name;
			this.varietyDetail.description = form.value.description;

			

			console.log(this.varietyDetail);

			this._varietyDetailService.create(this.varietyDetail).subscribe
			(
				response =>
				{
					if (response.status==true)
					{
						this.getVariety(this.VarietyId);
						console.log(response);
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
		this._varietyDetailService.deleteOne(id).subscribe
		(
			response =>
			{
	            this.message = response.message.text;
	            this.snackBar.openSnackBarSuccess(this.message);
	            this.getVariety(this.VarietyId);
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
