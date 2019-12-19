import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryShowComponent } from './category-show/category-show.component';
import { CategoryDeleteComponent } from './category-delete/category-delete.component';
import { AddSubcategoryComponent } from './add-subcategory/add-subcategory.component';

const routes: Routes = [

	{path: '', component: CategoryComponent, canActivate: [],
		children:
		[
			{path: '', component: CategoriesComponent},
			{path: 'create', component: CategoryCreateComponent},
			{path: 'edit/:id', component: CategoryEditComponent},
			{path: 'show/:id', component: CategoryShowComponent},
			{path: 'delete/:id', component: CategoryDeleteComponent},
			{path: ':id/addSubcategory', component: AddSubcategoryComponent}
		]
	},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class CategoryRoutingModule { }
