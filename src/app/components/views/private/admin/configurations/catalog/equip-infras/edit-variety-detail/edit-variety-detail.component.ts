import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global'
import { VarietyDetail } from 'src/app/models/varietyDetail';
import { VarietyDetailService } from 'src/app/core/services/admin/varietyDetail.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
	selector: 'sib-edit-variety-detail',
	templateUrl: './edit-variety-detail.component.html',
	styleUrls: ['./edit-variety-detail.component.scss']
})
export class EditVarietyDetailComponent implements OnInit {


	public varietyDetail:VarietyDetail;
	public message:string;
	public failedConect:string;

	constructor(
		private _varietyDetailService: VarietyDetailService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _location: Location,
		private snackBar: SnackBarService
		) 

	{ 

	}

	ngOnInit() {

		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getVarietyDetail(id);
			}
			);
	}

	getVarietyDetail(id)
	{
		this._varietyDetailService.getOne(id).subscribe
		(
			response =>
			{
				this.varietyDetail = response.varietyDetail;
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
		if(form.valid)
		{
			this._varietyDetailService.update(this.varietyDetail).subscribe
			(
				response =>
				{
					if(response.status==true)
					{
						this.message  = response.message.text;
						this.snackBar.openSnackBar(this.message,'');
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
