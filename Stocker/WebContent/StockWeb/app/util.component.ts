import { Component } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { DropdownComponent }          from './dropdown.component';

@Component({
  selector: 'my-util',
  template: `<h3 class="header">Utilities</h3>
               <div class="row">
                 <button class="btn btn-success" (click)="import()">Run Import</button>
                 <button class="btn btn-info" (click)="viewlogs()">View Import Logs</button>
                 <button class="btn btn-primary" (click)="viewdata()">View Import Data</button>
               </div>
               <div style="margin-top:15px"></div>

               <div *ngIf="showdropdown" class="row">
                 <dropdown [values]="dropdownValues" (select)="action($event)"></dropdown>
               </div> 
               
               <div style="margin-top:15px"></div>
               <div *ngIf="loadres" class="panel panel-default">
                <div *ngIf="loadres" class="panel-heading">
                  <h3 class="panel-title">{{loadres.loadId}}</h3>
                </div>
                <ul class="list-group" *ngIf="loadres">
                  <li class="list-group-item">
                    <h4 class="list-group-item-heading">Stocks Processed</h4>
                    <p class="list-group-item-text">{{loadres.stocksProcessed}}</p>
                  </li>
                  <li class="list-group-item">
                    <h4 class="list-group-item-heading">Stocks Loaded</h4>
                    <p class="list-group-item-text">{{loadres.stocksLoaded}}</p>
                  </li>
                  <li class="list-group-item">
                    <h4 class="list-group-item-heading">Stocks Failed</h4>
                    <p class="list-group-item-text">{{loadres.stocksFailed}}</p>
                  </li>
                  <li class="list-group-item">
                    <h4 class="list-group-item-heading">Stock Errors</h4>
                    <p class="list-group-item-text">{{loadres.stocksErrors}}</p>
                  </li>      
                  <li class="list-group-item">
                    <h4 class="list-group-item-heading">Stock Duration</h4>
                    <p class="list-group-item-text">{{loadres.loadDuration}}</p>
                  </li>                        
              </ul>
              </div>            
              <div *ngIf="loadingGIF" class="row">
                <img src="../img/spin.svg">
              </div>  
            `
})
export class UtilComponent { 

  constructor(private http: Http) {}

  loadres: any[];
  dropdownValues: any[];
  showdropdown: boolean = false;
  loadingGIF: boolean = false;


  import() {
    // hide existing data 
    this.toggleLoadingGIF(true); 
    this.loadres=null;

    this.http.get('http://localhost:8080/Stocker/stocker/utils/invoke/run')
      .map((response: Response) => response.json())
      .subscribe(data => {
      
      // set items to json response
      this.loadres = data;  
      this.toggleLoadingGIF(false); 
      });

    console.log('Completed Import');   
  }

  viewlogs() {
    this.loadlogslist();
    this.showdropdown=true;
  }  

  loadlogslist() {
        this.http.get('http://localhost:8080/Stocker/stocker/utils/loglist')
      .map((response: Response) => response.json())
      .subscribe(data => {
      
      // set items to json response
      this.dropdownValues = data;  
      this.loadselectedlog(this.dropdownValues[0]);
      
      });
      
  }

  loadselectedlog(logname) {
    // hide existing data 
    this.toggleLoadingGIF(true); 
    this.loadres=null;

    this.http.get('http://localhost:8080/Stocker/stocker/utils/readlog/' + logname)
      .map((response: Response) => response.json())
      .subscribe(data => {
      
      // set items to json response
      this.loadres = data;  
      this.toggleLoadingGIF(false); 
      });    
  }

  action (logname) {
    console.log("action");
    this.loadselectedlog(logname);
  }

  viewdata(){
    this.loadres = null;
  }

  toggleLoadingGIF(loading) {
    this.loadingGIF = loading;
  }


}
