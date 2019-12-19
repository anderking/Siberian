import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from '../../../../../../core/services/global'
import { User } from '../../../../../../models/user';
import { UserService } from '../../../../../../core/services/admin/user.service';
import { Location } from '../../../../../../models/location';
import { LocationService } from '../../../../../../core/services/admin/location.service';
import { Phone } from '../../../../../../models/phone';
import { PhoneService } from '../../../../../../core/services/admin/phone.service';
import { SnackBarService } from '../../../../../../core/services/snack-bar.service';
import { DialogService } from '../../../../../../core/services/dialog.service';


@Component({
  selector: 'sib-profile-show',
  templateUrl: './profile-show.component.html',
  styleUrls: ['./profile-show.component.scss']
})
export class ProfileShowComponent implements OnInit {

	public user: any;
	public location:any;
	public phone:any;
	public locationsUser:any;
	public phonesUser:any;
	public failedConect:string;
	public message:string;
	public userID:string;
	@ViewChild('File') file: ElementRef;

	constructor
	(
		private _userService: UserService,
		public _locationService: LocationService,
		public _phoneService: PhoneService,
		private _route: ActivatedRoute,
		private _router: Router,
    	private snackBar: SnackBarService,
    	private dialogService: DialogService,
	)
	{
		this.location = new Location();
	}

	ngOnInit()
	{
		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.userID = id;
				this.getUser(id);
				this.getLocationsUser(id)
				this.getPhonesUser(id)
			}
		);
	}

	getUser(id)
	{
		this._userService.getOne(id).subscribe
		(
			response =>
			{
				this.user = response;
				this.user = this.user.user;
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

	getLocationsUser(id)
	{
		this._locationService.AllLocationUser(id).subscribe
		(
			response =>
			{
				this.locationsUser = response.locations;
				console.log(this.locationsUser);
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

	onAddLocation()
	{
		this.dialogService.openAddLocationDialog().afterClosed().subscribe
		(
			response =>
			{
				this.location = response;
				console.log(this.location);
				this.createLocation(this.location);

			}
		);

	}

	createLocation(location)
	{
		this._locationService.create(location).subscribe
		(
			response =>
			{
				if(response.status==true)
				{
					console.log(response);
					this.message  = response.message.text;
					this.snackBar.openSnackBar(this.message,'');
	            	this.getLocationsUser(this.userID);
				}
			},
			error =>
			{
				console.log(error);
			}
		);
	}	

	onEditLocation(location){
		this.dialogService.openEditLocationDialog(location).afterClosed().subscribe
		(
			response =>
			{
				this.location = response.location;
				this.location.address = location.address;
				this.location.state = location.state;
				this.location.city = location.city;
				this.location.postalCode = location.postalCode;
				console.log(this.location);
				this.updateLocation(this.location);
			}
		);
	}

	updateLocation(location)
	{
		this._locationService.update(location).subscribe
		(
			response =>
			{
				console.log(response);
				if(response.status==true)
				{
					this.message  = response.message.text;
					this.snackBar.openSnackBar(this.message,'');
	            	this.getLocationsUser(this.userID);
				}
			},
			error =>
			{
				console.log(error);
			}
		);
	}

	onDeleteLocation(id){
		this.dialogService.openConfirmDialog('¿Estás seguro de eliminar esta direccón?').afterClosed().subscribe
		(
			response =>
			{
				if (response==true)
				{
					this.deleteLocation(id);
				}else
				{
					console.log(response);
				}
			}
		);
	}

	deleteLocation(id)
	{
		this._locationService.deleteOne(id).subscribe
		(
			response =>
			{
				console.log(response);
	            this.message = response.message.text;
	            this.snackBar.openSnackBarSuccess(this.message);
	            this.getLocationsUser(this.userID);
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}


	getPhonesUser(id)
	{
		this._phoneService.AllPhoneUser(id).subscribe
		(
			response =>
			{
				this.phonesUser = response.phones;
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

	onAddPhone()
	{
		this.dialogService.openAddPhoneDialog().afterClosed().subscribe
		(
			response =>
			{
				this.phone = response;
				console.log(this.phone);
				this.createPhone(this.phone);

			}
		);

	}

	createPhone(phone)
	{
		this._phoneService.create(phone).subscribe
		(
			response =>
			{
				if(response.status==true)
				{
					console.log(response);
					this.message  = response.message.text;
					this.snackBar.openSnackBar(this.message,'');
	            	this.getPhonesUser(this.userID);
				}
				else
				{
					console.log(response);
					this.message  = response.message.text;
					this.snackBar.openSnackBar(this.message,'');
				}
			},
			error =>
			{
				console.log(error);
			}
		);
	}	

	onEditPhone(phone){
		this.dialogService.openEditPhoneDialog(phone).afterClosed().subscribe
		(
			response =>
			{
				this.phone = response.phone;
				this.phone.number = phone.number;
				this.phone.phoneType = phone.phoneType;
				console.log(this.phone);
				this.updatePhone(this.phone);
			}
		);
	}

	updatePhone(phone)
	{
		this._phoneService.update(phone).subscribe
		(
			response =>
			{
				console.log(response);
				if(response.status==true)
				{
					this.message  = response.message.text;
					this.snackBar.openSnackBar(this.message,'');
	            	this.getPhonesUser(this.userID);
				}
			},
			error =>
			{
				console.log(error);
			}
		);
	}

	onDeletePhone(id){
		this.dialogService.openConfirmDialog('¿Estás seguro de eliminar este teléfono?').afterClosed().subscribe
		(
			response =>
			{
				if (response==true)
				{
					this.deletePhone(id);
				}else
				{
					console.log(response);
				}
			}
		);
	}

	deletePhone(id)
	{
		this._phoneService.deleteOne(id).subscribe
		(
			response =>
			{
				console.log(response);
	            this.message = response.message.text;
	            this.snackBar.openSnackBarSuccess(this.message);
	            this.getPhonesUser(this.userID);
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}

	uploadPic(event: any) {
		let file: File = event.target.files[0];
		if (file) {
			let reader = new FileReader();

			reader.onload = (e: any) => {
				this.user.imageUrl = e.target.result;
				this._userService.update(this.user).subscribe(_ => {
					console.log(_)
					this.user = _.user;
				}, e => console.log(e))
			}

			reader.onerror = (e) => {
				console.log(e);
			}

			reader.readAsDataURL(file);
		}
	}

}
