import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { DialogService } from "../../../../../../../../core/services/dialog.service";

import { Router, ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Global } from "../../../../../../../../core/services/global";
import { Parametro } from "../../../../../../../../models/parametro";
import { User } from "../../../../../../../../models/user";
import { Promotion } from "../../../../../../../../models/promotion";
import { ParametroService } from "../../../../../../../../core/services/admin/parametro.service";
import { SnackBarService } from "../../../../../../../../core/services/snack-bar.service";

@Component({
  selector: "sib-parametro-show",
  templateUrl: "./parametro-show.component.html",
  styleUrls: ["./parametro-show.component.scss"]
})
export class ParametroShowComponent implements OnInit {
  public parameter: Parametro;
  public arrayParameter: any;
  public users: Array<User> = new Array<User>();
  public promotions: Array<Promotion> = new Array<Promotion>();

  public message: string;
  public failedConect: string;

  displayedColumns: string[] = ["name", "description", "group", "status"];
  dataSource: MatTableDataSource<Parametro>;

  displayedColumnsU: string[] = ["name", "gender", "status"];
  dataSourceU: MatTableDataSource<User>;

  displayedColumnsPr: string[] = ["name", "description", "dateStart", "dateEnd", "status"];
  dataSourcePr: MatTableDataSource<Promotion>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _parameterService: ParametroService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private snackBar: SnackBarService
  ) {}

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getParameter(id);
    });
  }

  getParameter(id) {
    this._parameterService.getOne(id).subscribe(
      response => {
        if (response.status == true) {

          this.parameter = response.parameter;
          this.arrayParameter = [];
          this.arrayParameter.push(this.parameter);
          console.log(this.parameter);

          this.users = response.parameter.users;
          this.promotions = response.parameter.promotions;

          if (this.users.length > 0) {
            console.log(this.users);
          } else {
            this.users = [];
            console.log(this.users);
          }

          if (this.promotions.length > 0) {
            console.log(this.promotions);
          } else {
            this.promotions = [];
            console.log(this.promotions);
          }

          this.table();

        } else {
          console.log(response);
        }
      },
      error => {
        console.log(<any>error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            this.failedConect = Global.failed;
          }
        }
      }
    );
  }

  applyFilter(filterValue: string)
	{
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
  }
  
  applyFilterU(filterValue: string) {
    this.dataSourceU.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceU.paginator) {
      this.dataSourceU.paginator.firstPage();
    }
  }

  applyFilterPr(filterValue: string) {
    this.dataSourcePr.filter = filterValue.trim().toLowerCase();

    if (this.dataSourcePr.paginator) {
      this.dataSourcePr.paginator.firstPage();
    }
  }

  table()
	{
		this.dataSource = new MatTableDataSource(this.arrayParameter);

		this.dataSourceU = new MatTableDataSource(this.users);
		this.dataSourcePr = new MatTableDataSource(this.promotions);
		
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

  goBack() {
    this._location.back();
  }
}
