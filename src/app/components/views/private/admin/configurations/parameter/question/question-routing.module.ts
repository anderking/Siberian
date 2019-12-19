import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { QuestionComponent } from './question.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionCreateComponent } from './question-create/question-create.component';
import { QuestionDeleteComponent } from './question-delete/question-delete.component';
import { QuestionEditComponent } from './question-edit/question-edit.component';
import { QuestionShowComponent } from './question-show/question-show.component';

const routes: Routes = [

	{path: '', component: QuestionComponent, canActivate: [],
		children:
		[
			{path: '', component: QuestionsComponent},
			{path: 'create', component: QuestionCreateComponent},
			{path: 'edit/:id', component: QuestionEditComponent},
			{path: 'show/:id', component: QuestionShowComponent},
			{path: 'delete/:id', component: QuestionDeleteComponent}
		]
	},

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
	  RouterModule
	]
})
export class QuestionRoutingModule { }
