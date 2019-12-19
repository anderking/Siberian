import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogService } from '../../../../../../../../core/services/dialog.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';

export interface PromotionTargetData {
id: string;
promotion_id: string;
parameter_id: string;
parameter_value: string;
create_at: string;
update_at: string;
status: string;
}

@Component({
  selector: 'sib-promotion-targets',
  templateUrl: './promotion-targets.component.html',
  styleUrls: ['./promotion-targets.component.scss']
})
export class PromotionTargetsComponent implements OnInit {

  public PromotionTarget:any[];
	displayedColumns: string[] = ['id','parameter_id','promotion_id','status','edit','delete'];
	dataSource: MatTableDataSource<PromotionTargetData>;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
  constructor
  (
    private dialogService: DialogService,
		private snackBar: SnackBarService
  ) 
  { 
    this.PromotionTarget = [
      {id:"1" ,parameter_id:"Parámetro 1 ",promotion_id:"Promoción 1",status:"A",},
      {id:"2" ,parameter_id:"Parámetro 2",promotion_id:"Promoción 2",status:"A",},
      {id:"3" ,parameter_id:"Parámetro 3",promotion_id:"Promoción 3",status:"A",},
    ];

  this.dataSource = new MatTableDataSource(this.PromotionTarget);
  }

  ngOnInit()
  {
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
		this.dialogService.openConfirmDialog('¿Estás seguro de eliminar el Parámetro/Promoción '+id+' ?').afterClosed().subscribe(res=>{
			if (res==true) {
				console.log(id);
				this.snackBar.openSnackBar('Eliminada Correctamente','¿Deshacer?').onAction().subscribe(() => {
				  console.log('Recuperado');
				});
			}else{
				console.log(res);
			}
		});
	}
}