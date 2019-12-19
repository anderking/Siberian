import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/core/services/admin/company.service';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.imgURL;

@Component({
  selector: 'sib-company-show',
  templateUrl: './company-show.component.html',
  styleUrls: ['./company-show.component.scss']
})
export class CompanyShowComponent implements OnInit
{

	public company: Company = new Company();
	public message:string;
	public failedConect:string;
	public urldelafault:string="assets/img/logo/logo_login.png"

	constructor
	(
		private _companyService: CompanyService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _location: Location
		)
	{
	}

	ngOnInit()
	{
		this.getCompany();
	}

	getCompany()
	{
		this._companyService.All().subscribe
		(
			response =>
			{
				this.company = response.company;
				console.log(this.company);
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



}
