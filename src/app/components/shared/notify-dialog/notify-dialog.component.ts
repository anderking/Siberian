import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'sib-notify-dialog',
  templateUrl: './notify-dialog.component.html',
  styleUrls: ['./notify-dialog.component.scss']
})
export class NotifyDialogComponent implements OnInit {

  constructor
  (
  	@Inject(MAT_DIALOG_DATA) public data,
  	public dialogRef: MatDialogRef<NotifyDialogComponent>
  ) { }


  ngOnInit() {
  }



}
