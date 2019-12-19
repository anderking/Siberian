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
import { Notification } from "../../../../../../../../models/notification";
import { NotificationService } from "../../../../../../../../core/services/admin/notification.service";

@Component({
  selector: "sib-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"]
})
export class NotificationsComponent implements OnInit {
  public notifications: Array<Notification> = new Array<Notification>();
  public message: string;
  public failedConect: string;

  displayedColumns: string[] = [
    "id",
    "name",
    "message",
    "status",
    "edit",
    "delete"
  ];
  dataSource: MatTableDataSource<Notification>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _notificationService: NotificationService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    this._notificationService.All().subscribe(
      response => {
        if (response.status == true) {
          console.log(response);
          this.notifications = response.notificationDetails;
          console.log(this.notifications);
          this.table();
        } else {
          this.notifications = [];
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
    this.notifications = this.snackBar.orderByDateAsc(this.notifications);
    this.dataSource = new MatTableDataSource(this.notifications);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onDelete(id) {
    this.dialogService
      .openConfirmDialog("¿Estás seguro de eliminar esta notificación?")
      .afterClosed()
      .subscribe(response => {
        if (response == true) {
          this.deleteNotification(id);
        } else {
          console.log(response);
        }
      });
  }

  deleteNotification(id) {
    this._notificationService.deleteOne(id).subscribe(
      response => {
        console.log(response);
        this.message = response.message.text;
        this.snackBar.openSnackBarSuccess(this.message);
        this.getNotifications();
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
