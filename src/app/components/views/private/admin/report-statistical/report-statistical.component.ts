import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from '../../../../../core/services/dialog.service';
import { BorderWidth, Chart, ChartData, Point, ChartColor, ChartType, ChartOptions } from 'chart.js';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, Validators } from '@angular/forms';
import { ServiceDetailService } from 'src/app/core/services/admin/serviceDetail.service';
import { ServiceDetail } from 'src/app/models/serviceDetail';
import { DatePipe } from '@angular/common';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'sib-report-statistical',
  templateUrl: './report-statistical.component.html',
  styleUrls: ['./report-statistical.component.scss']
})
export class ReportStatisticalComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'gender', 'type'];
  dataSource: MatTableDataSource<ServiceDetail>;
  public serviceDetails: any;
  public dateIn: any = [];
  public dateFin: any = [];
  public servicios: any = [];
  public gender: string;
  public message: string;
  public failedConect: string;
  public serviceType: string;
  public serviceName: string;
  servicesOrders = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialogService: DialogService,
    private _serviceDetailService: ServiceDetailService,
    //private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private snackBar: SnackBarService,
  ) { }

  ngOnInit() {
    this.OrdenesServicios();
    this.AllServices();
  }

  AllServices() {
    this._serviceDetailService.getAll().subscribe
    (
      response => {
        if (response.status==true) {
          this.serviceDetails = response.serviceDetails;
          console.log(this.serviceDetails);

          for (let i = 0; i < this.serviceDetails.length; i++) {
            this.servicios.push(this.serviceDetails[i].count);
            }
          console.log(this.servicios);

        }
        else {
          this.serviceDetails = [];
          this.message = response.message.text;
          console.log(this.message);
        }

      },
      error => {
        console.log(<any>error);
        if (error instanceof HttpErrorResponse) {
          if (error.status===0) {
            this.failedConect = Global.failed;
          }
        }
      }
      )
 }


  openDate(){
    this.dialogService.openDateDialog().afterClosed();
  }
  openFiltros(){
      this.dialogService.openStatisticalFilterDialog().afterClosed();
  }

  OrdenesServicios() {
    this.servicesOrders = new Chart ('servicesOrders', {
      type: 'bar',
    data: {
        labels: ['Reparación', 'Mantenimiento'], //valores eje x
        datasets: [
            {
                backgroundColor: '#242451',
                borderWidth: 1,
                data: [ 3 , 1 ], // this.servicios,this.servicios,//, //data grafica
                fill: false,
                lineTension: 0.2,
                borderColor: '#242451',
            },
        ],
    },
    options: {
        hover: {
            intersect: true,
        },
        title: {
            text: ['Tipo de servicios más solicitados'],
            display: true,
        },
        tooltips: {
            intersect: true,
            mode: 'index',
            position: 'average',
            caretPadding: 2,
            displayColors: true,
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 1,
            titleAlign: 'center',
        },
        scales: {
            xAxes: [
                {
                    minBarLength: 2,
                    gridLines: {
                        display: false,
                        borderDash: [5, 15],
                        borderDashOffset: 2,
                        zeroLineBorderDash: [5, 15],
                        zeroLineBorderDashOffset: 2,
                        lineWidth: [1, 2, 3],
                    },
                },
            ],
            yAxes: [{
              ticks: {
                beginAtZero: true,
              }
            }
            ]
        },
        legend: {
            display: false,
            labels: {
                boxWidth: 0,
                usePointStyle: false,
                padding: 40,
            },
        },
        devicePixelRatio: 2,
        plugins: {
            bar: false,
            foo: {},
        },
    },
  });
  }
}
