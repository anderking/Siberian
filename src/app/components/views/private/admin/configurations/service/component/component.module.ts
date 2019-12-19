import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../../../core/ui/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentService } from 'src/app/core/services/admin/component.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';

import { ComponentRoutingModule } from './component-routing.module';
import { ComponentComponent } from './component.component';
import { ComponentsComponent } from './components/components.component';
import { ComponentCreateComponent } from './component-create/component-create.component';
import { ComponentEditComponent } from './component-edit/component-edit.component';
import { ComponentShowComponent } from './component-show/component-show.component';
import { ComponentDeleteComponent } from './component-delete/component-delete.component';
import { AddServiceDetailComponent } from './add-service-detail/add-service-detail.component';

@NgModule({
  declarations: [
	ComponentComponent,
	ComponentsComponent,
	ComponentCreateComponent,
	ComponentEditComponent,
	ComponentShowComponent,
	ComponentDeleteComponent,
	AddServiceDetailComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ComponentRoutingModule
  ],
  providers:
  [
    ComponentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
  ],
})
export class ComponentModule { }
