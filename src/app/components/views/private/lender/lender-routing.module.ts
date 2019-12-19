import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LenderComponent } from './lender.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestComponent } from './request/request.component';
import { ServiceComponent } from './service/service.component';
import { DiagnosisComponent} from './diagnosis/diagnosis.component';
import { BudgetComponent} from './budget/budget.component';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { DiagnosisDetailComponent } from './diagnosis-detail/diagnosis-detail.component';
import { BugetDetailComponent } from './buget-detail/buget-detail.component';
import { ClaimComponent } from './claim/claim.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { IncidenceComponent } from './incidence/incidence.component';
import { ExecuteComponent } from './execute/execute.component';
import { ExecuteDetailComponent } from './execute-detail/execute-detail.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DeliveryDetailComponent } from './delivery-detail/delivery-detail.component';
import { CalificationComponent } from './calification/calification.component';
import { CalificationDetailComponent } from './calification-detail/calification-detail.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';


const routes: Routes = [

	{path: '', component: LenderComponent, canActivate: []},
	{path: 'dashboard', component: DashboardComponent, canActivate: []},
	{path: 'calendar', component: CalendarComponent, canActivate: []},
	{path: 'request', component: RequestComponent, canActivate: []},
	{path: 'request/detail/:id', component: RequestDetailComponent, canActivate: []},
	{path: 'service', component: ServiceComponent, canActivate: []},
	{path: 'service/detail/:id', component: ServiceDetailComponent, canActivate: []},
	{path: 'diagnosis', component:DiagnosisComponent, canActivate: []},
	{path: 'diagnosis/detail/:id', component: DiagnosisDetailComponent, canActivate: []},
    {path: 'budget', component:BudgetComponent, canActivate: []},
    {path: 'budget/detail/:id', component: BugetDetailComponent, canActivate: []},
    {path: 'execute', component:ExecuteComponent, canActivate: []},
    {path: 'execute/detail/:id', component: ExecuteDetailComponent, canActivate: []},
    {path: 'delivery', component: DeliveryComponent, canActivate: []},
    {path: 'delivery/detail/:id', component: DeliveryDetailComponent, canActivate: []},
    {path: 'calification', component: CalificationComponent, canActivate: []},
	{path: 'claim', component: ClaimComponent, canActivate: []},
	{path: 'suggestion', component: SuggestionComponent, canActivate: []},
	{path: 'incidence', component: IncidenceComponent, canActivate: []},

	{path: 'profile', canActivate: [],
	
		children:
		[
			{
				path: '',
                loadChildren: '../lender/profile/profile.module#ProfileModule',
			}
		]
	},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class LenderRoutingModule { }
