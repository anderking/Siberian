import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../../core/ui/material.module';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyCreateComponent } from './company-create/company-create.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { CompanyShowComponent } from './company-show/company-show.component';
import { CompanyDeleteComponent } from './company-delete/company-delete.component';
import { CompaniesAllComponent } from './companies-all/companies-all.component';
import { CompanyService } from 'src/app/core/services/admin/company.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';

@NgModule({
  declarations: [
	CompanyComponent,
	CompaniesComponent,
	CompanyCreateComponent,
	CompanyEditComponent,
	CompanyShowComponent,
	CompanyDeleteComponent,
	CompaniesAllComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    CompanyRoutingModule
  ],
  providers:
  [
    CompanyService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
    
   ],
})
export class CompanyModule { }
