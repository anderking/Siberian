import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../../../../../../core/services/dialog.service';
import { SnackBarService } from '../../../../../../core/services/snack-bar.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../core/services/global';
import { Revision } from '../../../../../../models/revision';
import { RevisionService } from '../../../../../../core/services/client/revision.service';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.imgURL;

@Component({
  selector: 'sib-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.scss']
})
export class RequestDetailComponent implements OnInit {

  public revision: any;
  public message: string;
  public failedConect: string;
  public urldelafault:string="assets/img/request/revision_3.jpg"

  constructor(
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _revisionService: RevisionService,
    private _route: ActivatedRoute,
    private _location: Location
    ) {

  }

  ngOnInit() {
    this._route.params.subscribe (
      params => {
        let id = params.id;
        this.getRevision(id);
      }
      );
    console.log(BASE_URL);
  }

  getRevision(id) {
    this._revisionService.getOne(id).subscribe
    (
      response =>
      {
        this.revision = response.revision;
        console.log(this.revision);
        console.log(response);
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
      });
  }

  goBack() {
    this._location.back();
  }

}
