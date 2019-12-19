import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../../core/ui/material.module';
import { UserRoleRoutingModule } from './user-role-routing.module';
import { UserRoleComponent } from './user-role.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';

import { RoleService } from 'src/app/core/services/admin/role.service';
import { FunctionService } from 'src/app/core/services/admin/function.service';

@NgModule({
  declarations:
  [
  	UserRoleComponent,
  ],
  imports: [
    CommonModule,
    UserRoleRoutingModule,
    MaterialModule,
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

export class UserRoleModule { }
