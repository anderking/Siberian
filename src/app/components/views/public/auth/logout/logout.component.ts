import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../core/services/public/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {


  constructor
  (
  	private _authService: AuthService,
  ){ }

  ngOnInit()
  {
  	this._authService.logoutClear();
  	var actualRoute = window.location.origin;
    window.location.replace(actualRoute+'/login/');
  }

}
