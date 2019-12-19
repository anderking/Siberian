import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../../../core/ui/material.module';
import { QuestionRoutingModule } from './question-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionService } from 'src/app/core/services/admin/question.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';

import { QuestionComponent } from './question.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionCreateComponent } from './question-create/question-create.component';
import { QuestionEditComponent } from './question-edit/question-edit.component';
import { QuestionShowComponent } from './question-show/question-show.component';
import { QuestionDeleteComponent } from './question-delete/question-delete.component';

@NgModule({
  declarations: [
    QuestionComponent, 
    QuestionsComponent, 
    QuestionCreateComponent, 
    QuestionEditComponent, 
    QuestionShowComponent, 
    QuestionDeleteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    QuestionRoutingModule
  ],
  providers:
  [
    QuestionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
  ],
})
export class QuestionModule { }
