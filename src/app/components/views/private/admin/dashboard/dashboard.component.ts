import { Component, OnInit } from '@angular/core';
import { BorderWidth, Chart, ChartData, Point, ChartColor } from 'chart.js';

@Component({
  selector: 'sib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  MonthService = [];

  ngOnInit() {
    this.MonthServ();
  }

  MonthServ() {
    this.MonthService = new Chart ('MonthService', {
      type: 'line',
    data: {
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
        datasets: [
            {
                backgroundColor: '#000000',
                borderWidth: 1,
                data: [5, 2, 6, 5, 4],
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
            text: ['Servicios prestados en la semana'],
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
                    ticks: {
                       // callback: Math.floor,
                    },
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
