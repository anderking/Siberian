import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sib-home-super',
  templateUrl: './home-super.component.html',
  styleUrls: ['./home-super.component.scss']
})
export class HomeSuperComponent implements OnInit {

	public name:string;

  constructor() { }

  ngOnInit() {
  	this.name = localStorage.getItem('firstName')+" "+localStorage.getItem('lastName');
  }

}
