import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../../../core/ui/material.module';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResourceService } from 'src/app/core/services/admin/resource.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';


import { ResourceRoutingModule } from './resource-routing.module';
import { ResourceComponent } from './resource.component';
import { ResourcesComponent } from './resources/resources.component';
import { ResourceCreateComponent } from './resource-create/resource-create.component';
import { ResourceEditComponent } from './resource-edit/resource-edit.component';
import { ResourceShowComponent } from './resource-show/resource-show.component';
import { ResourceDeleteComponent } from './resource-delete/resource-delete.component';

@NgModule({
  declarations: [
	ResourceComponent,
	ResourcesComponent,
	ResourceCreateComponent,
	ResourceEditComponent,
	ResourceShowComponent,
	ResourceDeleteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ResourceRoutingModule
  ],
  providers:
  [
    ResourceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
  ],
})
export class ResourceModule { }
