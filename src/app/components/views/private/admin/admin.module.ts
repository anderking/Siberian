import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../core/ui/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { BackupComponent } from './backup/backup.component';
import { RestoreComponent } from './restore/restore.component';
import { ReportComponent } from './report/report.component';
import { ReportStructuredComponent } from './report-structured/report-structured.component';
import { ReportStatisticalComponent } from './report-statistical/report-statistical.component';

@NgModule({
  declarations:
  [
  	AdminComponent,
  	BackupComponent,
  	RestoreComponent,
  	ReportComponent,
  	ReportStructuredComponent,
  	ReportStatisticalComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
