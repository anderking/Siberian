import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global';
import { Componentt } from '../../../../../../../../models/componentt';
import { ComponentService } from '../../../../../../../../core/services/admin/component.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';


@Component({
  selector: 'sib-component-edit',
  templateUrl: './component-edit.component.html',
  styleUrls: ['./component-edit.component.scss']
})
export class ComponentEditComponent implements OnInit {

  public component:Componentt;
  public message:string;
  public failedConect:string;

  constructor(
    private _componentService: ComponentService,
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
				this.getComponent(id);
			}
		);
  }

  getComponent(id)
	{
		this._componentService.getOne(id).subscribe
		(
			response =>
			{
				this.component = response.component;
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
			this._componentService.update(this.component).subscribe
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
