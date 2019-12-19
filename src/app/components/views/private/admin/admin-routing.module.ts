import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { BackupComponent } from './backup/backup.component';
import { RestoreComponent } from './restore/restore.component';
import { ReportComponent } from './report/report.component';
import { ReportStructuredComponent } from './report-structured/report-structured.component';
import { ReportStatisticalComponent } from './report-statistical/report-statistical.component';

const routes: Routes = [

	{path: '', component: AdminComponent, canActivate: []},

	{path: 'backup', component: BackupComponent, canActivate: []},
	{path: 'restore', component: RestoreComponent, canActivate: []},
	{path: 'report', component: ReportComponent, canActivate: []},
	{path: 'reportStructured', component: ReportStructuredComponent, canActivate: []},
	{path: 'reportStatistical', component: ReportStatisticalComponent, canActivate: []},
	
	
	{path: 'dashboard', canActivate: [],
		children:
		[
			{
				path: '',
                loadChildren: './dashboard/dashboard.module#DashboardModule',
			}
		]
	},

	{path: 'configurations', canActivate: [],
		children:
		[
			{
				path: '',
                loadChildren: './configurations/configuration.module#ConfigurationModule',
			}
		]
	},

	{path: 'profile', canActivate: [],
		children:
		[
			{
				path: '',
                loadChildren: '../admin/profile/profile.module#ProfileModule',
			}
		]
	},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class AdminRoutingModule { }
