import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RoleComponent } from './role.component';
import { RolesComponent } from './roles/roles.component';
import { RoleCreateComponent } from './role-create/role-create.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RoleShowComponent } from './role-show/role-show.component';
import { RoleDeleteComponent } from './role-delete/role-delete.component';

const routes: Routes = [

	{path: '', component: RoleComponent, canActivate: [],
		children:
		[
			{path: '', component: RolesComponent},
			{path: 'create', component: RoleCreateComponent},
			{path: 'edit/:id', component: RoleEditComponent},
			{path: 'show/:id', component: RoleShowComponent},
			{path: 'delete/:id', component: RoleDeleteComponent},
		]
	},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class RoleRoutingModule { }
