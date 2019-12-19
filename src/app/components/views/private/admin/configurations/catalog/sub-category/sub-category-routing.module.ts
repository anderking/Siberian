import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SubCategoryComponent } from './sub-category.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { SubCategoryCreateComponent } from './sub-category-create/sub-category-create.component';
import { SubCategoryEditComponent } from './sub-category-edit/sub-category-edit.component';
import { SubCategoryShowComponent } from './sub-category-show/sub-category-show.component';
import { SubCategoryDeleteComponent } from './sub-category-delete/sub-category-delete.component';
import { AddEquipInfrasComponent } from './add-equip-infras/add-equip-infras.component';



const routes: Routes = [

	{path: '', component: SubCategoryComponent, canActivate: [],
		children:
		[
			{path: '', component: SubCategoriesComponent},
			{path: 'create', component: SubCategoryCreateComponent},
			{path: 'edit/:id', component: SubCategoryEditComponent},
			{path: 'show/:id', component: SubCategoryShowComponent},
			{path: 'delete/:id', component: SubCategoryDeleteComponent},
			{path: ':id/addEquipInfras', component:AddEquipInfrasComponent}
		]
	},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class SubCategoryRoutingModule { }
