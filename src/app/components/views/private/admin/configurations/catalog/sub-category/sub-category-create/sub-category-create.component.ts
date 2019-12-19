import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global'
import { Subcategory } from '../../../../../../../../models/subcategory';
import { SubcategoryService } from '../../../../../../../../core/services/admin/subcategory.service';
import { Category } from '../../../../../../../../models/category';
import { CategoryService } from '../../../../../../../../core/services/admin/category.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';

@Component({
	selector: 'sib-sub-category-create',
	templateUrl: './sub-category-create.component.html',
	styleUrls: ['./sub-category-create.component.scss']
})
export class SubCategoryCreateComponent implements OnInit {

	public subcategory:Subcategory;
	public categories:Category;
	public name:string;
	public description:string;
	public CategoryId:string;
	public message:string;
	public failedConect:string;
	public total:Number;

	constructor
	(
		private _categoryService: CategoryService,
		private _subcategoryService: SubcategoryService,
		private _router: Router,
		private _location: Location,
		private snackBar: SnackBarService
		)
	{
		this.subcategory = new Subcategory();
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
					this.CategoryId = "";
					console.log(this.categories);
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

	register(form: NgForm)
	{
		if(form.valid)
		{
			console.log(form.value);
			this.subcategory.name = form.value.name;
			this.subcategory.description = form.value.description;
			this.subcategory.CategoryId = form.value.CategoryId;

			this._subcategoryService.create(this.subcategory).subscribe
			(
				response =>
				{
					if (response.status==true)
					{
						console.log(response);
						this.message = response.message.text;
						form.reset();
						this.messageSnackBar(this.message); 
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

	messageSnackBar(message)
	{
		this.snackBar.openSnackBarSuccess(message);
	}

	goBack(){
		this._location.back();
	}

}
