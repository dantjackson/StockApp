import {Component, Input, Output, EventEmitter} from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { Injectable }    from '@angular/core';  
import { Headers, Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';
import { Observable }     from 'rxjs/Observable';
import { StockDetail }    from './stockdetail';
import { StockDetailService }   from './stockdetail.service';


@Injectable() 

@Component({
  selector: 'stock-detail', 
  providers: [StockDetailService],
  template: `
  <div class="panel panel-default">
    <div *ngIf="!selstockdetail" class="panel-heading">
      <h3 class="panel-title">{{message}}</h3>
    </div>
    <div *ngIf="selstockdetail" class="panel-heading">
      <h3 class="panel-title">{{selstockdetail.stockName}} {{selstockdetail.stockName}}</h3>
    </div>
    <ul class="list-group" *ngIf="selstockdetail">
      <li class="list-group-item">
        <h4 class="list-group-item-heading">Stock Id</h4>
        <p class="list-group-item-text">{{selstockdetail.stockId}}</p>
      </li>
      <li class="list-group-item">
        <h4 class="list-group-item-heading">Stock Name</h4>
        <p class="list-group-item-text">{{selstockdetail.stockName}}</p>
      </li>
      <li class="list-group-item">
        <h4 class="list-group-item-heading">Stock High</h4>
        <p class="list-group-item-text">{{selstockdetail.stockYearHigh}}</p>
      </li>
      <li class="list-group-item">
        <h4 class="list-group-item-heading">Stock Low</h4>
        <p class="list-group-item-text">{{selstockdetail.stockYearLow}}</p>
      </li>      
  </ul>
  </div>
  `
})

export class StockDetailComponent {

    stockdetail: StockDetail[];

    selstockdetail = new StockDetail();
   
   
    constructor(private stockDetailService: StockDetailService) {
    }

    // Great guide detailing how to use component comms.
    // https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#parent-to-child-local-var

    myFriend: String;

    getStockDets(arg) {
          this.stockDetailService.getStockFromIdObs(arg)
              .subscribe(selstockdetail => this.selstockdetail = selstockdetail[0]);
              // Not the [0] to get the first element in the list.
    }

    runme(arg): void {
     
      console.log("CompDemo", arg);
      this.getStockDets(arg.stockId);

      console.log(this.selstockdetail); 
    }

    // Check This - https://www.typescriptlang.org/docs/release-notes/typescript-1.7.html

    ngOnInit(): void {
      // Add here
      
    }
}  