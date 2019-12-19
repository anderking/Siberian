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
import { Variety } from '../../../../../../../../models/variety';
import { EquipinfrasService } from '../../../../../../../../core/services/admin/equipinfras.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';
import { DialogService } from '../../../../../../../../core/services/dialog.service';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.imgURL;


@Component({
	selector: 'sib-equip-infras-show',
	templateUrl: './equip-infras-show.component.html',
	styleUrls: ['./equip-infras-show.component.scss']
})
export class EquipInfrasShowComponent implements OnInit {

	public equipinfras:Equipinfras;
	public arrayEquip:any;
	public varieties:Array < Variety > = new Array < Variety > ();
	public message:string;
	public failedConect:string;
	public urldelafault: string="assets/img/request/revision_3.jpg"

	displayedColumns: string[] = ['id','name','description','varietyDetail','status','addvarietyDetail','delete'];
	dataSource: MatTableDataSource<Variety>;

	displayedColumnsE: string[] = ['name','description','category','subcategory','varieties','status'];
  	dataSourceE: MatTableDataSource<Equipinfras>;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;


	constructor(

		private _equipinfrasService: EquipinfrasService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _location: Location,
		private snackBar: SnackBarService,
    	private dialogService: DialogService,

		)

	{ }

	ngOnInit()
	{
		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.getEquipinfras(id);
			}
			);
	}

	getEquipinfras(id)
	{
		this._equipinfrasService.getOne(id).subscribe
		(
			response =>
			{
				if (response.status==true)
				{
					this.equipinfras = response.equipinfras;

					this.arrayEquip = [];
					this.arrayEquip.push(this.equipinfras);
					console.log(this.arrayEquip);
					
					this.varieties = response.equipinfras.varieties;
					
					if(this.varieties.length>0)
					{
						console.log(this.varieties);
						this.table();
					}
					else
					{
						this.varieties = [];
						console.log(this.varieties);
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
		this.varieties = this.snackBar.orderByDateAsc(this.varieties);
		this.dataSource = new MatTableDataSource(this.varieties);
		this.dataSourceE = new MatTableDataSource(this.arrayEquip);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	onDelete(id)
	{
		this.dialogService.openConfirmDialog('¿Estás seguro de eliminar esta variedad?').afterClosed().subscribe
		(
			response =>
			{
				if (response==true)
				{
					this.deleteVariety(id);
				}else
				{
					console.log(response);
				}
			}
			);
	}

	deleteVariety(id)
	{
		this._equipinfrasService.deleteVariety(this.equipinfras.id,id).subscribe
		(
			response =>
			{
	            this.message = response.message.text;
	            this.snackBar.openSnackBarSuccess(this.message);
	            this.getEquipinfras(this.equipinfras.id);
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}
	goBack(){
		this._location.back();
	  }

}
