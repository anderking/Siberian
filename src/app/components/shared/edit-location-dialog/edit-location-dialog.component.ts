import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'sib-edit-location-dialog',
  templateUrl: './edit-location-dialog.component.html',
  styleUrls: ['./edit-location-dialog.component.scss']
})
export class EditLocationDialogComponent implements OnInit {

  public address:string;
  public state:string;
  public city:string;
  public postalCode:string;
  public userId:string=localStorage.getItem('resID');

  constructor
  (
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditLocationDialogComponent>
    )
  {

  }


  ngOnInit()
  {
  }

  closeDialog(){
  	this.dialogRef.close();
  }

  save(form: NgForm) {
    this.dialogRef.close(this.data);
  }

}
