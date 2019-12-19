import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../../../../../../../../core/services/dialog.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global';
import { Skill } from '../../../../../../../../models/skill';
import { SkillService } from '../../../../../../../../core/services/admin/skill.service';

@Component({
  selector: 'sib-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  public skills: Array<Skill> = new Array<Skill>();
  public message: string;
  public failedConect: string;

  displayedColumns: string[] = ['id', 'name', 'description', 'status', 'edit', 'delete'];
  dataSource: MatTableDataSource<Skill>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor
    (
      private dialogService: DialogService,
      private snackBar: SnackBarService,
      private _skillService: SkillService,
      private _route: ActivatedRoute,
      private _router: Router,
      private _location: Location
    ) {

  }

  ngOnInit() {
    this.getSkills();
  }

  getSkills() {
    this._skillService.All().subscribe
      (
        response => {
          if (response.status == true) {
            this.skills = response.skills;
            console.log(this.skills);
            this.table();
          }
          else {
            this.skills = [];
            this.message = response.message.text;
            console.log(this.message);
            this.table();
          }

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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  table() {
    this.skills = this.snackBar.orderByDateAsc(this.skills);
    this.dataSource = new MatTableDataSource(this.skills);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onDelete(id) {
    this.dialogService.openConfirmDialog('¿Estás seguro de eliminar esta habilidad?').afterClosed().subscribe
      (
        response => {
          if (response == true) {
            this.deleteSkill(id);
          } else {
            console.log(response);
          }
        }
      );
  }

  deleteSkill(id) {
    this._skillService.deleteOne(id).subscribe
      (
        response => {
          console.log(response);
          this.message = response.message.text;
          this.snackBar.openSnackBarSuccess(this.message);
          this.getSkills();
        },
        error => {
          console.log(<any>error);
        }
      )
  }
}

