import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/ui/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PromotionService } from 'src/app/core/services/admin/promotion.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';
import { PromotionRoutingModule } from './promotion-routing.module';
import { PromotionComponent } from './promotion.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { PromotionCreateComponent } from './promotion-create/promotion-create.component';
import { PromotionEditComponent } from './promotion-edit/promotion-edit.component';
import { PromotionShowComponent } from './promotion-show/promotion-show.component';
import { PromotionDeleteComponent } from './promotion-delete/promotion-delete.component';
import { DiffusionComponent } from './diffusion/diffusion.component';

@NgModule({
  declarations: [
	PromotionComponent,
	PromotionsComponent,
	PromotionCreateComponent,
	PromotionEditComponent,
	PromotionShowComponent,
	PromotionDeleteComponent,
	DiffusionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PromotionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:
  [
    PromotionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
  ],
})
export class PromotionModule { }
