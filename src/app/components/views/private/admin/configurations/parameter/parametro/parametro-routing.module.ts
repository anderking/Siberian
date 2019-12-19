import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ParametroComponent } from './parametro.component';
import { ParametrosComponent } from './parametros/parametros.component';
import { ParametroCreateComponent } from './parametro-create/parametro-create.component';
import { ParametroEditComponent } from './parametro-edit/parametro-edit.component';
import { ParametroShowComponent } from './parametro-show/parametro-show.component';


const routes: Routes = [

	{path: '', component: ParametroComponent, canActivate: [],
		children:
		[
			{path: '', component: ParametrosComponent},
			{path: 'create', component: ParametroCreateComponent},
			{path: 'edit/:id', component: ParametroEditComponent},
			{path: 'show/:id', component: ParametroShowComponent},
		]
	},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})

export class ParametroRoutingModule { }
