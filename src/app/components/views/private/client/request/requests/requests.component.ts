import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DialogService } from "src/app/core/services/dialog.service";
import { SnackBarService } from "src/app/core/services/snack-bar.service";

import { Router, ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Global } from "src/app/core/services/global";
import { Revision } from "src/app/models/revision";
import { RevisionService } from "src/app/core/services/client/revision.service";

@Component({
  selector: "sib-requests",
  templateUrl: "./requests.component.html",
  styleUrls: ["./requests.component.scss"]
})
export class RequestsComponent implements OnInit {
  public revision: any;
  public revisions: Array<Revision> = new Array<Revision>();
  public bitacoras:any;
  public note:any;
  public total: number = 0;
  public userID: string;
  public message: string;
  public failedConect: string;

  displayedColumns: string[] = [
    "id",
    "equipinfras",
    "description",
    "location",
    "date",
    "lender",
    "status",
    "delete"
  ];
  dataSource: MatTableDataSource<Revision>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _revisionService: RevisionService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit() {
    this.userID = localStorage.getItem("resID");
    this.getRevisions(this.userID);
  }

  getRevisions(userID) {
    this._revisionService.getRevisionUser(userID).subscribe(
      response => {
        if (response.status == true) {
          this.revisions = response.revisions;
          this.total = this.revisions.length;
          console.log(this.revisions);
          this.table();
        } else {
          this.revisions = [];
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
    this.revisions = this.snackBar.orderByDateAsc(this.revisions);
    this.dataSource = new MatTableDataSource(this.revisions);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onDelete(id) {
    this.dialogService
      .openConfirmDialog("¿Estás seguro de cancelar esta Solicitud?")
      .afterClosed()
      .subscribe(response => {
        if (response == true) {
          this.deleteRevision(id);
        } else {
          console.log(response);
        }
      });
  }

  deleteRevision(id) {
    this._revisionService.deleteOne(id).subscribe(
      response => {
        console.log(response);
        this.message = response.message.text;
        this.snackBar.openSnackBarSuccess(this.message);
        this.getRevisions(this.userID);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  onCancelled(id) {
    this.dialogService.openRejectedRequestDialog().afterClosed().subscribe(response => {
        if (response != false) {
          var motive = response.motive;
          var note = response.note;
          this.cancelledRequist(id, motive, note);
        } else {
          console.log(response);
        }
      });
  }

  cancelledRequist(id, motiveId, note?) {
    this._revisionService.cancelled(id, motiveId, note).subscribe(
      response => {
        console.log(response);
        this.message = response.message.text;
        this.snackBar.openSnackBarSuccess(this.message);
        this.getRevision(id);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getRevision(id) {
	this._revisionService.getOne(id).subscribe
	(
		response =>
		{
			this.revision = response.revision;
			this.bitacoras = this.revision.bitacoras;
			for (var i=0; i<this.bitacoras.length; i++)
			{
				if( this.bitacoras[i].eventType == "execution")
				{
					this.note = this.bitacoras[i].description;
				}
			}

			console.log(this.revision);
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
		});
}

  goBack() {
    this._location.back();
  }
}
