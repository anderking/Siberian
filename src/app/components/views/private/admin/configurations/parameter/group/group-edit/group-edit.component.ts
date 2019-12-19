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
  selector: "sib-group-edit",
  templateUrl: "./group-edit.component.html",
  styleUrls: ["./group-edit.component.scss"]
})
export class GroupEditComponent implements OnInit {
  public group: Group;
  public message: string;
  public failedConect: string;

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
      this._groupService.update(this.group).subscribe(
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
