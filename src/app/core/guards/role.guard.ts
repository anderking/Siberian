
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/public/auth.service';
import { UserService } from '../../core/services/admin/user.service';
import { User } from '../../models/user';
import { AuthGuard } from './auth.guard';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate{

  public user: User;

  constructor
  (
  	private _authService: AuthService,
    private _router: Router,
    private _userService: UserService,
    private _authguard: AuthGuard
  )
  {
    this.getUser(localStorage.getItem('resID'));
  }

  getUser(id)
  {
    this._userService.getOne(id).subscribe
    (
      response =>
      {
        this.user = response.user;
      },
      error =>
      {
        console.log(<any>error);
      }
    );
  }


 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
  {
    console.log(this.user);
    if(this.user)
    {
        if(this.user.lastName=="admin" || this.user.lastName=="member")
        {
          console.log("entro true en canactivate")
          return true
        }
      
    }
    else
    {
      this._router.navigate(['/block'])
      console.log("entro false en canactivate")
      return false
    }
  }

}
