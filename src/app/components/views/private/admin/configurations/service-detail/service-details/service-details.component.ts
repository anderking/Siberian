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
import { ServiceDetail } from 'src/app/models/serviceDetail';
import { ServiceDetailService } from 'src/app/core/services/admin/serviceDetail.service';


@Component({
  selector: 'sib-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})

export class ServiceDetailsComponent implements OnInit {


  public serviceDetails:Array < ServiceDetail > = new Array < ServiceDetail > ();
  public message:string;
  public failedConect:string;

  displayedColumns: string[] = ['id','name','estimatedPrice','serviceType','status','addActivity','addResource','addPolitic','addSkill','edit','delete'];
  dataSource: MatTableDataSource <ServiceDetail>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor(
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _serviceDetailService: ServiceDetailService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) { 
    
  }

  ngOnInit() {
    this.getServiceDetails();
  }

  getServiceDetails()
  {
    this._serviceDetailService.All().subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.serviceDetails = response.serviceDetails;
          console.log(this.serviceDetails);
          this.table();
        }
        else
        {
          this.serviceDetails = [];
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

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
		  this.dataSource.paginator.firstPage();
		}
	}

	table()
  {
    this.serviceDetails = this.snackBar.orderByDateAsc(this.serviceDetails);
    this.dataSource = new MatTableDataSource(this.serviceDetails);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

	onDelete(id)
  {
    this.dialogService.openConfirmDialog('¿Estás seguro de eliminar este Servicio Detalle?').afterClosed().subscribe
    (
      response =>
      {
        if (response==true)
        {
          this.deleteServiceDetail(id);
        }else
        {
          console.log(response);
        }
      }
      );
  }

  deleteServiceDetail(id)
  {
    this._serviceDetailService.deleteOne(id).subscribe
    (
      response =>
      {
        console.log(response);
        this.message = response.message.text;
        this.snackBar.openSnackBarSuccess(this.message);
        this.getServiceDetails();
      },
      error =>
      {
        console.log(<any>error);
      }
      )
  }

}
