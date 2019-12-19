import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/ui/material.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileShowComponent } from './profile-show/profile-show.component';
import { UserService } from 'src/app/core/services/admin/user.service'
import { LocationService } from 'src/app/core/services/admin/location.service'
import { PhoneService } from 'src/app/core/services/admin/phone.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';

@NgModule({
  declarations:
  [
    ProfileComponent,
    ProfileEditComponent,
    ProfileShowComponent,
  ],
  imports:
  [
    CommonModule,
    MaterialModule,
    FormsModule,
    ProfileRoutingModule
  ],
  providers:
  [
    UserService,
    LocationService,
    PhoneService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
    
   ],
})
export class ProfileModule { }
