import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ActivityComponent } from './activity.component';
import { ActivitysComponent } from './activitys/activitys.component';
import { ActivityCreateComponent } from './activity-create/activity-create.component';
import { ActivityEditComponent } from './activity-edit/activity-edit.component';
import { ActivityShowComponent } from './activity-show/activity-show.component';
import { ActivityDeleteComponent } from './activity-delete/activity-delete.component';

const routes: Routes = [

	{path: '', component: ActivityComponent, canActivate: [],
		children:
		[
			{path: '', component: ActivitysComponent},
			{path: 'create', component: ActivityCreateComponent},
			{path: 'edit/:id', component: ActivityEditComponent},
			{path: 'show/:id', component: ActivityShowComponent},
			{path: 'delete/:id', component: ActivityDeleteComponent}
		]
	},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class ActivityRoutingModule { }
