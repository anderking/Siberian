import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../core/services/global'
import { User } from '../../../../../../models/user';
import { UserService } from '../../../../../../core/services/admin/user.service';
import { SnackBarService } from '../../../../../../core/services/snack-bar.service';
import { Location } from '@angular/common';

@Component({
  selector: 'sib-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

	public user: any;
	public dniTypes:any[];
	public updateUser:any;
	public failedConect:string;
	public message:string;

	constructor
	(
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router: Router,
		private snackBar: SnackBarService,
		private _location: Location,
	)
	{
		this.dniTypes= [
	      {id:"v",name:"Venezolano"},
	      {id:"e",name:"Extranjero"},
	      {id:"j",name:"Jurídico"},
	    ];
	}

	ngOnInit()
	{
		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getUser(id);
			}
		);
	}

	getUser(id)
	{
		this._userService.getOne(id).subscribe
		(
			response =>
			{
				this.user = response;
				this.user = this.user.user;
				console.log(this.user);
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
			console.log(this.user);
			this._userService.update(this.user).subscribe
			(
				response =>
				{
					if(response.status==true)
					{
						this.updateUser = response.user;
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
