import { Component, OnInit, Inject} from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';
@Component({
  selector: 'sib-snack-bar-delete',
  templateUrl: './snack-bar-delete.component.html',
  styleUrls: ['./snack-bar-delete.component.scss']
})
export class SnackBarDeleteComponent implements OnInit {

  constructor
  (
  	@Inject(MAT_SNACK_BAR_DATA) public data,
  	public snackBar: MatSnackBarRef<SnackBarDeleteComponent>
  ) { }

  ngOnInit() {
  }

}
