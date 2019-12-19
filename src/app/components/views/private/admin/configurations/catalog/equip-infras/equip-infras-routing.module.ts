import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EquipInfrasComponent } from './equip-infras.component';
import { EquipInfrassComponent } from './equip-infrass/equip-infrass.component';
import { EquipInfrasCreateComponent } from './equip-infras-create/equip-infras-create.component';
import { EquipInfrasEditComponent } from './equip-infras-edit/equip-infras-edit.component';
import { EquipInfrasShowComponent } from './equip-infras-show/equip-infras-show.component';
import { EquipInfrasDeleteComponent } from './equip-infras-delete/equip-infras-delete.component';
import { AddVarietyComponent } from './add-variety/add-variety.component';
import { AddVarietyDetailsComponent } from './add-variety-details/add-variety-details.component';
import { ShowVarietyDetailComponent } from './show-variety-detail/show-variety-detail.component';
import { AddServiceDetailComponent } from './add-service-detail/add-service-detail.component';
import { EditVarietyDetailComponent } from './edit-variety-detail/edit-variety-detail.component';

const routes: Routes = [

	{path: '', component: EquipInfrasComponent, canActivate: [],
		children:
		[
			{path: '', component: EquipInfrassComponent},
			{path: 'create', component: EquipInfrasCreateComponent},
			{path: 'edit/:id', component: EquipInfrasEditComponent},
			{path: 'show/:id', component: EquipInfrasShowComponent},
			{path: 'show/:id/variety/:id', component: ShowVarietyDetailComponent},
			{path: 'delete/:id', component: EquipInfrasDeleteComponent},
			{path: ':id/addVariety', component: AddVarietyComponent},
			{path: ':id/addVariety/:id/addVarietyDetails', component: AddVarietyDetailsComponent},
			{path: 'show/:id/variety/:id/varietyDetails/:id/addServiceDetail', component: AddServiceDetailComponent},
			{path: 'editVarietyDetail/:id', component: EditVarietyDetailComponent},
		]
	},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class EquipInfrasRoutingModule { }
