import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClaimComponent } from './claim/claim.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServiceComponent } from './service/service.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { CalificationComponent } from './calification/calification.component';
import { CalificationDetailComponent } from './calification-detail/calification-detail.component';
import { IncidenceComponent } from './incidence/incidence.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { BudgetComponent } from './budget/budget.component';
import { BudgetDetailComponent } from './budget-detail/budget-detail.component';

const routes: Routes = [

	{path: '', component: ClientComponent, canActivate: []},
	{path: 'claim', component: ClaimComponent, canActivate: []},
	{path: 'dashboard', component: DashboardComponent, canActivate: []},
	{path: 'service', component: ServiceComponent, canActivate: []},
	{path: 'service/detail/:id', component: ServiceDetailComponent, canActivate: []},
	{path: 'budget', component:BudgetComponent, canActivate: []},
    {path: 'budget/detail/:id', component: BudgetDetailComponent, canActivate: []},
	{path: 'suggestion', component: SuggestionComponent, canActivate: []},
	{path: 'incidence', component: IncidenceComponent, canActivate: []},
	{path: 'calification', component: CalificationComponent, canActivate: []},
    {path: 'calification/detail/:id', component: CalificationDetailComponent, canActivate: []},
	{path: 'profile', canActivate: [],
		children:
		[
			{
				path: '',
                loadChildren: '../client/profile/profile.module#ProfileModule',
			}
		]
	},
	{path: 'request', canActivate: [],
		children:
		[
			{
				path: '',
                loadChildren: '../client/request/request.module#RequestModule',
			}
		]
	},
	{path: 'catalog', canActivate: [],
		children:
		[
			{
				path: '',
                loadChildren: '../client/catalog/catalog.module#CatalogModule',
			}
		]
	},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class ClientRoutingModule { }
