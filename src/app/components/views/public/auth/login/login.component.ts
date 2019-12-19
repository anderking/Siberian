import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../core/services/public/auth.service';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from '../../../../../core/services/snack-bar.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public email:string="anderson@gmail.com";
  public password:string="123456";
  public message:string;
  public resID:string;

  constructor
  (
    private _authService: AuthService,
    private _router: Router,
    private snackBar: SnackBarService
  )
  {
  }

  ngOnInit() {
  }
  
  login(form: NgForm)
  {
    if(form.valid)
    {
      this._authService.login(this.email,this.password).subscribe
      (
        response =>
        {
          if (response.status==true)
          {
            console.log(response);
						this.resID = response.user.id;
						localStorage.setItem('functions', JSON.stringify(response.user.role.functions));
            this.loginRedirect(response);
          }
          else
          {
            this.message = response.message.text;
            this.messageSnackBar(this.message);
          }

        },
        error =>
        {
          if(error instanceof HttpErrorResponse)
          {
            if(error.status===404)
            {
              this.message = error.error.message;
              console.log(error);
              this.messageSnackBar(this.message);
            }
          }else
          {
            this.message = error.error.message;
            console.log(error);
            this.messageSnackBar(this.message);
          }
        }
      );
    }else
    {

    }
  }

  messageSnackBar(message){
    this.snackBar.openSnackBarSuccess(message);
  }

  loginRedirect(response)
  {
      localStorage.setItem('accessToken',response.accessToken);
      localStorage.setItem('resID', response.user.id);
      localStorage.setItem('role', response.user.role.id);
      localStorage.setItem('firstName', response.user.firstName);
      localStorage.setItem('lastName', response.user.lastName);
      this._router.navigate(['/loginWeit']);
      var actualRoute = window.location.origin;
      window.location.replace(actualRoute+'/perfil/'+this.resID);
  }

}
