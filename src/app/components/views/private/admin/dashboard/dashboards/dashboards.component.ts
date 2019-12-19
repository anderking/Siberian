import { Component, OnInit } from '@angular/core';

import { DialogService } from '../../../../../../core/services/dialog.service';
import { SnackBarService } from '../../../../../../core/services/snack-bar.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../core/services/global';

import { Company } from '../../../../../../models/company';
import { CompanyService } from '../../../../../../core/services/admin/company.service';

@Component({
  selector: 'sib-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {
    public company: any;
    public total:number;
    public message: string;
    public failedConect: string;

  constructor(
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _companyService: CompanyService,
    private _route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit() {
    this.getCompany();
  }

  getCompany() {
      this._companyService.All().subscribe
      (
        response => {
          if (response.status==true)
          {
            this.company = response.company;
            if(this.company)
            {
              this.total = 1;
            }
          }
          else
          {
            this.total = 0;
            this.message = response.message.text;
            console.log(this.message);
          }
        },
        error => {
          console.log(<any>error);
          if (error instanceof HttpErrorResponse) {
            if (error.status === 0) {
              this.failedConect = Global.failed;
            }
          }
        }
        )
  }

}
