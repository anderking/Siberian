import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../core/ui/material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { RequestComponent } from './request/request.component';
import { RevisionComponent } from './revision/revision.component';
import { ServiceOrderComponent } from './service-order/service-order.component';
import { CompanyService } from '../../../../../core/services/admin/company.service';
import { LocationService } from '../../../../../core/services/admin/location.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';


@NgModule({
  declarations:
  [
  	DashboardComponent,
    DashboardsComponent,
  	RequestComponent,
    RevisionComponent,
    ServiceOrderComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ],
  providers:
  [
    CompanyService,
    LocationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
  ]
})

export class DashboardModule { }
