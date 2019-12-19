import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/core/services/admin/company.service';

@Component({
  selector: 'sib-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit
{

  public company:any;
  public message:string;
  public failedConect:string;

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
    this.getCompanies();
  }

  getCompanies()
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

