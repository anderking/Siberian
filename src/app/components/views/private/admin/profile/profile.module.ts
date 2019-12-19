import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../core/ui/material.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileShowComponent } from './profile-show/profile-show.component';
import { UserService } from '../../../../../core/services/admin/user.service'

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
   ],
})
export class ProfileModule { }