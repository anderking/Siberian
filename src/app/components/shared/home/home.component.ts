import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sib-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public isToggle=true;
	public isContent:boolean;
	public contentMargin:any;

	constructor() { }

	ngOnInit() {
	}

	shoot(){
		console.log(this.isToggle);
		this.isToggle = !this.isToggle;
		if(!this.isToggle){
			this.contentMargin=5;
			this.isContent=true;
		}else{
			this.contentMargin=20;
			this.isContent=false;
		}
	}

}
