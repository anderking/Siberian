import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../../../../../../../../core/services/dialog.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';
import { MotiveService } from '../../../../../../../../core/services/admin/motive.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global';

export interface Motive {
  id: string;
  name: string;
  description: string;
  status: string;
  
}

@Component({
  selector: 'sib-motives',
  templateUrl: './motives.component.html',
  styleUrls: ['./motives.component.scss']
})
export class MotivesComponent implements OnInit {

  public motive:any;
  public updateMotive:any;
  public motives: Array < Motive > = new Array < Motive > ();
  public message:string;
  public failedConect:string;
  public totalm:Number=0;

  displayedColumns: string[] = ['id', 'name', 'description','status','edit','delete'];  
  dataSource: MatTableDataSource<Motive>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _motiveService: MotiveService,
  ) 
  {
   }

  ngOnInit() {
    this.getMotives();
  }

  getMotives()
  {
    this._motiveService.All().subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.motives = response.motives;
          this.totalm = this.motives.length;
          console.log(this.motives);
          this.table();
        }
        else
        {
          this.motives = [];
          this.message = response.message.text;
          console.log(this.message);
          this.table();
        }

      },
      error =>
      {
        console.log(<any>error,"aqui");
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


  table()
  {
    this.motives = this.snackBar.orderByDateAsc(this.motives);
    this.dataSource = new MatTableDataSource(this.motives);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
		  this.dataSource.paginator.firstPage();
		}
	}

  onDelete(id){
    this.dialogService.openConfirmDialog('¿Estás seguro de eliminar este motivo?').afterClosed().subscribe
    (
      response =>
      {
        if (response==true)
        {
          this.getMotive(id);
          console.log('id delete',id);
        }else
        {
          console.log(response);
        }
      }
    );
  }

  getMotive(id)
  {
    this._motiveService.getOne(id).subscribe
    (
      response =>
      {
        this.motive = response.motive;
        this.update(this.motive);
      },
      error =>
      {
        console.log(<any>error);
      }
    )
  }

  update(motive)
  {
    motive.status = 'deleted';
    this._motiveService.update(motive).subscribe
    (
      response =>
      {
        if(response.status==true)
        {
          this.getMotives();
          this.snackBar.openSnackBar('Eliminado Correctamente','');
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
  }


}


