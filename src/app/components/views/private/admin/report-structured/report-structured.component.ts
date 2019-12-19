import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../../../../core/services/dialog.service';

@Component({
  selector: 'sib-report-structured',
  templateUrl: './report-structured.component.html',
  styleUrls: ['./report-structured.component.scss']
})
export class ReportStructuredComponent implements OnInit {

  constructor(
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
  }

  openDate() {
    this.dialogService.openDateDialog().afterClosed();
  }
}
