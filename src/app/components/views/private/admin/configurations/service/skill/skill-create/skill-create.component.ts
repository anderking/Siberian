import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global'
import { Skill } from '../../../../../../../../models/skill';
import { SkillService } from '../../../../../../../../core/services/admin/skill.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';

@Component({
  selector: 'sib-skill-create',
  templateUrl: './skill-create.component.html',
  styleUrls: ['./skill-create.component.scss']
})
export class SkillCreateComponent implements OnInit {

  public skill: Skill;
  public message: string;

  constructor
    (
      private _skillService: SkillService,
      private _router: Router,
      private _location: Location,
      private snackBar: SnackBarService
    ) {
    this.skill = new Skill();
    console.log(this.skill);
  }

  ngOnInit() {

  }

  register(form: NgForm) {
    if (form.valid) {
      this.skill.name = form.value.name;
      this.skill.description = form.value.description;

      console.log(this.skill);

      this._skillService.create(this.skill).subscribe
        (
          response => {
            if (response.status == true) {
              console.log(response.Skill);
              this.message = response.message.text;
              form.reset();
              this.messageSnackBar(this.message);
            }
            else {
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
              //this.message = error.error.message;
              console.log(error);
              //this.messageSnackBar(this.message);
            }
          }
        );
    } else {
    }
  }

  messageSnackBar(message) {
    this.snackBar.openSnackBarSuccess(message);
  }

  goBack(){
    this._location.back();
  }
}
