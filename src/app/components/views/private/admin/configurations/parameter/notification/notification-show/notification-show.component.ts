import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Global } from "../../../../../../../../core/services/global";
import { Notification } from "../../../../../../../../models/notification";
import { NotificationService } from "../../../../../../../../core/services/admin/notification.service";
import { SnackBarService } from "../../../../../../../../core/services/snack-bar.service";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'sib-notification-show',
  templateUrl: './notification-show.component.html',
  styleUrls: ['./notification-show.component.scss']
})
export class NotificationShowComponent implements OnInit {

  public notification: Notification;
  public arrayNotification: any;

  public message: string;
  public failedConect: string;

  displayedColumns: string[] = ["name", "message", "status"];
  dataSource: MatTableDataSource<Notification>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _notificationService: NotificationService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private snackBar: SnackBarService
  ) {}

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getNotification(id);
    });
  }

  getNotification(id) {
    this._notificationService.getOne(id).subscribe(
      response => {
        this.notification = response.notificationDetail;
        this.arrayNotification = [];
        this.arrayNotification.push(this.notification);
        console.log(this.arrayNotification);

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

  applyFilter(filterValue: string)
	{
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
  }

  table() {
    this.dataSource = new MatTableDataSource(this.arrayNotification);

    this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
  }

  goBack() {
    this._location.back();
  }

}
