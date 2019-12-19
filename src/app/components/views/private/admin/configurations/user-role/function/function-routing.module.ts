import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FunctionComponent } from './function.component';
import { FunctionsComponent } from './functions/functions.component';
import { FunctionCreateComponent } from './function-create/function-create.component';
import { FunctionEditComponent } from './function-edit/function-edit.component';
import { FunctionShowComponent } from './function-show/function-show.component';

const routes: Routes = [

	{path: '', component: FunctionComponent, canActivate: [],
		children:
		[
			{path: '', component: FunctionsComponent},
			{path: 'create', component: FunctionCreateComponent},
			{path: 'edit/:id', component: FunctionEditComponent},
			{path: 'show/:id', component: FunctionShowComponent},
		]
	},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class FunctionRoutingModule { }
