import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global';
import { Activity } from '../../../../../../../../models/activity';
import { ActivityService } from '../../../../../../../../core/services/admin/activity.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';

@Component({
  selector: 'sib-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.scss']
})
export class ActivityCreateComponent implements OnInit {


  public activity:Activity;
  public difficultyDegrees:any[];
  public difficultyDegreeSelected:string="";
  public message:string;
  constructor
  (
    private _activityService: ActivityService,
    private _router: Router,
    private _location: Location,
    private snackBar: SnackBarService
  ) 
  { 
    this.difficultyDegrees= [
			{id:"Alta",name:"Alta"},
			{id:"Media",name:"Media"},
			
		];
    this.activity = new Activity();
    console.log(this.activity);
  
  }

  ngOnInit() {
  }

  register(form: NgForm)
	{
		if(form.valid)
		{
			console.log(form.value);
			this.activity.name = form.value.name;
			this.activity.description = form.value.description;
      		this.activity.estimatedTime = form.value.estimatedTime;
      		this.activity.difficultyDegree = form.value.difficultyDegree;
			this._activityService.create(this.activity).subscribe
			(
				response =>
				{
					if (response.status==true)
					{
						console.log(response);
						this.message = response.message.text;
						form.reset();
						this.messageSnackBar(this.message); 
					}
					else
					{
						console.log(response);
						this.message = response.message.text;
						this.messageSnackBar(this.message);
					}
				},
				error =>
				{
					console.log(error);

					if(error instanceof HttpErrorResponse)
					{
						if(error.status===404)
						{
							this.message = error.error.message;
							console.log(error);
							this.messageSnackBar(this.message);
						}
					}else
					{
						
						console.log(error);
						
					}
				}
				);
		}else
		{
		}
	}

	messageSnackBar(message)
	{
		this.snackBar.openSnackBarSuccess(message);
	}

	goBack(){
		this._location.back();
	  }

}
