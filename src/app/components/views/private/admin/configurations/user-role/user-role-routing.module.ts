import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserRoleComponent } from './user-role.component';

const routes: Routes = [

	{path: '', component: UserRoleComponent, canActivate: [],
		children:
		[
			{path: 'role', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: './role/role.module#RoleModule',
					}
				]
			},
			{path: 'user', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: './user/user.module#UserModule',
					}
				]
			},

			{path: 'function', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: './function/function.module#FunctionModule',
					}
				]
			},
		]
	},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})

export class UserRoleRoutingModule { }
