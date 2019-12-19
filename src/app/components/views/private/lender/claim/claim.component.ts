import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogService } from '../../../../../core/services/dialog.service';
import { SnackBarService } from '../../../../../core/services/snack-bar.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global';
import { ServiceOrder } from 'src/app/models/serviceOrder';
import { ServiceOrderService } from 'src/app/core/services/client/serviceOrder.service';

@Component({
  selector: 'sib-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss']
})
export class ClaimComponent implements OnInit {

  public serviceOrder:any;
  public serviceOrders: Array < ServiceOrder > = new Array < ServiceOrder > ();
  public total:number=0;
  public userID:string;
  public message:string;
  public failedConect:string;

  displayedColumns: string[] = ['id','equipinfras','amount','warrantyTime','serviceDetails','status','claim'];
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
  { }

  ngOnInit() {
    this.userID = localStorage.getItem('resID');
    this.getServiceOrder(this.userID);
  }

  getServiceOrder(userID)
  {
    this._serviceOrderService.getServiceOrderLender(userID).subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.serviceOrders = response.serviceOrders;
          this.serviceOrders= this.serviceOrders.filter(serviceOrder=>{return serviceOrder.status =="warranty"});
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
    this.serviceOrders = this.snackBar.orderByDateAsc(this.serviceOrders);
    this.dataSource = new MatTableDataSource(this.serviceOrders);
    this.dataSource.paginator = this.paginator;
  }
  goBack()
  { 
    this._location.back(); 
  }
}