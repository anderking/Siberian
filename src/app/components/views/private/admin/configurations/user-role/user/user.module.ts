import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../../../core/ui/material.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UsersComponent } from './users/users.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserShowComponent } from './user-show/user-show.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserService } from 'src/app/core/services/admin/user.service';
import { RoleService } from 'src/app/core/services/admin/role.service';
import { LocationService } from 'src/app/core/services/admin/location.service';
import { PhoneService } from 'src/app/core/services/admin/phone.service'
import { ChangeRoleService } from 'src/app/core/services/admin/change-role.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';
import { UserInactivesComponent } from './user-inactives/user-inactives.component';
import { UserActivesComponent } from './user-actives/user-actives.component';
import { UserAllsComponent } from './user-alls/user-alls.component';
import { UserClientComponent } from './user-client/user-client.component';
import { UserLenderComponent } from './user-lender/user-lender.component';

@NgModule({
  declarations: [
	UserComponent,
	UsersComponent,
	UserCreateComponent,
	UserEditComponent,
	UserShowComponent,
	UserDeleteComponent,
	UserInactivesComponent,
	UserActivesComponent,
	UserAllsComponent,
	UserClientComponent,
	UserLenderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    UserRoutingModule
  ],
  providers:
  [
    UserService,
    RoleService,
    LocationService,
    PhoneService,
    ChangeRoleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
    
   ],
})
export class UserModule { }
