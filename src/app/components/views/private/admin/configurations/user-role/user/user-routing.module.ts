import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UsersComponent } from './users/users.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserShowComponent } from './user-show/user-show.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';

const routes: Routes = [

	{path: '', component: UserComponent, canActivate: [],
		children:
		[
			{path: '', component: UsersComponent},
			{path: 'create', component: UserCreateComponent},
			{path: 'edit/:id', component: UserEditComponent},
			{path: 'show/:id', component: UserShowComponent},
			{path: 'delete/:id', component: UserDeleteComponent}
		]
	},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class UserRoutingModule { }
