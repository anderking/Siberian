import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/ui/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParametroService } from 'src/app/core/services/admin/parametro.service';
import { GroupService } from 'src/app/core/services/admin/group.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';

import { ParametroRoutingModule } from './parametro-routing.module';
import { ParametroComponent } from './parametro.component';
import { ParametrosComponent } from './parametros/parametros.component';
import { ParametroCreateComponent } from './parametro-create/parametro-create.component';
import { ParametroEditComponent } from './parametro-edit/parametro-edit.component';
import { ParametroShowComponent } from './parametro-show/parametro-show.component';

@NgModule({
  declarations: [
	ParametroComponent,
	ParametrosComponent,
	ParametroCreateComponent,
	ParametroEditComponent,
	ParametroShowComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ParametroRoutingModule
  ],
  providers:
  [
    ParametroService,
    GroupService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
  ],
})
export class ParametroModule { }
