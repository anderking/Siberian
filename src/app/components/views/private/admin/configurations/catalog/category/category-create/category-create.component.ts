import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global'
import { Category } from '../../../../../../../../models/category';
import { CategoryService } from '../../../../../../../../core/services/admin/category.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';

@Component({
  selector: 'sib-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {
	
	public category:Category;
	public message:string;

	constructor
	(
		private _categoryService: CategoryService,
		private _router: Router,
		private _location: Location,
		private snackBar: SnackBarService,
		)
	{
		this.category = new Category();
	}

	ngOnInit()
	{

	}

	register(form: NgForm)
	{
		if(form.valid)
		{
			console.log(form.value);
			this.category.name = form.value.name;
			this.category.description = form.value.description;

			this._categoryService.create(this.category).subscribe
			(
				response =>
				{
					if (response.status==true)
					{
						console.log(response);
						//this.category = response.category
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
