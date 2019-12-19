import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../../../../core/services/dialog.service';
import { SnackBarService } from '../../../../../core/services/snack-bar.service';

import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../core/services/global';

import { User } from '../../../../../models/user';
import { UserService } from '../../../../../core/services/admin/user.service';
import { Revision } from '../../../../../models/revision';
import { RevisionService } from '../../../../../core/services/client/revision.service';
import { ServiceOrder } from '../../../../../models/serviceOrder';
import { ServiceOrderService } from '../../../../../core/services/client/serviceOrder.service';
import { Equipinfras } from '../../../../../models/equipinfras';
import { EquipinfrasService } from '../../../../../core/services/admin/equipinfras.service';

@Component({
  selector: 'sib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public revisions: any;
  public totalRevision:any;
  public totalServiceOrder:any;
  public serviceOrders: any;
  public equipinfras: Equipinfras;
  public userID:string;
  public message: string;
  public failedConect: string;

  public totalRevisionRequested:number=0;
  public totalRevisionApproved:number=0;
  public totalRevisionRejected:number=0;
  public totalRevisionDiagnosticated:number=0;
  public totalRevisionLost:number=0;
  public totalRevisionFinalized:number=0;
  public totalRevisionCancelled:number=0;

  public totalServiceOrderBudgeted:number=0;
  public totalServiceOrderApproved:number=0;
  public totalServiceOrderRejected:number=0;
  public totalServiceOrderFinalized:number=0;
  public totalServiceOrderWarranty:number=0;

  constructor(
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _revisionService: RevisionService,
    private _serviceorderService: ServiceOrderService,
    private _equipinfrasService: EquipinfrasService,
    private _route: ActivatedRoute,
    private _location: Location
  ) {

  }

  ngOnInit() {
    this.userID = localStorage.getItem('resID');
    this.getRevisions(this.userID);
    this.getServiceOrders(this.userID);
  }

  getRevisions(userid)
  {
    this._revisionService.getRevisionUser(userid).subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.revisions = response.revisions;
          this.totalRevision = this.revisions.length;
          for (var i=0; i<this.revisions.length; i++)
          {
            if( this.revisions[i].status == 'requested')
            {
              this.totalRevisionRequested++;
            }

            if( this.revisions[i].status == 'approved')
            {
              this.totalRevisionApproved++;
            }
            if( this.revisions[i].status == 'rejected')
            {
              this.totalRevisionRejected++;
            }

            if( this.revisions[i].status == 'diagnosticated')
            {
              this.totalRevisionDiagnosticated++;
            }

            if( this.revisions[i].status == 'irreparable')
            {
              this.totalRevisionLost++;
            }

            if( this.revisions[i].status == 'finalized')
            {
              this.totalRevisionFinalized++;
            }

            if( this.revisions[i].status == 'cancelled')
            {
              this.totalRevisionCancelled++;
            }

          }
          console.log(this.revisions);
        }
        else
        {
          this.revisions = [];
          this.message = response.message.text;
          console.log(this.message);
        }
      },
      error =>
      {
        console.log(<any>error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            this.failedConect = Global.failed;
          }
        }
      }
      )
  }


  getServiceOrders(userid)
  {
    this._serviceorderService.getServiceOrderUser(userid).subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.serviceOrders = response.serviceOrders;
          this.totalServiceOrder = this.serviceOrders.length;
          for (var i=0; i<this.serviceOrders.length; i++)
          {
            if( this.serviceOrders[i].status == 'budgeted')
            {
              this.totalServiceOrderBudgeted++;
            }

            if( this.serviceOrders[i].status == 'approved')
            {
              this.totalServiceOrderApproved++;
            }

            if( this.serviceOrders[i].status == 'warranty')
            {
              this.totalServiceOrderWarranty++;
            }
          }
          console.log(this.serviceOrders);
        }
        else
        {
          this.serviceOrders = [];
          this.message = response.message.text;
          console.log(this.message);
        }
      },
      error =>
      {
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
