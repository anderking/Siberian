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
  selector: "sib-notification-create",
  templateUrl: "./notification-create.component.html",
  styleUrls: ["./notification-create.component.scss"]
})
export class NotificationCreateComponent implements OnInit {
  public notification: Notification;
  public message: string;

  constructor(
    private _notificationService: NotificationService,
    private _router: Router,
    private _location: Location,
    private snackBar: SnackBarService
  ) {
    this.notification = new Notification();
    console.log(this.notification);
  }

  ngOnInit() {}

  register(form: NgForm) {
    if (form.valid) {
      this.notification.name = form.value.name;
      this.notification.message = form.value.message;

      this._notificationService.create(this.notification).subscribe(
        response => {
          if (response.status == true) {
            console.log(response);
            this.message = response.message.text;
            
            form.reset();
            this.messageSnackBar(response.message.text);
          } else {
            console.log(response);
            this.message = response.message.text;
            this.messageSnackBar(response.message.text);
          }
        },
        error => {
          console.log(error);

          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              this.message = error.error.message;
              console.log(error);
              this.messageSnackBar(error.error.message);
            }
          } else {
            console.log(error);
          }
        }
      );
    } else {
    }
  }

  messageSnackBar(message) {
    this.snackBar.openSnackBarSuccess(message);
  }

  goBack() {
    this._location.back();
  }
}
