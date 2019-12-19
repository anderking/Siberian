import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global';

import { Equipinfras } from '../../../../../../../../models/equipinfras';
import { Promotion } from '../../../../../../../../models/promotion';
import { Parametro} from '../../../../../../../../models/parametro';
import { Subcategory } from '../../../../../../../../models/subcategory';
import { PromotionService } from '../../../../../../../../core/services/admin/promotion.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';
import { DialogService } from '../../../../../../../../core/services/dialog.service';

@Component({
  selector: 'sib-promotion-show',
  templateUrl: './promotion-show.component.html',
  styleUrls: ['./promotion-show.component.scss']
})
export class PromotionShowComponent implements OnInit {

    public promotion:Promotion;
    public arrayPromotion:any;
    public parameters: Array < Parametro > = new Array < Parametro >();
	public message:string;
	public failedConect:string;

  	
	displayedColumns: string[] = ['name','description','type','EquipinfraId','SubcategoryId','percentDiscount','dateStart','dateEnd','status'];
	dataSource: MatTableDataSource<Promotion>;

	displayedColumnsP: string[] = ['name','description','status'];
  	dataSourceP: MatTableDataSource<Parametro>;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

  constructor(

    private _promotionService: PromotionService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _location: Location,
		private snackBar: SnackBarService,
    	private dialogService: DialogService,
  ) { }

  ngOnInit() {
    this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getPromotion(id);
			}
			);
  }

  getPromotion(id)
	{
		this._promotionService.getOne(id).subscribe
		(
			response =>
			{
				if (response.status==true)
				{
					this.promotion = response.promotions;

					this.arrayPromotion = [];
					this.arrayPromotion.push(this.promotion);
					console.log(this.arrayPromotion);
					//this.table();
					this.parameters = response.promotions.parameters;
					
					if(this.parameters.length>0)
					{
						console.log(this.parameters);
						this.table();
					}
					else
					{
						this.parameters = [];
						console.log(this.parameters);
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
		this.dataSourceP = new MatTableDataSource(this.parameters);
		this.dataSource = new MatTableDataSource(this.arrayPromotion);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
  }
  
  goBack(){
		this._location.back();
	  }
}

