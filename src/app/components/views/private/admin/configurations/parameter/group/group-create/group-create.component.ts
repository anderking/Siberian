import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Global } from "../../../../../../../../core/services/global";
import { Group } from "../../../../../../../../models/group";
import { GroupService } from "../../../../../../../../core/services/admin/group.service";
import { SnackBarService } from "../../../../../../../../core/services/snack-bar.service";

@Component({
  selector: "sib-group-create",
  templateUrl: "./group-create.component.html",
  styleUrls: ["./group-create.component.scss"]
})
export class GroupCreateComponent implements OnInit {
  public group: Group;
  public message: string;
  constructor(
    private _groupService: GroupService,
    private _router: Router,
    private _location: Location,
    private snackBar: SnackBarService
  ) {
    this.group = new Group();
    console.log(this.group);
  }

  ngOnInit() {}

  register(form: NgForm) {
    if (form.valid) {
      console.log(form.value);
      this.group.name = form.value.name;
      this.group.description = form.value.description;
      this._groupService.create(this.group).subscribe(
        response => {
          if (response.status == true) {
            console.log(response);
            this.message = response.message.text;
            form.reset();
            this.messageSnackBar(this.message);
          } else {
            console.log(response);
            this.message = response.message.text;
            this.messageSnackBar(this.message);
          }
        },
        error => {
          console.log(error);

          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              this.message = error.error.message;
              console.log(error);
              this.messageSnackBar(this.message);
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
