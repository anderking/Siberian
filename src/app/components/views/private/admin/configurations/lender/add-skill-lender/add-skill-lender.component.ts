import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global'
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/core/services/admin/user.service';
import { SkillService } from 'src/app/core/services/admin/skill.service';

@Component({
  selector: 'sib-add-skill-lender',
  templateUrl: './add-skill-lender.component.html',
  styleUrls: ['./add-skill-lender.component.scss']
})
export class AddSkillLenderComponent implements OnInit {

	public lender:any;
	public skills: any;
	public skillsSelected:any;
	public total:number;
	public message: string;
	public failedConect: string;

	constructor
	(
		private _userService: UserService,
		private _skillService: SkillService,
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
				this.getOneLender(id);
			}
			);
		this.getskills();
	}

	getOneLender(id)
	{
		this._userService.getOneLender(id).subscribe
		(
			response =>
			{
				this.lender = response.lender;

				if(this.lender.skills)
				{
					this.skillsSelected = [];
					for(let skill of this.lender.skills)
					{
						this.skillsSelected.push(skill.id);
					}
				}

				console.log(this.lender);
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

	getskills()
	{
		this._skillService.All().subscribe
		(
			response =>
			{
				if (response.status == true)
				{
					this.skills = response.skills;
					console.log(this.skills);
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
				if (error instanceof HttpErrorResponse)
				{
					if (error.status === 0)
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
			this._userService.setSkillLender(this.lender.id,form.value.skills).subscribe
			(
				response =>
				{
					if(response.status==true)
					{
						console.log(response);
						this.message  = response.message.text;
						this.messageSnackBar(this.message);
						this.getOneLender(this.lender.id);
					}
					else
					{
						console.log(response);
						this.message  = response.message.text;
						this.messageSnackBar(this.message);
						this.getOneLender(this.lender.id);
					}
				},
				error =>
				{
					console.log(error);
					this.message  = error.error.message;
					this.snackBar.openSnackBar(this.message,'');
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
