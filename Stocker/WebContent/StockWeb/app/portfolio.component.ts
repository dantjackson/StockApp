import {Component, Input, Output, OnInit, EventEmitter,Directive} from '@angular/core';
import { PortFolioService , AddStock, Perf}   from './portfolio.service';
import { Portfolio }   from './portfolio';
import {GoogleChartComponent} from './GoogleChartComponent';
declare var google:any;
declare var googleLoaded:any;


@Component({
  selector: 'portfolio',
  templateUrl: '../app/html/portfolio.component.html',
  styleUrls: [ '/css/stocker.css' ]
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
        height: 500,
        backgroundColor: '#DBEDF8',
        legend: {
            position: 'bottom'
        },
        vAxis: {
        viewWindow:{ min: 0, max: 1.01 },
        gridlines: { color: '#222222', count: 6} 
      }
  };


}