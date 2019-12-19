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
import { ServiceDetailService } from 'src/app/core/services/admin/serviceDetail.service';
import { ServiceOrder } from 'src/app/models/serviceOrder';
import { ServiceOrderService } from 'src/app/core/services/client/serviceOrder.service';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.imgURL;

@Component({
  selector: 'sib-buget-detail',
  templateUrl: './buget-detail.component.html',
  styleUrls: ['./buget-detail.component.scss']
})
export class BugetDetailComponent implements OnInit
{

  public revision: any;
  public revisionId:any;
  public serviceOrder:ServiceOrder;
  public serviceDetails:any;
  public serviceDetailsFilter:any;
  public arrayServiceOrderDetailsCreate:any;
  public message: string;
  public failedConect: string;
  public isServiceDetail:boolean=false;
  public amountTotal:any=0;
  public urldelafault:string="assets/img/request/revision_3.jpg";
  public totalResoucesSelected:number=0;
  public arrayAux: any;

  constructor(
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _revisionService: RevisionService,
    public _serviceDetailService: ServiceDetailService,
    private _serviceOrderService: ServiceOrderService,
    private _route: ActivatedRoute,
    private _location: Location
    ) {

    this.serviceOrder = new ServiceOrder();

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
    this.getServiceDetails();
    console.log(this.isServiceDetail);
  }

  getServiceDetails()
  {
    this._serviceDetailService.All().subscribe
    (
      response =>
      {
        this.serviceDetails = response.serviceDetails;
        console.log(this.serviceDetails);

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

  changeServiceDetails(event)
  {
    this.serviceDetailsFilter = event;
    this.totalResoucesSelected = this.serviceDetailsFilter.resources.length;
    if(event)
    {
      this.isServiceDetail=true;
    }
    else
    {
      this.isServiceDetail=false;
    }
    console.log("serviceDetailsFilter",this.serviceDetailsFilter);
    this.amountTotal += this.serviceDetailsFilter.estimatedPrice;
    this.arrayAux =[];
    this.arrayAux.push(this.serviceDetailsFilter);
    console.log("arrayAux - u",this.arrayAux);
    this.arrayAux = this.arrayAux.map((val)=>{
      return {ServiceDetailId: val.id, duration: val.duration, amount: val.estimatedPrice};
  })
  console.log("arrayAux -rr ",this.arrayAux);



    /*for(var i=0; i<this.arrayAux.length;i++)
    {
      this.amountTotal += this.serviceDetailsFilter[i].estimatedPrice;
    }*/
  }

  getRevision(id) {
    this._revisionService.getOne(id).subscribe
    (
      response =>
      {
        this.revision = response.revision;
        //console.log(this.revision);
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

  register(form: NgForm)
  {
    this.serviceOrder.RevisionId = this.revision.id;
    this.serviceOrder.warrantyTime = form.value.warrantyTime;
    this.serviceOrder.amount = this.amountTotal;

   // this.arrayServiceOrderDetailsCreate = [];

    /*this.arrayServiceOrderDetailsCreate = form.value.serviceDetailsFilter.map((val)=>{
      this.arrayAux.push({id: val.id, duration: val.duration, amount: val.estimatedPrice});
    })*/
   // console.log("arrayAux", this.arrayAux);
  // this.arrayServiceOrderDetailsCreate.push({ ServiceDetailId: this.arrayAux.id, duration: form.value.duration, amount: form.value.estimatedPrice})
    console.log("arrayServiceOrderDetailsCreate", this.arrayAux);
    this.serviceOrder.serviceOrderDetails = this.arrayAux;

    console.log("hola ", this.serviceOrder);

    if(form.valid)
    {
      this._serviceOrderService.create(this.serviceOrder).subscribe
      (
        response =>
        {
          if(response.status==true)
          {
            console.log(response);
            this.message  = response.message.text;
            this.snackBar.openSnackBar(this.message,'');
            this.getRevision(this.revisionId);
          }
          else
          {
            console.log(response);
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
