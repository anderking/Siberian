import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global'
import { ServiceDetail } from 'src/app/models/serviceDetail';
import { ServiceDetailService } from 'src/app/core/services/admin/serviceDetail.service';
import { ActivityService } from 'src/app/core/services/admin/activity.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'sib-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})
export class AddActivityComponent implements OnInit
{

  public serviceDetail: ServiceDetail;
  public activities: any;
  public activitiesSelected:any;
  public total:number;
  public message: string;
  public failedConect: string;
  public test : any;

  constructor
  (
    private _activityService: ActivityService,
    private _serviceDetailService: ServiceDetailService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _location: Location,
    private snackBar: SnackBarService
    )
  {
  }

  ngOnInit()
  {
    this._route.params.subscribe
    (
      params =>
      {
        let id = params.id;
        this.getServiceDetail(id);
      }
      );
    this.getActivities();
  }

  getActivities()
  {
    this._activityService.All().subscribe
    (
      response =>
      {
        if (response.status == true)
        {
          this.activities = response.activities;
          console.log(this.activities);
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
        if (error instanceof HttpErrorResponse)
        {
          if (error.status === 0)
          {
            this.failedConect = Global.failed;
          }
        }
      }
      )
  }

  getServiceDetail(id)
  {
    this._serviceDetailService.getOne(id).subscribe
    (
      response =>
      {
        this.serviceDetail = response.serviceDetail;

        if(this.serviceDetail.activities)
        {
          this.activitiesSelected = [];
          for(let activity of this.serviceDetail.activities)
          {
            this.activitiesSelected.push(activity.id);
          }
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

  update(form: NgForm)
  {

    if(form.valid)
    {
      this._serviceDetailService.addActivity(this.serviceDetail.id,form.value.activities).subscribe
      (
        response =>
        {
          if(response.status==true)
          {
            console.log(response);
            this.message  = response.message.text;
            this.messageSnackBar(this.message);
            this.getServiceDetail(this.serviceDetail.id);
          }
          else
          {
            console.log(response);
            this.message  = response.message.text;
            this.messageSnackBar(this.message);
            this.getServiceDetail(this.serviceDetail.id);
          }
        },
        error =>
        {
          console.log(error);
          this.message  = error.error.message;
          this.snackBar.openSnackBar(this.message,'');
        }
        );
    }
    
  }

  messageSnackBar(message)
  {
    this.snackBar.openSnackBarSuccess(message);
  }

  goBack()
  {
    this._location.back();
  }

}
