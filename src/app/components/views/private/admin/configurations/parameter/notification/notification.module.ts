import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "src/app/core/ui/material.module";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/admin/notification.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';

import { NotificationRoutingModule } from "./notification-routing.module";
import { NotificationComponent } from "./notification.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { NotificationCreateComponent } from "./notification-create/notification-create.component";
import { NotificationEditComponent } from './notification-edit/notification-edit.component';
import { NotificationShowComponent } from './notification-show/notification-show.component';

@NgModule({
  declarations: [
    NotificationComponent,
    NotificationsComponent,
    NotificationCreateComponent,
    NotificationEditComponent,
    NotificationShowComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NotificationRoutingModule
  ],
  providers:
  [
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
  ],
})
export class NotificationModule {}
