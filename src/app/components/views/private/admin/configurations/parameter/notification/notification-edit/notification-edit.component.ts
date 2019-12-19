import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Global } from "../../../../../../../../core/services/global";
import { Notification } from "../../../../../../../../models/notification";
import { NotificationService } from "../../../../../../../../core/services/admin/notification.service";
import { SnackBarService } from "../../../../../../../../core/services/snack-bar.service";

@Component({
  selector: 'sib-notification-edit',
  templateUrl: './notification-edit.component.html',
  styleUrls: ['./notification-edit.component.scss']
})
export class NotificationEditComponent implements OnInit {

  public notification: Notification;
  public message: string;
  public failedConect: string;

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
        console.log(response);
        this.notification = response.notificationDetail;
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

  update(form: NgForm) {
    if (form.valid) {
      this._notificationService.update(this.notification).subscribe(
        response => {
          if (response.status == true) {
            this.message = response.message.text;
            this.snackBar.openSnackBar(this.message, "");
          } else {
            this.message = response.message.text;
            this.snackBar.openSnackBar(this.message, "");
          }
        },
        error => {
          console.log(error);
          this.message = error.error.message;
          this.snackBar.openSnackBar(this.message, "");
        }
      );
    } else {
    }
  }

  goBack() {
    this._location.back();
  }

}
