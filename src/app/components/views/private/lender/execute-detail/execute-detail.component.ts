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

@Component({
  selector: 'sib-execute-detail',
  templateUrl: './execute-detail.component.html',
  styleUrls: ['./execute-detail.component.scss']
})
export class ExecuteDetailComponent implements OnInit {

  public serviceOrder: any;
  public message: string;
  public failedConect: string;

  constructor(
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _serviceOrderService: ServiceOrderService,
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
        this.getServiceOrder(id);
      }
    );
  }

  getServiceOrder(id)
  {
    this._serviceOrderService.getOne(id).subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.serviceOrder = response.serviceOrder;
          console.log(this.serviceOrder);
        }
        else
        {
          this.message = response.message.text;
          console.log(this.message);
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

  onTask(id){
    this.dialogService.openConfirmDialog('¿Deseas finalizar estas tareas?').afterClosed().subscribe
    (
      response =>
      {
        if (response==true)
        {
          this.completedServiceOrder(id);
        }else
        {
          console.log(response);
        }
      }
      );
  }


  completedServiceOrder(id)
  {
    this._serviceOrderService.completed(id).subscribe
    (
      response =>
      {
        console.log(response);
        this.message = response.message.text;
        this.snackBar.openSnackBarSuccess(this.message);
        this.getServiceOrder(id);
      },
      error =>
      {
        console.log(<any>error);
      }
      )
  }

  goBack() {
    this._location.back();
  }

}
