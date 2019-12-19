import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { NotificationComponent } from "./notification.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { NotificationCreateComponent } from "./notification-create/notification-create.component";
import { NotificationEditComponent } from './notification-edit/notification-edit.component';
import { NotificationShowComponent } from './notification-show/notification-show.component';

const routes: Routes = [

	{path: '', component: NotificationComponent, canActivate: [],
		children:
		[
			{path: '', component: NotificationsComponent},
			{path: 'create', component: NotificationCreateComponent},
			{path: 'edit/:id', component: NotificationEditComponent},
			{path: 'show/:id', component: NotificationShowComponent},
		]
	},

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class NotificationRoutingModule { }
