import { Component, ChangeDetectionStrategy, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

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




import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView,
CalendarDateFormatter } from 'angular-calendar';
import { CustomDateFormatter } from '../../../../../core/pipes/custom-date-formatter.provider';

import { registerLocaleData, DOCUMENT } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);

@Component({
  selector: 'sib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class DashboardComponent {

  public revisions: any;
  public totalRevision:number=0;
  public totalService:number=0;
  public totalServiceOrderBudgeted=0;
  public totalServiceOrderApproved=1;
  public totalServiceOrderRejected=2;
  public totalServiceOrderFinalized=0;
  public totalServiceOrderWarranty=3;
  public totalRevisionRequested=4;
  public totalRevisionApproved=5;
  public totalRevisionRejected=0;
  public totalRevisionDiagnosticated=7;
  public totalRevisionLost=3;
  public totalRevisionFinalized=10;
  public serviceOrders: any;
  public userID:string;
  public message: string;
  public failedConect: string;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate = new Date();

  events: CalendarEvent[] = [];
    /*{
      title: 'An event',
      start: new Date(),
      // color: colors.red
    }
  ];*/

  locale: any = 'es';


  private readonly darkThemeClass = 'dark-theme';

  constructor(@Inject(DOCUMENT)
    private document,
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _revisionService: RevisionService,
    private _serviceorderService: ServiceOrderService,
    private _route: ActivatedRoute,
    private _location: Location

    )
  {

  }


  ngOnInit() {
    this.userID = localStorage.getItem('resID');
    this.getRevisions(this.userID);
    this.getServiceOrders(this.userID);
  }

  getRevisions(userid)
  {
    this._revisionService.getRevisionLender(userid).subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.revisions = response.revisions;
          this.totalRevision = this.revisions.length;
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
          this.totalService = this.serviceOrders.length;
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

  setView(view: CalendarView) {
    this.view = view;
  }

}
