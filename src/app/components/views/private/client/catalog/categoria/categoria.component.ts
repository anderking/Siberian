import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../core/services/global';
import { CatalogueService } from '../../../../../../core/services/client/catalogue.service';


@Component({
  selector: 'sib-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  public categories:any;
  public total:number;
  public message:string;
  public failedConect:string;

  constructor
  (
    private _catalogueService: CatalogueService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
    )
  {

  }

  ngOnInit()
  {
    this.getCategories();
  }

  getCategories()
  {
    this._catalogueService.getCategories().subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.categories = response.categories;
          console.log(this.categories);
        }
        else
        {
          this.total =0;
          this.message = response.message.text;
          console.log(this.message);
        }

      },
      error =>
      {
        console.log(<any>error);
        if(error instanceof HttpErrorResponse)
        {
          if(error.status===0)
          {
            this.failedConect = Global.failed;
          }
        }
      }
      )
  }

  goBack()
  { 
    this._location.back(); 
  }

}
