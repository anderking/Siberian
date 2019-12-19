import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PromotionTargetComponent } from './promotion-target.component';
import { PromotionTargetsComponent } from './promotion-targets/promotion-targets.component';
import { PromotionTargetCreateComponent } from './promotion-target-create/promotion-target-create.component';
import { PromotionTargetEditComponent } from './promotion-target-edit/promotion-target-edit.component';
import { PromotionTargetShowComponent } from './promotion-target-show/promotion-target-show.component';
import { PromotionTargetDeleteComponent } from './promotion-target-delete/promotion-target-delete.component';

const routes: Routes = [

	{path: '', component: PromotionTargetComponent, canActivate: [],
		children:
		[
			{path: '', component: PromotionTargetsComponent},
			{path: 'create', component: PromotionTargetCreateComponent},
			{path: 'edit/:id', component: PromotionTargetEditComponent},
			{path: 'show/:id', component: PromotionTargetShowComponent},
			{path: 'delete/:id', component: PromotionTargetDeleteComponent}
		]
	},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class PromotionTargetRoutingModule { }
