import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/core/services/dialog.service';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Global } from 'src/app/core/services/global';
import { Category } from 'src/app/models/category';
import { Subcategory } from 'src/app/models/subcategory';
import { CategoryService } from 'src/app/core/services/admin/category.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { SubcategoryService } from 'src/app/core/services/admin/subcategory.service';

@Component({
  selector: 'sib-category-show',
  templateUrl: './category-show.component.html',
  styleUrls: ['./category-show.component.scss']
})
export class CategoryShowComponent implements OnInit
{

	public category:Category;
	public arrayCategory:any;
	public subcategories: Array < Subcategory > = new Array < Subcategory > ();
	public message:string;
	public failedConect:string;

	displayedColumns: string[] = ['name','description','status'];
	dataSource: MatTableDataSource<Subcategory>;


	displayedColumnsC: string[] = ['name', 'description','subcategories','status'];
	dataSourceC: MatTableDataSource<Category>;

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor
	(
		private _categoryService: CategoryService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _location: Location,
		private snackBar: SnackBarService,
		private dialogService: DialogService,
		)
	{

	}

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
	}


	getCategory(id)
	{
		this._categoryService.getOne(id).subscribe
		(
			response =>
			{
				if (response.status==true)
				{
					this.category = response.category;
					this.arrayCategory = [];
					this.arrayCategory.push(this.category);
					console.log(this.category);
					this.subcategories = response.category.subcategories;

					if(this.subcategories.length>0)
					{
						console.log(this.subcategories);
						this.table();
					}
					else
					{
						this.subcategories = [];
						console.log(this.subcategories);
						this.table();
					}
				}
				else
				{
					console.log(response);
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
		this.dataSourceC = new MatTableDataSource(this.arrayCategory);
		this.dataSource.paginator = this.paginator;
	}

	goBack()
	{
		this._location.back();
	}


}

