import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {GoogleChartComponent} from './GoogleChartComponent';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: [''],
})
export class DashboardComponent implements OnInit{ 

    public pie_ChartData = [
    ['Task', 'Hours per Day'],
    ['Work',     11],
    ['Eat',      2],
    ['Commute',  2],
    ['Watch TV', 2],
    ['Sleep',    7] ];
  public pie_ChartOptions  = {
    title: 'My Daily Activities',
    width: 900,
    height: 500
  };

  constructor() {
  }

  ngOnInit() {

  }

}
