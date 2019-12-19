import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DialogService } from "../../../../../../../../core/services/dialog.service";
import { SnackBarService } from "../../../../../../../../core/services/snack-bar.service";

import { Router, ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Global } from "../../../../../../../../core/services/global";
import { Parametro } from "../../../../../../../../models/parametro";
import { ParametroService } from "../../../../../../../../core/services/admin/parametro.service";

@Component({
  selector: "sib-parametros",
  templateUrl: "./parametros.component.html",
  styleUrls: ["./parametros.component.scss"]
})
export class ParametrosComponent implements OnInit {

  public parameters: Array<Parametro> = new Array<Parametro>();
  public message: string;
  public failedConect: string;

  displayedColumns: string[] = [
    "id",
    "name",
    "description",
    "group",
    "users",
    "promotions",
    "status",
    "edit",
    "delete"
  ];
  dataSource: MatTableDataSource<Parametro>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _parameterService: ParametroService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit() {
    this.getParameters();
  }

  getParameters() {
    this._parameterService.All().subscribe(
      response => {
        if (response.status == true) {
          this.parameters = response.parameters;
          console.log(this.parameters);
          this.table();
        } else {
          this.parameters = [];
          this.message = response.message.text;
          console.log(this.message);
          this.table();
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  table() {
    this.parameters = this.snackBar.orderByDateAsc(this.parameters);
    this.dataSource = new MatTableDataSource(this.parameters);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onDelete(id) {
    this.dialogService
      .openConfirmDialog("¿Estás seguro de eliminar este parametro?")
      .afterClosed()
      .subscribe(response => {
        if (response == true) {
          this.deleteParameter(id);
        } else {
          console.log(response);
        }
      });
  }

  deleteParameter(id) {
    this._parameterService.deleteOne(id).subscribe(
      response => {
        console.log(response);
        this.message = response.message.text;
        this.snackBar.openSnackBarSuccess(this.message);
        this.getParameters();
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
