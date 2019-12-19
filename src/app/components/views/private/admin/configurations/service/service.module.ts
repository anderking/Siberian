import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../../core/ui/material.module';
import { ServiceRoutingModule } from './service-routing.module';
import { ServiceComponent } from './service.component';
import { ServicesComponent } from './services/services.component';

@NgModule({
  declarations:
  [
  	ServiceComponent,
  	ServicesComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    MaterialModule
  ]
})

export class ServiceModule { }
