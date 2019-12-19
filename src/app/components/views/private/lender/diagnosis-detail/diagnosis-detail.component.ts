import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { DialogService } from 'src/app/core/services/dialog.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global';
import { Revision } from 'src/app/models/revision';
import { RevisionService } from 'src/app/core/services/client/revision.service';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.imgURL;


@Component({
  selector: 'sib-diagnosis-detail',
  templateUrl: './diagnosis-detail.component.html',
  styleUrls: ['./diagnosis-detail.component.scss']
})
export class DiagnosisDetailComponent implements OnInit
{

	public revision: any;
	public revisionId:any;
	public bitacoras:any;
	public note:any;
	public message: string;
	public failedConect: string;
	public urldelafault:string="assets/img/request/revision_3.jpg"

	constructor(
		private dialogService: DialogService,
		private snackBar: SnackBarService,
		private _revisionService: RevisionService,
		private _route: ActivatedRoute,
		private _location: Location
		) {

	}

	ngOnInit()
	{
		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.revisionId = id;
				this.getRevision(id);
			}
			);
	}

	getRevision(id) {
		this._revisionService.getOne(id).subscribe
		(
			response =>
			{
				this.revision = response.revision;
				this.bitacoras = this.revision.bitacoras;
				for (var i=0; i<this.bitacoras.length; i++)
				{
					if( this.bitacoras[i].eventType == "execution")
					{
						this.note = this.bitacoras[i].description;
					}
				}

				console.log(this.revision);
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
			});
	}

	onRejectDiagnosis(id){
		this.dialogService.openRejectedRequestDialog().afterClosed().subscribe
		(
			response =>
			{
				if(response!=false)
				{
					var motive = response.motive;
					var note = response.note;
					this.rejectDiagnosis(id,motive,note);
				}
				else
				{
					console.log(response);
				}

			}
			);
	}


	rejectDiagnosis(id,motiveId,note?)
	{
		this._revisionService.irreparable(id,motiveId,note).subscribe
		(
			response =>
			{
				console.log(response);
				this.message = response.message.text;
				this.snackBar.openSnackBarSuccess(this.message);
				this.getRevision(id);
			},
			error =>
			{
				console.log(<any>error);
			}
			)
	}

	onRegisterDiagnosis(form: NgForm)
	{
		if(form.valid)
		{
			this._revisionService.diagnose(this.revisionId,form.value.note).subscribe
			(
				response =>
				{
					if(response.status==true)
					{
						this.message  = response.message.text;
						this.snackBar.openSnackBar(this.message,'');
						this.getRevision(this.revisionId);
					}
					else
					{
						this.message  = response.message.text;
						this.snackBar.openSnackBar(this.message,'');
						this.getRevision(this.revisionId);
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
