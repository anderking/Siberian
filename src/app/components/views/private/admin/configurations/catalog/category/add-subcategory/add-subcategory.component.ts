import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global'
import { CategoryService } from 'src/app/core/services/admin/category.service';
import { SubcategoryService } from '../../../../../../../../core/services/admin/subcategory.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'sib-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss']
})
export class AddSubcategoryComponent implements OnInit {

  public category: Category;
  public subcategories: any;
  public subcategoriesSelected:any;
  public total:number;
  public message: string;
  public failedConect: string;
  
  constructor
  (
    private _subcategoryService: SubcategoryService,
    private _categoryService: CategoryService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _location: Location,
    private snackBar: SnackBarService
  ) 
  { }

  ngOnInit() 
  {
    this._route.params.subscribe
    (
      params =>
      {
        let id = params.id;
        this.getCategory(id);
      }
      );
    this.getSubcategories();
  }

  getSubcategories()
  {
    this._subcategoryService.All().subscribe
    (
      response =>
      {
        if (response.status == true)
        {
          this.subcategories = response.subcategories;
          console.log(this.subcategories);
        }
        else
        {
          this.total = 0;
          this.message = response.message.text;
          console.log(this.message);
        }

      },
      error => 
      {
        console.log(<any>error);
        if (error instanceof HttpErrorResponse)
        {
          if (error.status === 0)
          {
            this.failedConect = Global.failed;
          }
        }
      }
      )
  }

  getCategory(id)
  {
    this._categoryService.getOne(id).subscribe
    (
      response =>
      {
        this.category = response.category;

        if(this.category.subcategories)
        {
          this.subcategoriesSelected = [];
          for(let subcategory of this.category.subcategories)
          {
            this.subcategoriesSelected.push(subcategory.id);
          }
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

  update(form: NgForm)
  {

    if(form.valid)
    {
      this._categoryService.addSubcategory(this.category.id,form.value.subcategories).subscribe
      (
        response =>
        {
          if(response.status==true)
          {
            console.log(response);
            this.message  = response.message.text;
            this.messageSnackBar(this.message);
            this.getCategory(this.category.id);
          }
          else
          {
            console.log(response);
            this.message  = response.message.text;
            this.messageSnackBar(this.message);
            this.getCategory(this.category.id);
          }
        },
        error =>
        {
          console.log(error);
          this.message  = error.error.message;
          this.snackBar.openSnackBar(this.message,'');
        }
        );
    }
    
  }

  messageSnackBar(message)
  {
    this.snackBar.openSnackBarSuccess(message);
  }

  goBack()
  {
    this._location.back();
  }

}
