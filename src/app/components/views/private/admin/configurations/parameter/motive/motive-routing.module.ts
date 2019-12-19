import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MotiveComponent } from './motive.component';
import { MotivesComponent } from './motives/motives.component';
import { MotiveCreateComponent } from './motive-create/motive-create.component';
import { MotiveEditComponent } from './motive-edit/motive-edit.component';
import { MotiveShowComponent } from './motive-show/motive-show.component';

const routes: Routes = [

	{path: '', component: MotiveComponent, canActivate: [],
		children:
		[
			{path: '', component: MotivesComponent},
			{path: 'create', component: MotiveCreateComponent},
			{path: 'edit/:id', component: MotiveEditComponent},
			{path: 'show/:id', component: MotiveShowComponent},
		]
	},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class MotiveRoutingModule { }
