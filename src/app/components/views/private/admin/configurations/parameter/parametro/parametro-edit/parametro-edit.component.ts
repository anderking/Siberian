import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Global } from "../../../../../../../../core/services/global";
import { Location } from "@angular/common";
import { Group } from "../../../../../../../../models/group";
import { GroupService } from "../../../../../../../../core/services/admin/group.service";
import { Parametro } from "../../../../../../../../models/parametro";
import { ParametroService } from "../../../../../../../../core/services/admin/parametro.service";
import { SnackBarService } from "../../../../../../../../core/services/snack-bar.service";

@Component({
  selector: "sib-parametro-edit",
  templateUrl: "./parametro-edit.component.html",
  styleUrls: ["./parametro-edit.component.scss"]
})
export class ParametroEditComponent implements OnInit {
  public parameter: Parametro;
  public groups: any;
  public updateParameter: any;
  public failedConect: string;
  public message: string;

  constructor(
    private _parameterService: ParametroService,
    private _groupService: GroupService,
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
    this.getGroups();
  }

  getGroups() {
    this._groupService.All().subscribe(
      response => {
        this.groups = response.groups;
        console.log(this.groups);
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

  getParameter(id) {
    this._parameterService.getOne(id).subscribe(
      response => {
        this.parameter = response.parameter;
        console.log(this.parameter);
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
    this.parameter.GroupId = form.value.GroupId;
    console.log(this.parameter);
    if (form.valid) {
      this._parameterService.update(this.parameter).subscribe(
        response => {
          if (response.status == true) {
            this.message = response.message.text;
            this.snackBar.openSnackBar(this.message, "");
            this.getParameter(this.parameter.id);
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
