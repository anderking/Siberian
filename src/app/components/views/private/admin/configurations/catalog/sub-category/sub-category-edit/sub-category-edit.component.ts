import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global';
import {Location} from '@angular/common';
import { Category } from '../../../../../../../../models/category';
import { CategoryService } from '../../../../../../../../core/services/admin/category.service';
import { Subcategory } from '../../../../../../../../models/subcategory';
import { SubcategoryService } from '../../../../../../../../core/services/admin/subcategory.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';


@Component({
  selector: 'sib-sub-category-edit',
  templateUrl: './sub-category-edit.component.html',
  styleUrls: ['./sub-category-edit.component.scss']
})
export class SubCategoryEditComponent implements OnInit {

	public subcategory: any;
	public categories:any;
	public updateSubcategory:any;
	public failedConect:string;
	public message:string;

	constructor
	(
		private _subcategoryService: SubcategoryService,
		private _categoryService: CategoryService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _location: Location,
    	private snackBar: SnackBarService
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
				this.getSubcategory(id);
			}
		);
		this.getCategories();
	}

	getCategories()
	{
		this._categoryService.All().subscribe
		(
			response =>
			{
				this.categories = response.categories;
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

	getSubcategory(id)
	{
		this._subcategoryService.getOne(id).subscribe
		(
			response =>
			{
				this.subcategory = response.subcategory;
				console.log(this.subcategory);
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
		this.subcategory.CategoryId = form.value.CategoryId;
		if(form.valid)
		{
			this._subcategoryService.update(this.subcategory).subscribe
			(
				response =>
				{
					if(response.status==true)
					{
						this.message  = response.message.text;
						this.snackBar.openSnackBar(this.message,'');
						this.getSubcategory(this.subcategory.id);
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
		}else
		{
		}
		
	}

	goBack(){
		this._location.back();
	  }

}
