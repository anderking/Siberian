import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Global } from "../../../../../../../../core/services/global";
import { Group } from "../../../../../../../../models/group";
import { GroupService } from "../../../../../../../../core/services/admin/group.service";
import { Parametro } from "../../../../../../../../models/parametro";
import { SnackBarService } from "../../../../../../../../core/services/snack-bar.service";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "sib-group-show",
  templateUrl: "./group-show.component.html",
  styleUrls: ["./group-show.component.scss"]
})
export class GroupShowComponent implements OnInit {
  
  public group: Group;
  public arrayGroup: any;
  public parameters: Array<Parametro> = new Array<Parametro>();
  public message: string;
  public failedConect: string;

  displayedColumns: string[] = ["name", "description", "parameters", "status"];
  dataSource: MatTableDataSource<Group>;

  displayedColumnsP: string[] = ["name", "description", "status"];
  dataSourceP: MatTableDataSource<Parametro>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _groupService: GroupService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private snackBar: SnackBarService
  ) {}

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getGroup(id);
    });
  }

  getGroup(id) {
    this._groupService.getOne(id).subscribe(
      response => {
        this.group = response.group;
        this.arrayGroup = [];
        this.arrayGroup.push(this.group);
        console.log(this.arrayGroup);
        
        this.parameters = response.group.parameters;

        if (this.parameters.length > 0) {
          console.log(this.parameters);
        } else {
          this.parameters = [];
          console.log(this.parameters);
        }

        this.table();
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

  applyFilterP(filterValue: string)
	{
		this.dataSourceP.filter = filterValue.trim().toLowerCase();

		if (this.dataSourceP.paginator) {
			this.dataSourceP.paginator.firstPage();
		}
  }

  table() {
    this.dataSource = new MatTableDataSource(this.arrayGroup);
    this.dataSourceP = new MatTableDataSource(this.parameters);

    this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
  }

  goBack() {
    this._location.back();
  }
}
