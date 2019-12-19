import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LenderComponent } from './lender.component';
import { LendersComponent } from './lenders/lenders.component';
import { LenderCreateComponent } from './lender-create/lender-create.component';
import { LenderEditComponent } from './lender-edit/lender-edit.component';
import { LenderShowComponent } from './lender-show/lender-show.component';
import { AddSkillLenderComponent } from './add-skill-lender/add-skill-lender.component';

const routes: Routes = [

	{path: '', component: LenderComponent, canActivate: [],
		children:
		[
			{path: '', component: LendersComponent},
			{path: 'create', component: LenderCreateComponent},
			{path: 'edit/:id', component: LenderEditComponent},
			{path: 'show/:id', component: LenderShowComponent},
			{path: ':id/addSkill', component: AddSkillLenderComponent},
		]
	},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class LenderRoutingModule { }
