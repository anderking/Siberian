import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Location} from '@angular/common';
import {NgForm} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/core/services/admin/company.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'sib-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {

	@ViewChild('File') file: ElementRef;
	public company: Company;
	public message: string;
	public failedConect: string;

	constructor(
		private _route: ActivatedRoute,
		private _companyService: CompanyService,
		private _location: Location,
		private snackBar: SnackBarService
		)
	{
		this.company = new Company();
	}

	ngOnInit() {
	}

	uploadPic(event) {
		let file: File = event.target.files[0];
		if (file) {
			let reader = new FileReader();

			reader.onload = (e: any) => {
				this.company.imageUrl = e.target.result;
				console.log(this.company.imageUrl);
			}

			reader.onerror = (e) => {
				console.log(e);
			}

			reader.readAsDataURL(file);
		}
	}

	register(form: NgForm) {
		console.log(this.company)

		if (form.valid) {
			console.log(form.value);
			this.company.rif = form.value.rif;
			this.company.name = form.value.name;
			this.company.mision = form.value.mision;
			this.company.vision = form.value.vision;
			this.company.aboutUs = form.value.aboutUs;
			this.company.address = form.value.address;
			//this.company.imageUrl = form.value.imageUrl;
			this.company.phoneOne = form.value.phoneOne;
			this.company.phoneTwo = form.value.phoneTwo;
			this.company.revisionPrice = form.value.revisionPrice;
			this.company.facebook = form.value.facebook;
			this.company.instagram = form.value.instagram;
			this.company.twitter = form.value.twitter;
			console.log(this.company);

			this._companyService.create(this.company).subscribe
			(
				response => {
					if (response.status === true) {
						console.log(response);
						this.message = response.message.text;
						form.reset();
						this.messageSnackBar(this.message);
					} else {
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
						this.message = error.error.message;
						console.log(error);
						this.messageSnackBar(this.message);
					}
				}
				);
		} else {
		}
	}

	messageSnackBar(message)
	{
		this.snackBar.openSnackBarSuccess(message);
	}

	goBack() {
		this._location.back();
	}

}
