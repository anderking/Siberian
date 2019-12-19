import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/core/services/dialog.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global';
import { ServiceOrder } from 'src/app/models/serviceOrder';
import { ServiceOrderService } from 'src/app/core/services/client/serviceOrder.service';

@Component({
  selector: 'sib-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit
{
  
  public serviceOrder:any;
  public serviceOrders: Array < ServiceOrder > = new Array < ServiceOrder > ();
  public total:number=0;
  public userID:string;
  public message:string;
  public failedConect:string;

  displayedColumns: string[] = ['id','equipinfras','amount','serviceDetails','lender','status','approved','rejected'];
  dataSource: MatTableDataSource<ServiceOrder>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor
  (
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _serviceOrderService: ServiceOrderService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
    )
  {

  }

  ngOnInit() {
    this.userID = localStorage.getItem('resID');
    this.getServiceOrder(this.userID);
  }

  getServiceOrder(userID)
  {
    this._serviceOrderService.getServiceOrderUser(userID).subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.serviceOrders = this.snackBar.orderByDateAsc(this.serviceOrders);
          this.serviceOrders = response.serviceOrders;
          this.total = this.serviceOrders.length;
          console.log(this.serviceOrders);
          this.table();
        }
        else
        {
          this.serviceOrders = [];
          this.message = response.message.text;
          console.log(this.message);
          this.table();
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

  applyFilter(filterValue: string)
  {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  table()
  {
    this.dataSource = new MatTableDataSource(this.serviceOrders);
    this.dataSource.paginator = this.paginator;
  }


  onApproved(id){
    this.dialogService.openConfirmDialog('¿Estás seguro de aprobar este presupuesto?').afterClosed().subscribe
    (
      response =>
      {
        if (response==true)
        {
          this.approvedServiceOrder(id);
        }else
        {
          console.log(response);
        }
      }
      );
  }


  approvedServiceOrder(id)
  {
    this._serviceOrderService.approve(id, {}).subscribe
    (
      response =>
      {
        console.log(response);
        this.message = response.message.text;
        this.snackBar.openSnackBarSuccess(this.message);
        this.getServiceOrder(this.userID);
      },
      error =>
      {
        console.log(<any>error);
      }
      )
  }


  onRejected(id){
    this.dialogService.openRejectedRequestDialog().afterClosed().subscribe
    (
      response =>
      {
        if(response!=false)
        {
          var motive = response.motive;
          var note = response.note;
          this.rejectedRevision(id,motive,note);
        }
        else
        {
          console.log(response);
        }

      }
      );
  }


  rejectedRevision(id,motiveId,note?)
  {
    this._serviceOrderService.rejected(id,motiveId,note).subscribe
    (
      response =>
      {
        console.log(response);
        this.message = response.message.text;
        this.snackBar.openSnackBarSuccess(this.message);
        this.getServiceOrder(this.userID);
      },
      error =>
      {
        console.log(<any>error);
      }
      )
  }

  goBack()
  { 
    this._location.back(); 
  }

}
