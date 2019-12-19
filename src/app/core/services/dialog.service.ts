import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from '../../components/shared/confirm-dialog/confirm-dialog.component';
import { AddLocationDialogComponent } from '../../components/shared/add-location-dialog/add-location-dialog.component';
import { NotifyDialogComponent } from '../../components/shared/notify-dialog/notify-dialog.component';
import { EditLocationDialogComponent } from '../../components/shared/edit-location-dialog/edit-location-dialog.component';
import { AddPhoneDialogComponent } from '../../components/shared/add-phone-dialog/add-phone-dialog.component';
import { EditPhoneDialogComponent } from '../../components/shared/edit-phone-dialog/edit-phone-dialog.component';
import { AddCalificationDialogComponent } from '../../components/shared/add-calification-dialog/add-calification-dialog.component';
import { RejectedRequestDialogComponent } from '../../components/shared/rejected-request-dialog/rejected-request-dialog.component';
import { RejectedDiagnosisDialogComponent } from '../../components/shared/rejected-diagnosis-dialog/rejected-diagnosis-dialog.component';
import { DateDialogComponent } from '../../components/shared/date-dialog/date-dialog.component';
// tslint:disable-next-line:max-line-length
import { ReportStatisticalFilterDialogComponent } from '../../components/shared/report-statistical-filter-dialog/report-statistical-filter-dialog.component';


import {MatDialog} from '@angular/material/dialog';
import { CalendarDialogComponent } from 'src/app/components/shared/calendar-dialog/calendar-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  openConfirmDialog(msg){
  	return this.dialog.open(ConfirmDialogComponent,{
  		data:{
  			message:msg
  		}
  	});
  }

  openNotifyDialog(){
    return this.dialog.open(NotifyDialogComponent);
  }

  openAddLocationDialog(){
  	return this.dialog.open(AddLocationDialogComponent,{
      width: '350px',
    });
  }

  openEditLocationDialog(location){
    return this.dialog.open(EditLocationDialogComponent,{
      width: '350px',
      data:{
        location:location
      }
    });
  }

  openAddPhoneDialog(){
    return this.dialog.open(AddPhoneDialogComponent,{
      width: '350px',
    });
  }

  openEditPhoneDialog(phone){
    return this.dialog.open(EditPhoneDialogComponent,{
      width: '350px',
      data:{
        phone:phone
      }
    });
  }

  openAddCalificationDialog(){
    return this.dialog.open(AddCalificationDialogComponent,{
      width: '1500px',
    });
  }

  openRejectedRequestDialog(){
    return this.dialog.open(RejectedRequestDialogComponent,{
      width: '350px',
    });
  }

  openRejectedDiagnosisDialog(){
    return this.dialog.open(RejectedDiagnosisDialogComponent,{
      width: '350px',
    });
  }

  openDateDialog() {
    return this.dialog.open(DateDialogComponent, {
      width: '350px',
    });
  }

  openStatisticalFilterDialog() {
    return this.dialog.open(ReportStatisticalFilterDialogComponent, {
      width: '350px',
    });
  }

	openCalendarDialog(data) {
		return this.dialog.open(CalendarDialogComponent, {
			data: data,
			width: '800px'
		});
	}

}
