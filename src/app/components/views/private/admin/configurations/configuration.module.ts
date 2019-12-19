import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../core/ui/material.module';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { ConfigurationsComponent } from './configurations/configurations.component';

@NgModule({
  declarations: [
    ConfigurationComponent,
    ConfigurationsComponent,
  ],
  imports:[
    CommonModule,
    MaterialModule,
    ConfigurationRoutingModule
  ],
})
export class ConfigurationModule { }
