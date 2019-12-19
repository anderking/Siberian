import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';
import { ConfigurationsComponent } from './configurations/configurations.component';


const routes: Routes = [

	{path: '', component: ConfigurationComponent, canActivate: [],
		children:
		[
			{path: '', component: ConfigurationsComponent},
			{path: 'catalog', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: './catalog/catalog.module#CatalogModule',
					}
				]
			},
			
			{path: 'company', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: './company/company.module#CompanyModule',
					}
				]
			},
			{path: 'parameter', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: '../configurations/parameter/parameter.module#ParameterModule',
					}
				]
			},
			{path: 'service', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: './service/service.module#ServiceModule',
					}
				]
			},
			{path: 'service-detail', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: './service-detail/service-detail.module#ServiceDetailModule',
					}
				]
			},	
			{path: 'lender', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: './lender/lender.module#LenderModule',
					}
				]
			},
			{path: 'user-role', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: './user-role/user-role.module#UserRoleModule',
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

export class ConfigurationRoutingModule { }
