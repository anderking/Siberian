import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/public/auth.service';
import { UserService } from '../../../core/services/admin/user.service';
import { Global } from '../../..//core/services/global';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'sib-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

	public role:string;
	public user:any;
	public failedConect:string;
	public firstName:string=localStorage.getItem('firstName');
	functions: any;

	constructor
	(
		private _authService: AuthService,
		private _userService: UserService,
	)
	{ }

	ngOnInit()
	{
		let id = this._authService.getID();
		this.getUser(id);
		this.role=this._authService.getRole();
		//console.log(this.functions)
	}

	getUser(id) {
	  this._userService.getFunctions(id).subscribe(response => {
	    this.user = response.user;
			this.functions = this.user.role.functions;
	  }, error => {
	    console.log( < any > error);
	    if (error instanceof HttpErrorResponse) {
	      if (error.status === 0) {
	        this.failedConect = Global.failed;
	      }
	    }
	  })
	}

}
