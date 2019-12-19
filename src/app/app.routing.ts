import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { RedirectAuthGuard } from './core/guards/redirect-auth.guard';

import { LoginComponent } from './components/views/public/auth/login/login.component';
import { LoginWeitComponent } from './components/views/public/auth/login-weit/login-weit.component';
import { LogoutComponent } from './components/views/public/auth/logout/logout.component';
import { ErrorComponent } from './components/shared/error/error.component';
import { BlockComponent } from './components/shared/block/block.component';
import { HomeComponent } from './components/shared/home/home.component';
import { RegisterComponent } from './components/views/public/auth/register/register.component';
import { HomeSuperComponent } from './components/views/private/super/home-super/home-super.component';

const routes: Routes =
[
	{path: '', redirectTo: 'login', pathMatch: 'full', canActivate: []},
	{path: 'login', component: LoginComponent, canActivate: []},
	{path: 'loginWeit', component: LoginWeitComponent, canActivate: []},
	{path: 'register', component: RegisterComponent},
	

	{path: 'auth', canActivate: [], component: HomeComponent,
		children:
		[
			{path: '', redirectTo: 'super', pathMatch: 'full', canActivate: []},
			{path: 'logout', component: LogoutComponent},

			{path: 'super', component: HomeSuperComponent},

			{path: 'client', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: '../app/components/views/private/client/client.module#ClientModule',
					}
				]
			},

			{path: 'lender', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: '../app/components/views/private/lender/lender.module#LenderModule',
					}
				]
			},

			{path: 'admin', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: '../app/components/views/private/admin/admin.module#AdminModule',
					}
				]
			},
		]
	},

	{path: '**', component: ErrorComponent},
    {path: 'block', component: BlockComponent},

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled' });