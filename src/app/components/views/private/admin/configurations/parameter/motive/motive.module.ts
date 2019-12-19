import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/ui/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MotiveService } from 'src/app/core/services/admin/motive.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';

import { MotiveRoutingModule } from './motive-routing.module';
import { MotiveComponent } from './motive.component';
import { MotivesComponent } from './motives/motives.component';
import { MotiveCreateComponent } from './motive-create/motive-create.component';
import { MotiveEditComponent } from './motive-edit/motive-edit.component';
import { MotiveShowComponent } from './motive-show/motive-show.component';
import { MotiveDeleteComponent } from './motive-delete/motive-delete.component';

@NgModule({
  declarations: [
	MotiveComponent,
	MotivesComponent,
	MotiveCreateComponent,
	MotiveEditComponent,
  MotiveShowComponent,
  MotiveDeleteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    MotiveRoutingModule
  ],
  providers:
  [
    MotiveService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
  ],
})
export class MotiveModule { }
