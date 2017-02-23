import {Component, Input, Output, EventEmitter} from '@angular/core';
import { PortFolioService , AddStock}   from './portfolio.service';
import { Portfolio }   from './portfolio';

@Component({
  selector: 'portfolio',
  template: `<h3>My Portfolio</h3>
  
  <table class="table table-sm">
  <thead class="bg-primary">
    <tr>
      <th>Symbols</th>
      <th>Quantity</th>
      <th>Currency</th>
      <th>Purchase Price</th>
      <th>Purchase Value</th>
      <th>Current Bid</th>  
      <th>Current Ask</th>      
      <th>Current Value</th>    
      <th>Profit</th> 
      <th>50 Day Bid</th> 
      <th>50 %</th> 
      <th>200 Day Bid</th>   
      <th>200 %</th> 
      <th>Year High</th> 
      <th>Year Low</th> 
      <th>Book Value</th>          
      <th>Earnings</th>            
    </tr>
  </thead>
  <tr class="text-black" style="background-color: rgba(133, 193, 233, 0.3)" *ngFor="let portfolio of portfolios">
    <td class="">{{portfolio.stockId}}</td>
    <td class="">{{portfolio.stockQty}}</td>
    <td class="">{{portfolio.stockCurrency}}</td>
    <td class="">{{portfolio.stockPurchasePrice}}</td> 
    <td class="">{{portfolio.purchaseValue}}</td>
    <td class="">{{portfolio.stockBid}}</td>
    <td class="">{{portfolio.stockAsk}}</td> 
    <td class="">{{portfolio.currentValue}}</td>    
    <td class="">{{portfolio.profit}}</td> 
    <td class="">{{portfolio.changeFromFiftydayMovingAverage}}</td>    
    <td class="">{{portfolio.fiftyDayChangePercent}}</td> 
    <td class="">{{portfolio.changeFromTwoHundreddayMovingAverage}}</td>
    <td class="">{{portfolio.twoHundredDayChangePercent}}</td>        
    <td class="">{{portfolio.yearHigh}}</td>
    <td class="">{{portfolio.yearLow}}</td>
    <td class="">{{portfolio.bookValue}}</td>    
    <td class="">{{portfolio.earningsShare}}</td>    
  </tr>
  </table>
  <div style="margin-top:15px"></div>
  <div class="row">
    <button class="btn btn-success" (click)="addStockClick()">Add Stock</button>
    <button class="btn btn-danger" (click)="delStock()">Delete Stock</button>
    <button class="btn btn-primary" (click)="editStock()">Edit Stock</button>
  </div>
               
  <div style="margin-top:25px"></div>

  <div *ngIf="showaddoptions" class="row">
    <div class="col-sm-4">
    <table class="table table-sm">
    <thead class="bg-primary small h3">
      <tr>
        <th>Symbol</th><th>Price</th><th>Qty</th>
      </tr>
    </thead>
    <tr>
      <td>
        <input [(ngModel)]="addStock.stockId" name="Symbol" type="text" id="Symbol" class="form-control" placeholder="Symbol" required>
      </td>
      <td>
        <input [(ngModel)]="addStock.stockPrice" name="Price" type="number" id="price" class="form-control" placeholder="0.0" required> 
      </td>
      <td>
        <input [(ngModel)]="addStock.stockQty" name="quantity" type="number" step="1" min="1" id="quantity" class="form-control" placeholder="1" required> 
      </td>  
    </tr>   
    </table>
    </div>
    <div class="col-sm-1" style="display:table-cell; vertical-align:middle">
       <div style="margin-top:40px"></div>
       <button class="btn btn-success" (click)="validateStockClick()" type="button"> <span class="glyphicon glyphicon-ok"></span> </button>    
    </div>
  </div>   
`
})

export class PortfolioComponent { 
 
    portfolios: Portfolio[];  
    showaddoptions: boolean = false;
    public addStock = new AddStock('','','',false,'');
    public retAddStock = new AddStock('','','',false,'');
   
    constructor(private portFolioService: PortFolioService) {}

    getPortfolios(arg) {
          this.portFolioService.getPortFoliosSvc(arg)
              .subscribe(portfolios => this.portfolios = portfolios);
    }    

    addStockClick() { 
      console.log("Add Stock");
      this.showaddoptions = true;
    }

    validateStockClick() {
      console.log("Validate Stock");
      this.portFolioService.postAddStockToPort(this.addStock)
            .subscribe(
                data => this.retAddStock = data,
                error => alert(error),
                () =>this.getPortfolios("")
            );
    }

  ngOnInit(): void {
    // initialize to page 1
    this.getPortfolios("");
    console.log(this.portfolios);  
  }

}