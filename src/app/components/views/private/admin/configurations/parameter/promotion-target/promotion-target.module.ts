import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../../../core/ui/material.module';
import { PromotionTargetRoutingModule } from './promotion-target-routing.module';
import { PromotionTargetComponent } from './promotion-target.component';
import { PromotionTargetsComponent } from './promotion-targets/promotion-targets.component';
import { PromotionTargetCreateComponent } from './promotion-target-create/promotion-target-create.component';
import { PromotionTargetEditComponent } from './promotion-target-edit/promotion-target-edit.component';
import { PromotionTargetShowComponent } from './promotion-target-show/promotion-target-show.component';
import { PromotionTargetDeleteComponent } from './promotion-target-delete/promotion-target-delete.component';

@NgModule({
  declarations: [
	PromotionTargetComponent,
	PromotionTargetsComponent,
	PromotionTargetCreateComponent,
	PromotionTargetEditComponent,
	PromotionTargetShowComponent,
	PromotionTargetDeleteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PromotionTargetRoutingModule
  ]
})
export class PromotionTargetModule { }
