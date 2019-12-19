import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { MaterialModule } from '../../../../../../core/ui/material.module';
import { ParameterRoutingModule } from './parameter-routing.module';
import { ParameterComponent } from './parameter.component';
import { ParametersComponent } from './parameters/parameters.component';
import { SubcategoryService } from 'src/app/core/services/admin/subcategory.service';
import { EquipinfrasService } from 'src/app/core/services/admin/equipinfras.service';
import { PromotionService } from 'src/app/core/services/admin/promotion.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';

@NgModule({
  declarations:
  [
  	ParameterComponent,
    ParametersComponent,
  ],
  imports: [
    CommonModule,
    ParameterRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers:
  [
    
    SubcategoryService,
    EquipinfrasService,
    PromotionService,
  ],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ParameterModule { }