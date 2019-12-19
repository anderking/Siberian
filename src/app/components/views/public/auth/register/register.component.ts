import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../core/services/global';
import { User } from '../../../../../models/user';
import { UserService } from '../../../../../core/services/admin/user.service';
import { AuthService } from '../../../../../core/services/public/auth.service';
import { SnackBarService } from '../../../../../core/services/snack-bar.service';

@Component({
  selector: 'sib-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	public user:any;
  public email:string;
  public password:string;
  public firstName:string;
  public lastName:string;
  public dni:string;
  public dniType:string;

  public message:string;
  public dniTypes:any[];
  public dniTypeSelected:string="";
  public resID:string;

  constructor
  (
    private _router: Router,
    private authService: AuthService,
    private _userService: UserService,
    private _location: Location,
    private snackBar: SnackBarService
  )
  {
  	this.dniTypes= [
      {id:"",name:"Seleccione un Tipo de Dni"},
      {id:"v",name:"Venezolano"},
      {id:"e",name:"Extranjero"},
    ];

    this.user = new User();
  }

  ngOnInit() {
  }


  register(form: NgForm)
  {
    if(form.valid)
    {
      this.email = form.form.value.email;
      this.password = form.form.value.password;
      this.firstName = form.form.value.firstName;
      this.lastName = form.form.value.lastName;
      this.dniType = form.form.value.dniType;
      this.dni = form.form.value.dni;

      this.authService.register(this.email,this.password,this.firstName,this.lastName,this.dni,this.dniType).subscribe
      (
        response =>
        {
          if (response.status==true)
          {
            console.log(response);
            this.resID = response.user.id;
            this.message = response.message.text;
            this.messageSnackBar(this.message);
            setTimeout
            (
              () =>
              {
                this.loginRedirect(response);
              },
              2000
            );
          }
          else
          {
            console.log(response);
            this.message = response.message.text;
            this.messageSnackBar(this.message);
          }
        },
        error =>
        {
          console.log(error);

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
            //this.message = error.error.message;
            console.log(error);
            //this.messageSnackBar(this.message);
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
    this._router.navigate(['/loginWeit']);
  }

}
