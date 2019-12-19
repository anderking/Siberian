import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../../../../../../../../core/services/dialog.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';

import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global';
import { Category } from '../../../../../../../../models/category';
import { CategoryService } from '../../../../../../../../core/services/admin/category.service';


@Component({
  selector: 'sib-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public category:any;
  public updateCategory:any;
  public categories: Array < Category > = new Array < Category > ();
  public message:string;
  public failedConect:string;
  public total:Number=0;

	displayedColumns: string[] = ['id', 'name', 'description','subcategories','status','addSubcategory','edit','delete'];
  dataSource: MatTableDataSource<Category>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor
  (
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _categoryService: CategoryService,
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
    this._categoryService.All().subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.categories = response.categories;
          this.total = this.categories.length;
          console.log(this.categories);
          this.table();
        }
        else
        {
          this.categories = [];
          this.message = response.message.text;
          console.log(this.message);
          this.table();
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

  applyFilter(filterValue: string)
  {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  table()
  {
    this.categories = this.snackBar.orderByDateAsc(this.categories);
    this.dataSource = new MatTableDataSource(this.categories);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onDelete(id){
    this.dialogService.openConfirmDialog('¿Estás seguro de eliminar esta Categoría?').afterClosed().subscribe
    (
      response =>
      {
        if (response==true)
        {
          this.getCategory(id);
        }else
        {
          console.log(response);
        }
      }
    );
  }

  getCategory(id)
  {
    this._categoryService.getOne(id).subscribe
    (
      response =>
      {
        this.category = response.category;
        this.update(this.category);
      },
      error =>
      {
        console.log(<any>error);
      }
    )
  }

  update(category)
  {
    category.status = 'deleted';
    this._categoryService.update(category).subscribe
    (
      response =>
      {
        if(response.status==true)
        {
          this.getCategories();
          this.snackBar.openSnackBar('Eliminado Correctamente','');
        }
        else
        {
          this.message  = response.message.text;
          this.snackBar.openSnackBar(this.message,'');
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

