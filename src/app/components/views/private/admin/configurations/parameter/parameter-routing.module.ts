import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ParameterComponent } from './parameter.component';
import { ParametersComponent } from './parameters/parameters.component';

const routes: Routes = [

	{path: '', component: ParameterComponent, canActivate: [],
		children:
		[
			{path: '', component: ParametersComponent},
			{path: 'promotion', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: './promotion/promotion.module#PromotionModule',
					}
				]
			},
			{path: 'parametro', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: './parametro/parametro.module#ParametroModule',
					}
				]
			},
			{path: 'group', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: './group/group.module#GroupModule',
					}
				]
			},
			{path: 'promotion-target', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: './promotion-target/promotion-target.module#PromotionTargetModule',
					}
				]
			},
			{path: 'motive', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: './motive/motive.module#MotiveModule',
					}
				]
			},
			{path: 'question', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: './question/question.module#QuestionModule',
					}
				]
			},
			{path: 'notification', canActivate: [],
				children:
				[
					{
						path: '',
		                loadChildren: './notification/notification.module#NotificationModule',
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

export class ParameterRoutingModule { }
