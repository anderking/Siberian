import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PromotionComponent } from './promotion.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { PromotionCreateComponent } from './promotion-create/promotion-create.component';
import { PromotionEditComponent } from './promotion-edit/promotion-edit.component';
import { PromotionShowComponent } from './promotion-show/promotion-show.component';
import { PromotionDeleteComponent } from './promotion-delete/promotion-delete.component';
import { DiffusionComponent } from './diffusion/diffusion.component';


const routes: Routes = [

	{path: '', component: PromotionComponent, canActivate: [],
		children:
		[
			{path: '', component: PromotionsComponent},
			{path: 'create', component: PromotionCreateComponent},
			{path: 'edit/:id', component: PromotionEditComponent},
			{path: 'show/:id', component: PromotionShowComponent},
			{path: 'delete/:id', component: PromotionDeleteComponent},
			{path: 'diffusion', component: DiffusionComponent}
		]
	},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class PromotionRoutingModule { }
