import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global'
import { ServiceDetail } from 'src/app/models/serviceDetail';
import { ServiceDetailService } from 'src/app/core/services/admin/serviceDetail.service';
import { PolicyService } from 'src/app/core/services/admin/policy.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'sib-add-politic',
  templateUrl: './add-politic.component.html',
  styleUrls: ['./add-politic.component.scss']
})
export class AddPoliticComponent implements OnInit
{

  public serviceDetail: ServiceDetail;
  public policies: any;
  public policiesSelected:any;
  public total:number;
  public message: string;
  public failedConect: string;

  constructor
  (
    private _policyService: PolicyService,
    private _serviceDetailService: ServiceDetailService,
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
        this.getServiceDetail(id);
      }
      );
    this.getPolicies();
  }

  getPolicies()
  {
    this._policyService.All().subscribe
    (
      response =>
      {
        if (response.status == true)
        {
          this.policies = response.policies;
          console.log(this.policies);
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

  getServiceDetail(id)
  {
    this._serviceDetailService.getOne(id).subscribe
    (
      response =>
      {
        this.serviceDetail = response.serviceDetail;

        if(this.serviceDetail.policies)
        {
          this.policiesSelected = [];
          for(let policy of this.serviceDetail.policies)
          {
            this.policiesSelected.push(policy.id);
          }
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

  update(form: NgForm)
  {

    if(form.valid)
    {
      this._serviceDetailService.addPolicy(this.serviceDetail.id,form.value.policies).subscribe
      (
        response =>
        {
          if(response.status==true)
          {
            console.log(response);
            this.message  = response.message.text;
            this.messageSnackBar(this.message);
            this.getServiceDetail(this.serviceDetail.id);
          }
          else
          {
            console.log(response);
            this.message  = response.message.text;
            this.messageSnackBar(this.message);
            this.getServiceDetail(this.serviceDetail.id);
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
