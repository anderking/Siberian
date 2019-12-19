import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PoliticComponent } from './politic.component';
import { PoliticsComponent } from './politics/politics.component';
import { PoliticCreateComponent } from './politic-create/politic-create.component';
import { PoliticEditComponent } from './politic-edit/politic-edit.component';
import { PoliticShowComponent } from './politic-show/politic-show.component';
import { PoliticDeleteComponent } from './politic-delete/politic-delete.component';

const routes: Routes = [

	{path: '', component: PoliticComponent, canActivate: [],
		children:
		[
			{path: '', component: PoliticsComponent},
			{path: 'create', component: PoliticCreateComponent},
			{path: 'edit/:id', component: PoliticEditComponent},
			{path: 'show/:id', component: PoliticShowComponent},
			{path: 'delete/:id', component: PoliticDeleteComponent}
		]
	},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class PoliticRoutingModule { }
