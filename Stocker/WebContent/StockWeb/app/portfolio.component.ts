import {Component, Input, Output, EventEmitter} from '@angular/core';
import { PortFolioService , AddStock}   from './portfolio.service';
import { Portfolio }   from './portfolio';

@Component({
  selector: 'portfolio',
  template: `<h3>My Portfolio</h3>
  
  <table class="table table-sm table-bordered">
  <thead style="color:white;background: -webkit-linear-gradient(top, rgba(30,87,153,1) 0%,rgba(32,124,202,1) 52%,rgba(125,185,232,1) 100%,rgba(32,124,202,1) 100%);">
    <tr style="text-align: center;vertical-align: middle;font-weight:bold;font-color:white;">
      <th class="col-md-1" style="text-align: center;vertical-align: middle;border-radius: 3px;">Quantity</th>
      <th class="col-md-1" style="text-align: center;vertical-align: middle;">Currency</th>
      <th class="col-md-1" style="text-align: center;vertical-align: middle;">Purchase Price</th>
      <th class="col-md-1" style="text-align: center;vertical-align: middle;">Purchase Value</th>
      <th class="col-md-1" style="text-align: center;vertical-align: middle;">Current Bid</th>  
      <th class="col-md-1" style="text-align: center;vertical-align: middle;">Current Ask</th>      
      <th class="col-md-1" style="text-align: center;vertical-align: middle;">Current Value</th>    
      <th class="col-md-1" style="text-align: center;vertical-align: middle;">Profit</th> 
      <th class="col-md-1" style="text-align: center;vertical-align: middle;">50 Day Bid</th> 
      <th class="col-md-1" style="text-align: center;vertical-align: middle;">50 %</th> 
      <th class="col-md-1" style="text-align: center;vertical-align: middle;">200 Day Bid</th>   
      <th class="col-md-1" style="text-align: center;vertical-align: middle;">200 %</th> 
      <th class="col-md-1" style="text-align: center;vertical-align: middle;">Year High</th> 
      <th class="col-md-1" style="text-align: center;vertical-align: middle;">Year Low</th> 
      <th class="col-md-1" style="text-align: center;vertical-align: middle;">Book Value</th>          
      <th class="col-md-1" style="text-align: center;vertical-align: middle;">Earnings</th>            
    </tr>
  </thead>
  <template ngFor let-portfolio [ngForOf]="portfolios" let-i="index" [ngForTrackBy]="trackByFn">
    <tr class="text-black" style="background-color:skyblue;border-bottom:3pt solid white;" >
      <td colspan="10" style="font-weight:bold;font-color:black;">&nbsp;{{portfolio.stockName}} ({{portfolio.stockId}})</td>
      <td colspan="2"><a href="#">View</a>
          <button class="btn btn-sm btn-primary" (click)="viewStockClick()" type="button"> <span class="glyphicon glyphicon-stats"></span> </button>      
      </td>
      <td colspan="2"><a href="#">Edit</a>
          <button class="btn btn-sm btn-primary" (click)="editStockClick()" type="button"> <span class="glyphicon glyphicon-cog"></span> </button>      
      </td>
      <td colspan="2"><a href="#">Delete</a>
          <button class="btn btn-sm btn-danger" (click)="deleteStockClick()" type="button"> <span class="glyphicon glyphicon-trash"></span> </button>    
      </td> 
    </tr>   
    <tr class="text-black" style="background-color: rgba(133, 193, 233, 0.3);border-bottom:3pt solid white;" >
      <td class="col-md-1" style="border-right:2pt solid white;">{{portfolio.stockQty}}</td>
      <td class="col-md-1" style="border-right:2pt solid white;">{{portfolio.stockCurrency}}</td>
      <td class="col-md-1" style="border-right:2pt solid white;">{{portfolio.stockPurchasePrice}}</td> 
      <td class="col-md-1" style="border-right:2pt solid white;">{{portfolio.purchaseValue}}</td>
      <td class="col-md-1" style="border-right:2pt solid white;">{{portfolio.stockBid}}</td>
      <td class="col-md-1" style="border-right:2pt solid white;">{{portfolio.stockAsk}}</td> 
      <td class="col-md-1" style="border-right:2pt solid white;">{{portfolio.currentValue}}</td>    
      <td class="col-md-1" style="border-right:2pt solid white;">{{portfolio.profit}}</td> 
      <td class="col-md-1" style="border-right:2pt solid white;text-align: center;vertical-align: middle;">{{portfolio.changeFromFiftydayMovingAverage}}</td>    
      <td class="col-md-1" style="border-right:2pt solid white;text-align: center;vertical-align: middle;">{{portfolio.fiftyDayChangePercent}}</td> 
      <td class="col-md-1" style="border-right:2pt solid white;">{{portfolio.changeFromTwoHundreddayMovingAverage}}</td>
      <td class="col-md-1" style="border-right:2pt solid white;">{{portfolio.twoHundredDayChangePercent}}</td>        
      <td class="col-md-1" style="border-right:2pt solid white;">{{portfolio.yearHigh}}</td>
      <td class="col-md-1" style="border-right:2pt solid white;">{{portfolio.yearLow}}</td>
      <td class="col-md-1" style="border-right:2pt solid white;">{{portfolio.bookValue}}</td>    
      <td class="col-md-1" style="border-right:2pt solid white;">{{portfolio.earningsShare}}</td>  
    </tr>
  </template>
  </table>
  <div style="margin-top:15px"></div>
  <div class="row">
    <button class="btn btn-success" (click)="addStockClick()">Add Stock</button>
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

  <div *ngIf="showAddStockMessage" class="row">
    <div style="margin-top:10px"></div>
        <table>
            <tr>
                <td class="h4">{{addStockMessage}}</td>
            </tr>
        </table>   
   </div>     
`
})

export class PortfolioComponent { 
 
    portfolios: Portfolio[];  
    showaddoptions: boolean = false;
    showAddStockMessage: boolean = false;
    public addStockMessage: string;
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
      this.showAddStockMessage = false;
    }

    validateStockClick() {
      this.portFolioService.postAddStockToPort(this.addStock)
            .subscribe(
                data => this.retAddStock = data,
                error => alert(error),
                () =>this.validateStockPostLoad()
            );
    }

    validateStockPostLoad() {
      
      // If Success Remove Add Stock Stuff
      if (this.retAddStock[0].stockAdded==true) {
       // Reload portfolio
        this.getPortfolios("");
        this.showaddoptions = false;
      }
      // Show Validation Messages.
      this.showAddStockMessage = true;
      this.addStockMessage = this.retAddStock[0].stockMessage;

      // Where we gonna get folio id from

    }

  ngOnInit(): void {
    // initialize to page 1
    this.getPortfolios("");
    console.log(this.portfolios);  
  }

}