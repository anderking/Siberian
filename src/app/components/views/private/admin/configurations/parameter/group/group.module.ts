import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/ui/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupService } from 'src/app/core/services/admin/group.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { GroupShowComponent } from './group-show/group-show.component';

@NgModule({
  declarations: [
	GroupComponent,
	GroupsComponent,
	GroupCreateComponent,
	GroupEditComponent,
	GroupShowComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    GroupRoutingModule
  ],
  providers:
  [
    GroupService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
  ],
})
export class GroupModule { }
