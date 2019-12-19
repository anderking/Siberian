import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global'
import { Question } from '../../../../../../../../models/question';
import { QuestionService } from '../../../../../../../../core/services/admin/question.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'sib-question-show',
  templateUrl: './question-show.component.html',
  styleUrls: ['./question-show.component.scss']
})
export class QuestionShowComponent implements OnInit {

  public question: Question;
  public arrayQuestion: any;
  public message: string;
  public failedConect: string;

  displayedColumns: string[] = ['enquire', 'description','status'];
	dataSource: MatTableDataSource<Question>;
	
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

  constructor
    (
      private _questionService: QuestionService,
      private _route: ActivatedRoute,
      private _router: Router,
      private _location: Location,
      private snackBar: SnackBarService
    ) {
  }

  ngOnInit() {
    this._route.params.subscribe
      (
        params => {
          let id = params.id;
          this.getQuestion(id);
        }
      );
  }

  getQuestion(id) {
    this._questionService.getOne(id).subscribe
      (
        response => {
          this.question = response.question;
          this.arrayQuestion = [];
          this.arrayQuestion.push(this.question);
          console.log(this.question);

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
      )
  }

	table()
	{
		this.dataSource = new MatTableDataSource(this.arrayQuestion);

    this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
  }
  
  goBack(){
    this._location.back();
  }

}
