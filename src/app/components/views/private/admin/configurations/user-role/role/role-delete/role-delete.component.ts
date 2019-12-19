import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'sib-role-delete',
  templateUrl: './role-delete.component.html',
  styleUrls: ['./role-delete.component.scss']
})
export class RoleDeleteComponent implements OnInit {

  constructor(
    private _location: Location,
  ) { }

  ngOnInit() {
  }

  goBack(){
    this._location.back();
  }

}
