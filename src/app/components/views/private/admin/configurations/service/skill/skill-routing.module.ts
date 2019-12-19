import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SkillComponent } from './skill.component';
import { SkillsComponent } from './skills/skills.component';
import { SkillCreateComponent } from './skill-create/skill-create.component';
import { SkillEditComponent } from './skill-edit/skill-edit.component';
import { SkillShowComponent } from './skill-show/skill-show.component';
import { SkillDeleteComponent } from './skill-delete/skill-delete.component';

const routes: Routes = [

	{path: '', component: SkillComponent, canActivate: [],
		children:
		[
			{path: '', component: SkillsComponent},
			{path: 'create', component: SkillCreateComponent},
			{path: 'edit/:id', component: SkillEditComponent},
			{path: 'show/:id', component: SkillShowComponent},
			{path: 'delete/:id', component: SkillDeleteComponent}
		]
	},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class SkillRoutingModule { }
