import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../../../core/ui/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';

import { RoleService } from 'src/app/core/services/admin/role.service';
import { FunctionService } from 'src/app/core/services/admin/function.service';

import { FunctionRoutingModule } from './function-routing.module';
import { FunctionComponent } from './function.component';
import { FunctionsComponent } from './functions/functions.component';
import { FunctionCreateComponent } from './function-create/function-create.component';
import { FunctionEditComponent } from './function-edit/function-edit.component';
import { FunctionShowComponent } from './function-show/function-show.component';

@NgModule({
  declarations: [
	FunctionComponent,
	FunctionsComponent,
	FunctionCreateComponent,
	FunctionEditComponent,
	FunctionShowComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FunctionRoutingModule,
    FormsModule
  ],
  providers:
  [
    RoleService,
    FunctionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
  ],
})
export class FunctionModule { }
