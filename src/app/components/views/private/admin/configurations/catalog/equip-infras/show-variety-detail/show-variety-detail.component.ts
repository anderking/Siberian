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
import { EquipinfrasService } from '../../../../../../../../core/services/admin/equipinfras.service';
import { Variety } from '../../../../../../../../models/variety';
import { VarietyService } from '../../../../../../../../core/services/admin/variety.service';
import { VarietyDetail } from '../../../../../../../../models/varietyDetail';
import { VarietyDetailService } from '../../../../../../../../core/services/admin/varietyDetail.service';

import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';
import { DialogService } from '../../../../../../../../core/services/dialog.service';

@Component({
  selector: 'sib-show-variety-detail',
  templateUrl: './show-variety-detail.component.html',
  styleUrls: ['./show-variety-detail.component.scss']
})
export class ShowVarietyDetailComponent implements OnInit {

	public varietysDetail:Array < VarietyDetail > = new Array < VarietyDetail > ();
	public variety:Variety;
	public equipsinfras:any;
	public equipinfras:any;
	public VarietyId:any;
	public EquipinfraId:any;
	public message:string;
	public failedConect:string;
	public arrayVariety:any;


	displayedColumns: string[] = ['id','name','description','status','addServiceDetail','edit','delete'];
	dataSource: MatTableDataSource<VarietyDetail>;

	displayedColumnsV: string[] = ['name','description','status'];
  	dataSourceV: MatTableDataSource<VarietyDetail>;

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor
	(
		private _varietyDetailService: VarietyDetailService,
		private _varietyService: VarietyService,
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
				this.VarietyId = id;
				this.EquipinfraId= params.EquipinfraId;
				this.getVariety(id);
			}
		);

	}

	getVariety(id)
	{
		this._varietyService.getOne(id).subscribe
		(
			response =>
			{
		        this.variety = response.variety;

		        this.arrayVariety = [];
				this.arrayVariety.push(this.variety);

		        console.log(this.variety);
		        this.equipsinfras = this.variety.equipinfras;
				
				for (var i=0; i<this.equipsinfras.length; i++)
				{
					if( this.equipsinfras[i].id == this.EquipinfraId)
					{
						this.equipinfras = this.equipsinfras[i];
					}
				}

				if (this.equipinfras.varietyDetails.length>0)
				{
					this.varietysDetail = this.equipinfras.varietyDetails;
					console.log(this.varietysDetail);
					this.table();
				}
				else
				{
					this.varietysDetail = [];
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
		this.dataSource = new MatTableDataSource(this.varietysDetail);
		this.dataSourceV = new MatTableDataSource(this.arrayVariety);
		this.dataSource.paginator = this.paginator;
	}

	onDelete(id)
	{
		this.dialogService.openConfirmDialog('¿Estás seguro de eliminar este modelo?').afterClosed().subscribe
		(
			response =>
			{
				if (response==true)
				{
					this.deleteVarietyDetail(id);
				}else
				{
					console.log(response);
				}
			}
			);
	}

	deleteVarietyDetail(id)
	{
		this._varietyDetailService.deleteOne(id).subscribe
		(
			response =>
			{
	            this.message = response.message.text;
	            this.snackBar.openSnackBarSuccess(this.message);
	            this.getVariety(this.VarietyId);
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}

	goBack()
	{ 
		this._location.back(); 
	}
}
