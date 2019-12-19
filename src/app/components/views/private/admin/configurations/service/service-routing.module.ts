import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ServiceComponent } from './service.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [

	{path: '', component: ServiceComponent, canActivate: [],
		children:
		[
			{path: '', component: ServicesComponent},

			{path: 'activity', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: './activity/activity.module#ActivityModule',
					}
				]
			},
			{path: 'component', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: './component/component.module#ComponentModule',
					}
				]
			},
			{path: 'politic', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: './politic/politic.module#PoliticModule',
					}
				]
			},
			{path: 'resource', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: './resource/resource.module#ResourceModule',
					}
				]
			},
			{path: 'skill', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: './skill/skill.module#SkillModule',
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

export class ServiceRoutingModule { }
