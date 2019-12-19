import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/public/auth.service';
import { Router, NavigationEnd, NavigationStart  } from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  public ruta:string;
  public loginWeit:boolean;
  private lastPoppedUrl: string | undefined;
  private yScrollStack: number[] = [];
  private baseScrollOptions: ScrollToOptions = {
    left: 0,
    top: 0,
    
  };

  constructor(
  	private _authService: AuthService,
    private router: Router,
    private location: Location

    ){}

  ngOnInit() {

    this.router.events.subscribe((ev: any) => {
      const sidenavContentElement = document.querySelector(
        '.mat-sidenav-content',
        );
      if (!sidenavContentElement) {
        return;
      }
      if (ev instanceof NavigationStart) {
        if (ev.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(sidenavContentElement.scrollTop);
        }
      } else if (ev instanceof NavigationEnd) {
        if (ev.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          sidenavContentElement.scroll({
            ...this.baseScrollOptions,
            top: this.yScrollStack.pop(),
          });
        } else {
          sidenavContentElement.scroll(this.baseScrollOptions);
        }
      }
    });
  }
}
