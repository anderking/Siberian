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
  selector: "sib-question-edit",
  templateUrl: "./question-edit.component.html",
  styleUrls: ["./question-edit.component.scss"]
})
export class QuestionEditComponent implements OnInit {
  public question: Question;
  public message: string;
  public failedConect: string;

  public kindTypes: any[];

  constructor(
    private _questionService: QuestionService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private snackBar: SnackBarService
  ) {
    this.kindTypes = [
      { id: "cliente", name: "Cliente" },
      { id: "prestador", name: "Prestador" },
      { id: "servicio", name: "Servicio" }
    ];
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getQuestion(id);
    });
  }

  getQuestion(id) {
    this._questionService.getOne(id).subscribe(
      response => {
        this.question = response.question;
        console.log(this.question);
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
      this._questionService.update(this.question).subscribe(
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
