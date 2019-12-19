import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../../../core/ui/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubcategoryService } from 'src/app/core/services/admin/subcategory.service';
import { CategoryService } from 'src/app/core/services/admin/category.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';

import { SubCategoryRoutingModule } from './sub-category-routing.module';
import { SubCategoryComponent } from './sub-category.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { SubCategoryCreateComponent } from './sub-category-create/sub-category-create.component';
import { SubCategoryEditComponent } from './sub-category-edit/sub-category-edit.component';
import { SubCategoryShowComponent } from './sub-category-show/sub-category-show.component';
import { SubCategoryDeleteComponent } from './sub-category-delete/sub-category-delete.component';
import { AddEquipInfrasComponent } from './add-equip-infras/add-equip-infras.component';

@NgModule({
  declarations: [
	SubCategoryComponent,
	SubCategoriesComponent,
	SubCategoryCreateComponent,
	SubCategoryEditComponent,
	SubCategoryShowComponent,
	SubCategoryDeleteComponent,
	AddEquipInfrasComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SubCategoryRoutingModule
  ],
  providers:
  [
    SubcategoryService,
    CategoryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
  ],
})
export class SubCategoryModule { }
