import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global'
import { Skill } from '../../../../../../../../models/skill';
import { SkillService } from '../../../../../../../../core/services/admin/skill.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';


import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'sib-skill-show',
  templateUrl: './skill-show.component.html',
  styleUrls: ['./skill-show.component.scss']
})
export class SkillShowComponent implements OnInit {

  public skill: Skill;
  public arraySkill: any;
  public message: string;
  public failedConect: string;

  displayedColumns: string[] = ['name','description','status','serviceDetails'];
	dataSource: MatTableDataSource<Skill>;
	
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

  constructor
    (
      private _skillService: SkillService,
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
          this.getSkill(id);
        }
      );
  }

  getSkill(id) {
    this._skillService.getOne(id).subscribe
      (
        response => {
          this.skill = response.skill;
          this.arraySkill = [];
          this.arraySkill.push(this.skill);
          console.log(this.skill);

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
		this.dataSource = new MatTableDataSource(this.arraySkill);

  }
  
  goBack(){
    this._location.back();
  }

}
