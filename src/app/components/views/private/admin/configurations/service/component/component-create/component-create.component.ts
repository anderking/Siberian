import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../../../core/services/global';
import { Componentt } from '../../../../../../../../models/componentt';
import { ComponentService } from '../../../../../../../../core/services/admin/component.service';
import { SnackBarService } from '../../../../../../../../core/services/snack-bar.service';

@Component({
  selector: 'sib-component-create',
  templateUrl: './component-create.component.html',
  styleUrls: ['./component-create.component.scss']
})
export class ComponentCreateComponent implements OnInit {

  public component:Componentt;
    public message:string;
    
  constructor(
    private _componentService:ComponentService,
    private _router: Router,
    private _location: Location,
    private snackBar: SnackBarService

  )
   {

    this.component = new Componentt();
    console.log(this.component);
    }

  ngOnInit() {
  }

  register(form: NgForm)
	{
		if(form.valid)
		{
			console.log(form.value);
			this.component.name = form.value.name;
      this.component.description = form.value.description;
      

			this._componentService.create(this.component).subscribe
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

