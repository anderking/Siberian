import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileShowComponent } from './profile-show/profile-show.component';


const routes: Routes = [

	{path: '', component: ProfileComponent, canActivate: [],
		children:
		[
			{path: 'edit/:id', component: ProfileEditComponent},
			{path: 'show/:id', component: ProfileShowComponent},
		]
	},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class ProfileRoutingModule { }
