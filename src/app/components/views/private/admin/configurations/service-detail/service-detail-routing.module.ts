import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ServiceDetailComponent } from './service-detail.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServiceDetailCreateComponent } from './service-detail-create/service-detail-create.component';
import { ServiceDetailEditComponent } from './service-detail-edit/service-detail-edit.component';
import { ServiceDetailShowComponent } from './service-detail-show/service-detail-show.component';
import { ServiceDetailDeleteComponent } from './service-detail-delete/service-detail-delete.component';

import { AddActivityComponent } from './add-activity/add-activity.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { AddPoliticComponent } from './add-politic/add-politic.component';
import { AddSkillComponent } from './add-skill/add-skill.component';

import { ShowActivityDetailComponent } from './show-activity-detail/show-activity-detail.component';
import { ShowPoliticDetailComponent } from './show-politic-detail/show-politic-detail.component';
import { ShowResourceDetailComponent } from './show-resource-detail/show-resource-detail.component';
import { ShowSkillDetailComponent } from './show-skill-detail/show-skill-detail.component';

const routes: Routes = [

	{path: '', component: ServiceDetailComponent, canActivate: [],
		children:
		[
			{path: '', component: ServiceDetailsComponent},
			{path: 'create', component: ServiceDetailCreateComponent},
			{path: 'edit/:id', component: ServiceDetailEditComponent},
			{path: 'show/:id', component: ServiceDetailShowComponent},
			{path: 'delete/:id', component: ServiceDetailDeleteComponent},
			{path: ':id/addResource', component: AddResourceComponent},
			{path: ':id/addPolitic', component: AddPoliticComponent},
			{path: ':id/addActivity', component: AddActivityComponent},
			{path: ':id/addSkill', component: AddSkillComponent},
			{path: 'show/:id/activity/:id', component: ShowActivityDetailComponent},
			{path: 'show/:id/politic/:id', component: ShowPoliticDetailComponent},
			{path: 'show/:id/resource/:id', component: ShowResourceDetailComponent},
			{path: 'show/:id/skill/:id', component: ShowSkillDetailComponent}

			
		]
	},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class ServiceDetailRoutingModule { }
