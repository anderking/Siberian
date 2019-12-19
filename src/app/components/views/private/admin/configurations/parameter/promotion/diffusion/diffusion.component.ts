import { Component, OnInit,ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/core/services/dialog.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global';
import { Promotion } from 'src/app/models/promotion';
import { PromotionService } from 'src/app/core/services/admin/promotion.service';

  

@Component({
  selector: 'sib-diffusion',
  templateUrl: './diffusion.component.html',
  styleUrls: ['./diffusion.component.scss']
})
export class DiffusionComponent implements OnInit {

  public promotions:Array < Promotion > = new Array < Promotion > ();
  public message:string;
  public failedConect:string;

  displayedColumns: string[] = ['id','name','description','type','status','difusion','delete'];
  dataSource: MatTableDataSource <Promotion>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _promotionService: PromotionService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) { }

  ngOnInit() {
    this.getPromotions();
  }

  getPromotions()
  {
    this._promotionService.All().subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.promotions = response.promotions;
          console.log(this.promotions);
          this.table();
        }
        else
        {
          this.promotions = [];
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  table()
  {
    this.promotions = this.snackBar.orderByDateAsc(this.promotions);
    this.dataSource = new MatTableDataSource(this.promotions);
    this.dataSource.paginator = this.paginator;
  }

  onDelete(id)
  {
    this.dialogService.openConfirmDialog('¿Estás seguro de eliminar esta Promoción?').afterClosed().subscribe
    (
      response =>
      {
        if (response==true)
        {
          this.deletePromotion(id);
        }else
        {
          console.log(response);
        }
      }
      );
  }

  deletePromotion(id)
  {
    this._promotionService.deleteOne(id).subscribe
    (
      response =>
      {
        console.log(response);
        this.message = response.message.text;
        this.snackBar.openSnackBarSuccess(this.message);
        this.getPromotions();
      },
      error =>
      {
        console.log(<any>error);
      }
      )
  }
}
