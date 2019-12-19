import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GroupComponent } from './group.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { GroupShowComponent } from './group-show/group-show.component';

const routes: Routes = [

	{path: '', component: GroupComponent, canActivate: [],
		children:
		[
			{path: '', component: GroupsComponent},
			{path: 'create', component: GroupCreateComponent},
			{path: 'edit/:id', component: GroupEditComponent},
			{path: 'show/:id', component: GroupShowComponent},
		]
	},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})

export class GroupRoutingModule { }
