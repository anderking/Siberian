import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Global } from "../../../../../../../../core/services/global";
import { Question } from "../../../../../../../../models/question";
import { QuestionService } from "../../../../../../../../core/services/admin/question.service";
import { SnackBarService } from "../../../../../../../../core/services/snack-bar.service";

@Component({
  selector: "sib-question-create",
  templateUrl: "./question-create.component.html",
  styleUrls: ["./question-create.component.scss"]
})
export class QuestionCreateComponent implements OnInit {
  public quest: Question;
  public message: string;
  public name: string;

  public kindTypes:any[];
  public kindTypeSelected:string="";

  constructor(
    private _questionService: QuestionService,
    private _router: Router,
    private _location: Location,
    private snackBar: SnackBarService
  ) {

    this.kindTypes= [
			{id:"cliente",name:"Cliente"},
			{id:"prestador",name:"Prestador"},
			{id:"servicio",name:"Servicio"}
		];

    this.quest = new Question();
    console.log(this.quest);
  }

  ngOnInit() {}

  register(form: NgForm) {
    if (form.valid) {
      console.log(form.value);
      this.quest.enquire = form.value.enquire;
      this.quest.description = form.value.description;
      this.quest.kind = form.value.kind;

      this._questionService.create(this.quest).subscribe(
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
