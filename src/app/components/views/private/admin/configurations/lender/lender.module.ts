import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/ui/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';

import { UserService } from 'src/app/core/services/admin/user.service';
import { SkillService } from 'src/app/core/services/admin/skill.service';

import { LenderRoutingModule } from './lender-routing.module';
import { LenderComponent } from './lender.component';
import { LendersComponent } from './lenders/lenders.component';
import { LenderCreateComponent } from './lender-create/lender-create.component';
import { LenderEditComponent } from './lender-edit/lender-edit.component';
import { LenderShowComponent } from './lender-show/lender-show.component';
import { AddSkillLenderComponent } from './add-skill-lender/add-skill-lender.component';

@NgModule({
  declarations: [
  	LenderComponent,
  	LendersComponent,
  	LenderCreateComponent,
  	LenderEditComponent,
  	LenderShowComponent,
    AddSkillLenderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    LenderRoutingModule
  ],
  providers:
  [
    UserService,
    SkillService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
  ],
})
export class LenderModule { }
