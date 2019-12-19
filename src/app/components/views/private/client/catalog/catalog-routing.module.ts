import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from './catalog.component';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { VarietyComponent } from './variety/variety.component';
import { VarietyDetailsComponent } from './variety-details/variety-details.component';
import { OthersComponent } from './others/others.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { EquipsinfrasComponent } from './equipsinfras/equipsinfras.component';
import { ConfirmComponent } from './confirm/confirm.component';

const routes: Routes = [

	{path: '', component: CatalogComponent, canActivate: [],
		children:
		[
			{path: '', component: CategoriaComponent},
			{path: 'catalogs', component: CatalogsComponent},
			{path: 'category/:id', component: SubcategoriaComponent, canActivate: []},
			{path: 'category/:id/subcategory/:id', component: EquipsinfrasComponent, canActivate: []},
			{path: 'category/:id/subcategory/:id/equipinfras/:id', component: VarietyComponent, canActivate: []},
			{path: 'category/:id/subcategory/:id/equipinfras/:id/variety/:id', component: VarietyDetailsComponent, canActivate: []},
			{path: 'confirm', component: ConfirmComponent, canActivate: []},
			{path: 'others', component: OthersComponent, canActivate: []},
		]
	},	

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class CatalogRoutingModule { }
