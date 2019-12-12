import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface Statistic {
  time: number;
  average: number;
  errors: number;
}

@Component({
  selector: 'app-train-result',
  templateUrl: './train-result.component.html',
  styleUrls: ['./train-result.component.css']
})
export class TrainResultComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TrainResultComponent>,
    @Inject(MAT_DIALOG_DATA) public statistic: Statistic) { }

  ngOnInit() {
  }

  handleOkClick() {
    this.dialogRef.close(true);
  }

  handleToStatistic() {
    this.dialogRef.close(false);
  }
}
