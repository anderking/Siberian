import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'; 

@Component({
  selector: 'sib-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.scss']
})
export class CategoryDeleteComponent implements OnInit {

  constructor(
    private _location: Location,
  ) { }

  ngOnInit() {
  }
  goBack(){
    this._location.back();
  }

}
