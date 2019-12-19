import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { DialogService } from 'src/app/core/services/dialog.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global';
import { ServiceOrder } from 'src/app/models/serviceOrder';
import { ServiceOrderDetail } from 'src/app/models/serviceOrderDetail';
import { ServiceDetailResource } from 'src/app/models/serviceDetailResource';
import { ServiceOrderService } from 'src/app/core/services/client/serviceOrder.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';


@Component({
  selector: 'sib-delivery-detail',
  templateUrl: './delivery-detail.component.html',
  styleUrls: ['./delivery-detail.component.scss']
})
export class DeliveryDetailComponent implements OnInit {

  public serviceOrder:any;
  public serviceDetails:any;
  public serviceOrderId:any;
  public message: string;
  public failedConect: string;
  public isServiceDetail:boolean=false;
  public amountTotal:any=0;
  public urldelafault:string="assets/img/request/revision_3.jpg";
	public totalResoucesSelected:number=0;
	data = {};

  constructor(private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _serviceOrderService: ServiceOrderService,
		private _route: ActivatedRoute,
		private dialog: DialogService,
    private _location: Location) {}

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.serviceOrderId = id;
      this.getServiceOrder(id);
    });
	}
	
	openDialog(): void {
		let res = this.dialog.openCalendarDialog(this.data);
		let calendars = []
		res.afterClosed().subscribe(result => {
			if (result) {
				result.forEach(x => {
					calendars.push({
						type: "serviceOrderDetail",
						date: moment(x).format('YYYY-MM-DD'),
	        	turn: "morning",
	        	LenderId: this.serviceOrder.revision.calendar.lender.id
					});
				});
				console.log(calendars)

				let sod = this.serviceOrder.serviceOrderDetails;
				sod[0].calendars = calendars;
				console.log({serviceOrderDetails: sod})
				this._serviceOrderService.approve(this.serviceOrder.id, sod).subscribe(_ => {
					this.goBack();
				}, e => this.snackBar.openSnackBarSuccess('Error al aceptar el presupuesto'));
			}
    });
	}

  getServiceOrder(id) {
    this._serviceOrderService.getOne(id).subscribe(response => {
				this.serviceOrder = response.serviceOrder;
				this.data = {
					selectedDates: []
				};
        console.log("serviceOrder", this.serviceOrder);
      }, error => {
        console.log(<any>error);
        if(error instanceof HttpErrorResponse) {
          if(error.status===0) {
            this.failedConect = Global.failed;
          }
        }
      });
  }

  onApproved(id){
    this.dialogService.openConfirmDialog('¿Estás seguro deseas cerrar este servicio?').afterClosed().subscribe
    (
      response =>
      {
        if (response==true)
        {
          this.onWarranty(id);
        }else
        {
          console.log(response);
        }
      }
      );
  }


  onWarranty(id)
  {
    this._serviceOrderService.warranty(id).subscribe
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
