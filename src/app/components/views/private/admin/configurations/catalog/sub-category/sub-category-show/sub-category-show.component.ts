import { Component, OnInit,ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../../../../../../../../core/services/dialog.service';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Global } from '../../../../../../../../core/services/global';
import { Subcategory } from '../../../../../../../../models/subcategory';
import { Equipinfras } from '../../../../../../../../models/equipinfras';
import { EquipinfrasService } from '../../../../../../../../core/services/admin/equipinfras.service';
import { SubcategoryService } from '../../../../../../../../core/services/admin/subcategory.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';

@Component({
  selector: 'sib-sub-category-show',
  templateUrl: './sub-category-show.component.html',
  styleUrls: ['./sub-category-show.component.scss']
})
export class SubCategoryShowComponent implements OnInit {

	public subcategory:Subcategory;
	public arraySubcategory:any;
	public equipinfras:Array < Equipinfras > = new Array < Equipinfras > ();
	public message:string;
	public failedConect:string;
	  
	displayedColumnsS: string[] = ['name','description','category','status'];
	dataSourceS: MatTableDataSource<Subcategory>; 

	displayedColumns: string[] = ['name','description','type','varieties','status'];
	  dataSource: MatTableDataSource<Equipinfras>;
	  
	 

	@ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


	constructor
	(
		private _subcategoryService: SubcategoryService,
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
	}

	getSubcategory(id)
	{
		this._subcategoryService.getOne(id).subscribe
		(
			response =>
			{
				if (response.status==true)
        {
          this.subcategory = response.subcategory;
          this.arraySubcategory = [];
          this.arraySubcategory.push(this.subcategory);
          console.log(this.subcategory);
          this.equipinfras = response.subcategory.equipinfras;
					
          if(this.equipinfras.length>0)
					{
						console.log(this.equipinfras);
						this.table();
					}
					else
					{
						this.equipinfras = [];
						console.log(this.equipinfras);
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
    this.dataSource = new MatTableDataSource(this.equipinfras);
    this.dataSourceS = new MatTableDataSource(this.arraySubcategory);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  goBack(){
	this._location.back();
  }

}


