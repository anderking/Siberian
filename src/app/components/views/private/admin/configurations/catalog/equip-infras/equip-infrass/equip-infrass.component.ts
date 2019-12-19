import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../../../../../../../../core/services/dialog.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';

import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global';
import { Equipinfras } from '../../../../../../../../models/equipinfras';
import { EquipinfrasService } from '../../../../../../../../core/services/admin/equipinfras.service';


@Component({
  selector: 'sib-equip-infrass',
  templateUrl: './equip-infrass.component.html',
  styleUrls: ['./equip-infrass.component.scss']
})
export class EquipInfrassComponent implements OnInit {

  public equipinfrass:Array < Equipinfras > = new Array < Equipinfras > ();
  public message:string;
  public failedConect:string;

	displayedColumns: string[] = ['id','name','description','type','varieties','status','addvariety','edit','delete'];
	dataSource: MatTableDataSource<Equipinfras>;

	@ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _equipinfrasService: EquipinfrasService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) 
  { 
    
  }

  ngOnInit() {
    this.getEquipinfrass();
  }


  getEquipinfrass()
  {
    this._equipinfrasService.All().subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.equipinfrass = response.equipinfras;
          console.log(this.equipinfrass);
          this.table();
        }
        else
        {
          this.equipinfrass = [];
          console.log(response);
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
    this.equipinfrass = this.snackBar.orderByDateAsc(this.equipinfrass);
    this.dataSource = new MatTableDataSource(this.equipinfrass);
    this.dataSource.paginator = this.paginator;
  }

	onDelete(id)
  {
    this.dialogService.openConfirmDialog('¿Estás seguro de eliminar este Equipo o Infraestructura?').afterClosed().subscribe
    (
      response =>
      {
        if (response==true)
        {
          this.deleteEquipinfras(id);
        }else
        {
          console.log(response);
        }
      }
      );
  }

  deleteEquipinfras(id)
  {
    this._equipinfrasService.deleteOne(id).subscribe
    (
      response =>
      {
        console.log(response);
        this.message = response.message.text;
        this.snackBar.openSnackBarSuccess(this.message);
        this.getEquipinfrass();
      },
      error =>
      {
        console.log(<any>error);
      }
      )
  }

}


