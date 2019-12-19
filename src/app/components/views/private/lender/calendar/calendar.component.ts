import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { CalendarDateFormatter, CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { CustomDateFormatter } from '../../../../../core/pipes/custom-date-formatter.provider';

import { DialogService } from '../../../../../core/services/dialog.service';
import { SnackBarService } from '../../../../../core/services/snack-bar.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'sib-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate = new Date();
  events: CalendarEvent[] = [];
  locale: any = 'es';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  CalendarView = CalendarView;

  setView(view: CalendarView) {
    this.view = view;
  }

  constructor(
    private dialogService: DialogService,
    private snackBar: SnackBarService,
    private _route: ActivatedRoute,
		private _router: Router,
		private _location: Location
  ) { }

  ngOnInit() {
  }

  goBack()
	{ 
		this._location.back(); 
	}

}
