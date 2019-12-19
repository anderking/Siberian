import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ResourceComponent } from './resource.component';
import { ResourcesComponent } from './resources/resources.component';
import { ResourceCreateComponent } from './resource-create/resource-create.component';
import { ResourceEditComponent } from './resource-edit/resource-edit.component';
import { ResourceShowComponent } from './resource-show/resource-show.component';
import { ResourceDeleteComponent } from './resource-delete/resource-delete.component';


const routes: Routes = [

	{path: '', component: ResourceComponent, canActivate: [],
		children:
		[
			{path: '', component: ResourcesComponent},
			{path: 'create', component: ResourceCreateComponent},
			{path: 'edit/:id', component: ResourceEditComponent},
			{path: 'show/:id', component: ResourceShowComponent},
			{path: 'delete/:id', component: ResourceDeleteComponent}
		]
	},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class ResourceRoutingModule { }
