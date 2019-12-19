import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../../../../../../../../core/services/dialog.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';


import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global';
import { Policy } from '../../../../../../../../models/policy';
import { PolicyService } from '../../../../../../../../core/services/admin/policy.service';

@Component({
  selector: 'sib-politics',
  templateUrl: './politics.component.html',
  styleUrls: ['./politics.component.scss']
})
export class PoliticsComponent implements OnInit {

  public policies:Array < Policy > = new Array < Policy > ();
  public message:string;
  public failedConect:string;

  displayedColumns: string[] = ['id','name','description','actionPlan','status','edit','delete'];
  dataSource: MatTableDataSource <Policy>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _policyService: PolicyService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) 
  
  { 
  	
  }

  ngOnInit() {
    this.getPolicies();
  }

  getPolicies()
  {
    this._policyService.All().subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.policies = response.policies;
          console.log(this.policies);
          this.table();
        }
        else
        {
          this.policies = [];
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
    this.policies = this.snackBar.orderByDateAsc(this.policies);
    this.dataSource = new MatTableDataSource(this.policies);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

	onDelete(id)
  {
    this.dialogService.openConfirmDialog('¿Estás seguro de eliminar esta política?').afterClosed().subscribe
    (
      response =>
      {
        if (response==true)
        {
          this.deletePolicy(id);
        }else
        {
          console.log(response);
        }
      }
      );
  }

  deletePolicy(id)
  {
    this._policyService.deleteOne(id).subscribe
    (
      response =>
      {
        console.log(response);
        this.message = response.message.text;
        this.snackBar.openSnackBarSuccess(this.message);
        this.getPolicies();
      },
      error =>
      {
        console.log(<any>error);
      }
      )
  }

}
