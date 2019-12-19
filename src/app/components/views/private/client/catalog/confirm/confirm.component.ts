import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../core/services/global';
import { CatalogueService } from '../../../../../../core/services/client/catalogue.service';


@Component({
  selector: 'sib-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  public category:any;
  public subcategory:any;
  public equipinfras:any;
  public variety:any;
  public varietyDetail:any;
  
  public categoryName:string;
  public subcategoryName:string;
  public equipinfrasName:string;
  public varietyName:string;
  public varietyDetailName:string;
  public varietyDetailDescription:string;

  public requestParams:any;

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
    this._route.params.subscribe
    (
      params =>
      {
        this.requestParams = JSON.stringify(params);
        console.log(this.requestParams);
        this.categoryName= localStorage.getItem('categoryName');;
        this.subcategoryName= params.subcategoryName;
        this.equipinfrasName= params.equipinfrasName;
        this.varietyName= params.varietyName;
        this.varietyDetailName= params.varietyDetailName
        this.varietyDetailDescription= params.varietyDetailDescription;
      }
      );
  }


  goBack()
  { 
    this._location.back(); 
  }

}
