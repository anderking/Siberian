import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/ui/material.module';
import { ServiceDetailRoutingModule } from './service-detail-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServiceDetailService } from 'src/app/core/services/admin/serviceDetail.service';
import { ActivityService } from 'src/app/core/services/admin/activity.service';
import { ResourceService } from 'src/app/core/services/admin/resource.service';
import { PolicyService } from 'src/app/core/services/admin/policy.service';
import { SkillService } from 'src/app/core/services/admin/skill.service';
import { ComponentService } from 'src/app/core/services/admin/component.service';
import { CategoryService } from 'src/app/core/services/admin/category.service';
import { SubcategoryService } from 'src/app/core/services/admin/subcategory.service';
import { EquipinfrasService } from 'src/app/core/services/admin/equipinfras.service';
import { VarietyService } from 'src/app/core/services/admin/variety.service';
import { VarietyDetailService } from 'src/app/core/services/admin/varietyDetail.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';

import { ServiceDetailComponent } from './service-detail.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServiceDetailCreateComponent } from './service-detail-create/service-detail-create.component';
import { ServiceDetailEditComponent } from './service-detail-edit/service-detail-edit.component';
import { ServiceDetailShowComponent } from './service-detail-show/service-detail-show.component';
import { ServiceDetailDeleteComponent } from './service-detail-delete/service-detail-delete.component';

import { AddActivityComponent } from './add-activity/add-activity.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { AddPoliticComponent } from './add-politic/add-politic.component';
import { AddSkillComponent } from './add-skill/add-skill.component';

import { ShowActivityDetailComponent } from './show-activity-detail/show-activity-detail.component';
import { ShowPoliticDetailComponent } from './show-politic-detail/show-politic-detail.component';
import { ShowResourceDetailComponent } from './show-resource-detail/show-resource-detail.component';
import { ShowSkillDetailComponent } from './show-skill-detail/show-skill-detail.component';





@NgModule({
  declarations: [
	ServiceDetailComponent,
	ServiceDetailsComponent,
	ServiceDetailCreateComponent,
	ServiceDetailEditComponent,
	ServiceDetailShowComponent,
  ServiceDetailDeleteComponent,
	AddActivityComponent,
	AddResourceComponent,
	AddPoliticComponent,
	AddSkillComponent,
	ShowActivityDetailComponent,
	ShowPoliticDetailComponent,
	ShowResourceDetailComponent,
	ShowSkillDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ServiceDetailRoutingModule
  ],
  providers:
  [
    ServiceDetailService,
    ActivityService,
    ResourceService,
    PolicyService,
    SkillService,
    ComponentService,
    CategoryService,
    SubcategoryService,
    EquipinfrasService,
    VarietyService,
    VarietyDetailService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
  ],
})
export class ServiceDetailModule { }
