import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VarietyComponent } from './variety.component';
import { VarietysComponent } from './varietys/varietys.component';
import { VarietyCreateComponent } from './variety-create/variety-create.component';
import { VarietyEditComponent } from './variety-edit/variety-edit.component';
import { VarietyShowComponent } from './variety-show/variety-show.component';
import { VarietyDeleteComponent } from './variety-delete/variety-delete.component';

const routes: Routes = [

	{path: '', component: VarietyComponent, canActivate: [],
		children:
		[
			{path: '', component: VarietysComponent},
			{path: 'create', component: VarietyCreateComponent},
			{path: 'edit/:id', component: VarietyEditComponent},
			{path: 'show/:id', component: VarietyShowComponent},
			{path: 'delete/:id', component: VarietyDeleteComponent}
		]
	},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class VarietyRoutingModule { }
