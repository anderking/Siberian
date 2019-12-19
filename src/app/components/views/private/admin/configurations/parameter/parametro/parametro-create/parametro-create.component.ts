import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Global } from "../../../../../../../../core/services/global";
import { Group } from "../../../../../../../../models/group";
import { Parametro } from "../../../../../../../../models/parametro";
import { GroupService } from "../../../../../../../../core/services/admin/group.service";
import { ParametroService } from "../../../../../../../../core/services/admin/parametro.service";
import { SnackBarService } from "../../../../../../../../core/services/snack-bar.service";

@Component({
  selector: "sib-parametro-create",
  templateUrl: "./parametro-create.component.html",
  styleUrls: ["./parametro-create.component.scss"]
})
export class ParametroCreateComponent implements OnInit {

  public parameter: Parametro;
  public groups: Group;
  public GroupId: string;
  public message: string;
  public failedConect:string;
  public total:Number;

  constructor(
    private _parameterService: ParametroService,
    private _groupService: GroupService,
    private _router: Router,
    private _location: Location,
    private snackBar: SnackBarService
  ) {
    this.parameter = new Parametro();
    console.log(this.parameter);
  }

  ngOnInit()
	{
		this.getGroups();
	}

	getGroups()
	{
		this._groupService.All().subscribe
		(
			response =>
			{
				if (response.status==true)
				{
					this.groups = response.groups;
					this.GroupId = "";
					console.log(this.groups);
				}
				else
				{
					this.total = 0;
					this.message = response.message.text;
					console.log(this.message);
				}

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
			}
			)
	}

  register(form: NgForm) {
    if (form.valid) {
      console.log(form.value);
      this.parameter.name = form.value.name;
      this.parameter.description = form.value.description;
      this.parameter.GroupId = form.value.GroupId;

      this._parameterService.create(this.parameter).subscribe(
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
