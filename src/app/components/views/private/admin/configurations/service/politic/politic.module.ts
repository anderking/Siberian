import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../../../core/ui/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PolicyService } from 'src/app/core/services/admin/policy.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';

import { PoliticRoutingModule } from './politic-routing.module';
import { PoliticComponent } from './politic.component';
import { PoliticsComponent } from './politics/politics.component';
import { PoliticCreateComponent } from './politic-create/politic-create.component';
import { PoliticEditComponent } from './politic-edit/politic-edit.component';
import { PoliticShowComponent } from './politic-show/politic-show.component';
import { PoliticDeleteComponent } from './politic-delete/politic-delete.component';

@NgModule({
  declarations: [
	PoliticComponent,
	PoliticsComponent,
	PoliticCreateComponent,
	PoliticEditComponent,
	PoliticShowComponent,
	PoliticDeleteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    PoliticRoutingModule
  ],
  providers:
  [
    PolicyService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
  ],
})
export class PoliticModule { }
