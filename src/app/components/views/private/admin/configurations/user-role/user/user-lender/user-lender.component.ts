import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'sib-user-lender',
  templateUrl: './user-lender.component.html',
  styleUrls: ['./user-lender.component.scss']
})
export class UserLenderComponent implements OnInit {

  constructor(
    private _location: Location,
  ) { }

  ngOnInit() {
  }
  goBack(){
    this._location.back();
  }

}
