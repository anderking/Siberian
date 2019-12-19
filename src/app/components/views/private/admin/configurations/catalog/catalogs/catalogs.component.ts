import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'sib-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsComponent implements OnInit {

	constructor
	(
		private _location: Location
		)
	{

	}

	ngOnInit() {
	}

	goBack()
	{ 
		this._location.back(); 
	}

}
