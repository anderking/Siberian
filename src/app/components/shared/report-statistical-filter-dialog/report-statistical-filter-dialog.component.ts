import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceDetail } from 'src/app/models/serviceDetail';
import { ServiceDetailService } from 'src/app/core/services/admin/serviceDetail.service';
import { Equipinfras } from 'src/app/models/equipinfras';
import { EquipinfrasService } from 'src/app/core/services/admin/equipinfras.service';

import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'sib-report-statistical-filter-dialog',
  templateUrl: './report-statistical-filter-dialog.component.html',
  styleUrls: ['./report-statistical-filter-dialog.component.scss']
})
export class ReportStatisticalFilterDialogComponent implements OnInit {

  public serviceDetails:any;
  public equipinfrass:any;
  public types:any;
  public typeSelected:string="";
  public message:string;
  public failedConect:string;
  public isServiceDetail:boolean=false;
  public isEquipInfras:boolean=false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ReportStatisticalFilterDialogComponent>,
    private _serviceDetailService: ServiceDetailService,
    private _equipinfrasService: EquipinfrasService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private snackBar: SnackBarService,
  ) { }

  ngOnInit()
  {
    this.types =
    [
      {id:"Reparación",name:"Reparación"},
      {id:"Mantenimiento",name:"Mantenimiento"},
      {id:"Construcción",name:"Construcción"},
      {id:"Otros",name:"Otros"},
    ];
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getServiceDetails(event)
  {
    this._serviceDetailService.All().subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.serviceDetails = response.serviceDetails.filter(users => {return users.status == 'active'});;
          console.log(this.serviceDetails);
        }
        else
        {
          this.serviceDetails = [];
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

  getEquipinfrass(event)
  {
    this._equipinfrasService.All().subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.equipinfrass = response.equipinfras;
          console.log(this.equipinfrass);
        }
        else
        {
          console.log(response);
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

  changeType(event)
  {
    this.isServiceDetail=true;
    this.getEquipinfrass(event);
  }
  
  changeEquipInfras(event)
  {
    console.log(event)

  }

}
