import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'; 

@Component({
  selector: 'sib-motive-delete',
  templateUrl: './motive-delete.component.html',
  styleUrls: ['./motive-delete.component.scss']
})
export class MotiveDeleteComponent implements OnInit {

  constructor(
    private _location: Location,
  ) { }

  ngOnInit() {
  }
  goBack(){
    this._location.back();
  }

}
