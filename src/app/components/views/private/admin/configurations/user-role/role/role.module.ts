import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../../../core/ui/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';

import { RoleService } from 'src/app/core/services/admin/role.service';
import { FunctionService } from 'src/app/core/services/admin/function.service';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { RolesComponent } from './roles/roles.component';
import { RoleCreateComponent } from './role-create/role-create.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RoleShowComponent } from './role-show/role-show.component';
import { RoleDeleteComponent } from './role-delete/role-delete.component';


@NgModule({
  declarations: [
	RoleComponent,
	RolesComponent,
	RoleCreateComponent,
	RoleEditComponent,
	RoleShowComponent,
	RoleDeleteComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RoleRoutingModule,
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
export class RoleModule { }
