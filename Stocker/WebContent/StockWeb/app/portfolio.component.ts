import {Component, Input, Output, OnInit, EventEmitter,Directive} from '@angular/core';
import { PortFolioService , AddStock, Perf}   from './portfolio.service';
import { Portfolio }   from './portfolio';
import {GoogleChartComponent} from './GoogleChartComponent';
declare var google:any;
declare var googleLoaded:any;


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
 

    <tr *ngIf="portfolio.stockId == 'TOTAL'" colspan="16" class="text-black" style="background-color:#4863A0;border-bottom:3pt solid white;" >
      <td colspan="16" style="font-weight:bold;font-color:white;color:white;">&nbsp;{{portfolio.stockName}}</td>
    </tr>  

    <tr *ngIf="portfolio.stockId != 'TOTAL'"class="text-black" style="background-color:skyblue;border-bottom:3pt solid white;" >
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
      
       
      <td *ngIf="portfolio.profit>= 0" class="col-md-1" style="color:green;border-right:2pt solid white;">{{portfolio.profit}}</td> 
      <td *ngIf="portfolio.profit< 0" class="col-md-1" style="color:red;border-right:2pt solid white;">{{portfolio.profit}}</td> 

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

   <div id="line_chart" [chartData]="arr" [chartOptions]= "line_ChartOptions" chartType="LineChart" GoogleChart></div>
`
})


export class PortfolioComponent implements OnInit{ 
 
    portfolios: Portfolio[];  
    perf: Perf[];
    out: any[] = [];
    
    showaddoptions: boolean = false;
    showAddStockMessage: boolean = false;
    public addStockMessage: string;
    public addStock = new AddStock('','','',false,'');
    public retAddStock = new AddStock('','','',false,'');
    public arr;
;
   
    constructor(private portFolioService: PortFolioService) {}

    getPortfolios(arg) {
          this.portFolioService.getPortFoliosSvc(arg)
              .subscribe(portfolios => this.portfolios = portfolios);
    }    

    getFolioPerf(arg) {
          this.portFolioService.getFolioPerf(arg)
              .subscribe(perf => this.perf = perf, 
              error => alert(error),
              ()=>this.runPerf());
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

   runPerf() {
     console.log("hello");
     var jsonAsArray = Object.values(this.perf);
     var distDatesArr : Date[] = [];
     var titleArr : string[] = [];
     var iter : number = 0;

     // Get distinct list of Dates
     for (let i of jsonAsArray) {
       var danvar = Object.values(i);
       iter = 0;
       for (let dateStrIter of danvar) {
         iter ++;
         var dateStrDay = +dateStrIter.toString().substring(0,2);
         var dateStrMonth = +dateStrIter.toString().substring(3,5) - 1;
         var dateStrYear = +dateStrIter.toString().substring(6,8) + 2000;
         var dateVar = new Date(dateStrYear, dateStrMonth, dateStrDay);

         // Cannot compare date objects so use this map approach. 
         var idx = distDatesArr.map(Number).indexOf(+dateVar); 

         if (idx == -1 && iter==1) {
          distDatesArr.push(dateVar);
         }
       }  
     }  

    var date_sort_asc = function (date1, date2) {
      // This is a comparison function that will result in dates being sorted in
      // ASCENDING order. As you can see, JavaScript's native comparison operators
      // can be used to compare dates. This was news to me.
      if (date1 > date2) return 1;
      if (date1 < date2) return -1;
      return 0;
    };
    // Sort Dates Array 
    distDatesArr = distDatesArr.sort(date_sort_asc); 

     console.log(distDatesArr);

     // Get list of stocks and add each plus date to title array.
     titleArr.push("Date");
     for (let i of jsonAsArray) {
       var danvar = Object.values(i);
       iter = 0;
       for (let z of danvar) {
         iter ++;
         if (titleArr.indexOf(z.toString()) == -1 && iter==3) {
          titleArr.push(z.toString());
         }
       }  
     }  
     console.log(titleArr);     

     // Loop each distinct date and each stock.  Add entry for each
     var endArrayVar : any[] = [];
     endArrayVar.push(titleArr);

     for (let dateIter of distDatesArr) {
       var rowArrayVar : any[] = [];
       rowArrayVar.push(dateIter);
       for   (let titleIter of titleArr) {
            var subinZeroVal : boolean = true;
            
            for (let topArrayObj of jsonAsArray) {
              var topArr = Object.values(topArrayObj);

              var dateAsFormattedStr = this.getDay(dateIter) + '-' + this.getMonth(dateIter) +  '-' + dateIter.getFullYear().toString().substr(2,4);
              //console.log('DATE'+dateIter); 
              //console.log('DATEFORM'+dateAsFormattedStr); 
              //console.log('DATEINARRAY'+topArr[0].toString()); 

               if (topArr[0].toString()==dateAsFormattedStr && topArr[2].toString()==titleIter.toString()  ) {
                 rowArrayVar.push(topArr[1]);  
                 subinZeroVal = false;
                 //console.log("Here");
              } 
            }  
       // Sub in a row if no match
       if (subinZeroVal==true  && titleIter!="Date") {
          rowArrayVar.push(null);   
       } 

       } // for   
       endArrayVar.push(rowArrayVar);
     }
     
   console.log(endArrayVar);  
   //this.arr = endArrayVar.sort((n1,n2) =>  {
   //     return n1 - n2
   // } );
   //this.arr = new google.visualization.DataTable(this.out);
   this.arr = endArrayVar;

   }

 getMonth(date) {
  var month = date.getMonth() + 1;
  return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
}  

 getDay(date) {
  var day = date.getDate();
  return day < 10 ? '0' + day : '' + day; 
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
    this.getFolioPerf("");
    console.log(this.perf);      
  }

  public line_ChartOptions = {
        title: 'Portfolio Performance',
        curveType: 'function',
        legend: {
            position: 'bottom'
        }
  };


}