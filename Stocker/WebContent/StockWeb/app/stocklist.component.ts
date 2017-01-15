import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router }              from '@angular/router';
import { Stock }               from './stock';
import { StockListService }    from './stocklist.service';
import { SearchPipe }          from './search.pipe';
import { SearchBox }           from './search.box';
import { SearchName }          from './search.name';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import * as _ from 'underscore';
import { PagerService } from './_services/index'

@Component({
  moduleId: module.id,
  selector: 'my-stocks',
  templateUrl: 'stocklist.component.html',
  styleUrls: [ 'stocklist.component.css' ]
})

export class StockListComponent implements OnInit {
  stocks: Stock[];
  selectedStock: Stock;

  @Input() term;

  constructor(
    private stockListService: StockListService,
    private http: Http,
    private pagerService: PagerService) {}

  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];   

  getStocks() {
            this.http.get('http://localhost:8080/Stocker/stocker/stocks/s&s&s')
            .map((response: Response) => response.json())
            .subscribe(data => {
                // set items to json response
                this.stocks = data;

                // initialize to page 1
                this.setPage(1);
                console.log(this.stocks);
            });
  }
  
  getHeroes(): void {
    this.stockListService
        .getHeroes()
        //.then(pagedItems => this.pagedItems = pagedItems)
        .then(stocks => this.stocks = stocks)

    console.log(this.pagedItems);    
             
  }

  ngOnInit(): void {
    //this.getHeroes();

    // initialize to page 1
    //this.setPage(1);    
    this.getStocks();
    console.log(this.pagedItems);  
    
  }

  onSelect(stock: Stock): void {
    this.selectedStock = stock;
    console.log(this.selectedStock);
    this.setPage(1);  
  }

  setPage(page: number) {
      if (page < 1 || page > this.pager.totalPages) {
          return;
      }
      console.log(this.stocks.length);
      // get pager object from service
      this.pager = this.pagerService.getPager(this.stocks.length, page);

      // get current page of items
      this.pagedItems = this.stocks.slice(this.pager.startIndex, this.pager.endIndex + 1);
  } 

}
