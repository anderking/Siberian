import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { RequestComponent } from './request/request.component';
import { RevisionComponent } from './revision/revision.component';
import { ServiceOrderComponent } from './service-order/service-order.component';

const routes: Routes = [

	{path: '', component: DashboardComponent, canActivate: [],
		children:
		[
			{path: '', component: DashboardsComponent},
			{path: 'request', component: RequestComponent, canActivate: []},
			{path: 'revision', component: RevisionComponent, canActivate: []},
			{path: 'service-order', component: ServiceOrderComponent, canActivate: []},
		]
	},	

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class DashboardRoutingModule { }
