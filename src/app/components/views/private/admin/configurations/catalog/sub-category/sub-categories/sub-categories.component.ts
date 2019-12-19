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
import { Subcategory } from '../../../../../../../../models/subcategory';
import { SubcategoryService } from '../../../../../../../../core/services/admin/subcategory.service';

@Component({
  selector: 'sib-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent implements OnInit {

  public subcategories: Array < Subcategory > = new Array < Subcategory > ();
  public subcategory:any;
  public message:string;
  public failedConect:string;

  displayedColumns: string[] = ['id', 'name', 'description', 'category', 'status','edit','delete'];
  dataSource: MatTableDataSource<Subcategory>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor
  (
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _subcategoryService: SubcategoryService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  )
  {
    
  }

  ngOnInit()
  {
    this.getSubcategories();
  }

  getSubcategories()
  {
    this._subcategoryService.All().subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.subcategories = response.subcategories;
          console.log(this.subcategories);
          this.table();
        }
        else
        {
          this.subcategories = [];
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
    this.subcategories = this.snackBar.orderByDateAsc(this.subcategories);
    this.dataSource = new MatTableDataSource(this.subcategories);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onDelete(id){
    this.dialogService.openConfirmDialog('¿Estás seguro de eliminar esta Subcategoría?').afterClosed().subscribe
    (
      response =>
      {
        if (response==true)
        {
          this.getSubcategory(id);
        }else
        {
          console.log(response);
        }
      }
    );
  }

  getSubcategory(id)
  {
    this._subcategoryService.getOne(id).subscribe
    (
      response =>
      {
        this.subcategory = response.subcategory;
        this.update(this.subcategory);
      },
      error =>
      {
        console.log(<any>error);
      }
    )
  }

  update(subcategory)
  {
    subcategory.status = 'deleted';
    this._subcategoryService.update(subcategory).subscribe
    (
      response =>
      {
        if(response.status==true)
        {
          this.getSubcategories();
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

  goBack(){
    this._location.back();
  }
}
